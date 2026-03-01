import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  ApplicationStatus,
  DerivedStatus,
  MembershipStatus,
  UserRole
} from "@helihyrox/shared";
import { usePathname, useRouter, useSegments } from "expo-router";
import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { deriveStatusFromData } from "@/features/auth/deriveStatus";
import { canAccessPath, getTargetPath } from "@/features/auth/routeAccess";
import { supabase } from "@/services/supabase";

type MockSession = {
  userId: string | null;
  derivedStatus: DerivedStatus;
  roles: UserRole[];
  email: string | null;
};

type AuthContextValue = {
  userId: string | null;
  derivedStatus: DerivedStatus;
  roles: UserRole[];
  email: string | null;
  isHydrated: boolean;
  isLoading: boolean;
  isSupabaseEnabled: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  signInAs: (status: DerivedStatus, roles?: UserRole[]) => Promise<void>;
  signOut: () => Promise<void>;
};

const STORAGE_KEY = "helihyrox.mock-session";

const AuthContext = createContext<AuthContextValue | null>(null);

function getDefaultRoles(status: DerivedStatus): UserRole[] {
  if (status === "member_active" || status === "suspended") {
    return ["member"];
  }

  return [];
}

function getDefaultEmail(status: DerivedStatus) {
  switch (status) {
    case "candidate":
      return "candidate@helihyrox.test";
    case "pending_member":
      return "pending@helihyrox.test";
    case "member_active":
      return "member@helihyrox.test";
    case "suspended":
      return "suspended@helihyrox.test";
    default:
      return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mockSession, setMockSession] = useState<MockSession>({
    userId: null,
    derivedStatus: "public",
    roles: [],
    email: null
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadSupabaseUserState = useCallback(
    async (userId: string, userEmail: string | null) => {
      if (!supabase) {
        return;
      }

      setIsLoading(true);

      const activeSeasonResult = await supabase
        .from("seasons")
        .select("id")
        .eq("is_active", true)
        .order("starts_at", { ascending: false })
        .limit(1);

      const activeSeasonId = activeSeasonResult.error
        ? null
        : activeSeasonResult.data?.[0]?.id ?? null;

      let membershipsQuery = supabase
        .from("memberships")
        .select("status, activated_at")
        .eq("user_id", userId)
        .order("activated_at", { ascending: false })
        .limit(1);

      let applicationsQuery = supabase
        .from("membership_applications")
        .select("status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (activeSeasonId) {
        membershipsQuery = membershipsQuery.eq("season_id", activeSeasonId);
        applicationsQuery = applicationsQuery.eq("season_id", activeSeasonId);
      }

      const [rolesResult, membershipsResult, applicationsResult] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", userId),
        membershipsQuery,
        applicationsQuery
      ]);

      const membershipStatus =
        (membershipsResult.data?.[0]?.status as MembershipStatus | undefined) ?? null;
      const applicationStatus =
        (applicationsResult.data?.[0]?.status as ApplicationStatus | undefined) ?? null;

      const derivedStatus = deriveStatusFromData({
        membershipStatus,
        applicationStatus
      });

      const roles = rolesResult.error
        ? []
        : rolesResult.data && rolesResult.data.length > 0
          ? rolesResult.data.map((row) => row.role as UserRole)
          : membershipStatus
            ? (["member"] as UserRole[])
            : [];

      setMockSession({
        userId,
        derivedStatus,
        roles,
        email: userEmail
      });
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      if (supabase) {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (session?.user) {
          await loadSupabaseUserState(session.user.id, session.user.email ?? null);
        }
      } else {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted) {
          return;
        }

        if (raw) {
          setMockSession(JSON.parse(raw) as MockSession);
        }
      }
      setIsHydrated(true);
    }

    void hydrate();

    return () => {
      isMounted = false;
    };
  }, [loadSupabaseUserState]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setMockSession({
          userId: null,
          derivedStatus: "public",
          roles: [],
          email: null
        });
        return;
      }

      void loadSupabaseUserState(session.user.id, session.user.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, [loadSupabaseUserState]);

  const value = useMemo<AuthContextValue>(
    () => ({
      userId: mockSession.userId,
      derivedStatus: mockSession.derivedStatus,
      roles: mockSession.roles,
      email: mockSession.email,
      isHydrated,
      isLoading,
      isSupabaseEnabled: Boolean(supabase),
      signIn: async (email, password) => {
        if (!supabase) {
          return { error: "Supabase non configure." };
        }

        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setIsLoading(false);
        return { error: error?.message ?? null };
      },
      signUp: async (email, password) => {
        if (!supabase) {
          return { error: "Supabase non configure." };
        }

        setIsLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setIsLoading(false);
        return { error: error?.message ?? null };
      },
      resetPassword: async (email) => {
        if (!supabase) {
          return { error: "Supabase non configure." };
        }

        setIsLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "helihyrox://login"
        });
        setIsLoading(false);
        return { error: error?.message ?? null };
      },
      signInAs: async (status, roles = getDefaultRoles(status)) => {
        if (supabase) {
          return;
        }

        const nextSession: MockSession = {
          userId: "mock-user",
          derivedStatus: status,
          roles,
          email: getDefaultEmail(status)
        };

        setMockSession(nextSession);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      },
      signOut: async () => {
        if (supabase) {
          setIsLoading(true);
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }

        setMockSession({
          userId: null,
          derivedStatus: "public",
          roles: [],
          email: null
        });
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    }),
    [isHydrated, isLoading, mockSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthGate({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!auth.isHydrated) {
      return;
    }

    if (canAccessPath(auth.derivedStatus, pathname, segments[0])) {
      return;
    }

    router.replace(getTargetPath(auth.derivedStatus));
  }, [auth.derivedStatus, auth.isHydrated, pathname, router, segments]);

  if (!auth.isHydrated) {
    return null;
  }

  return <>{children}</>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
