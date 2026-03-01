import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DerivedStatus, UserRole } from "@helihyrox/shared";
import { usePathname, useRouter, useSegments } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { supabase } from "@/services/supabase";

type MockSession = {
  derivedStatus: DerivedStatus;
  roles: UserRole[];
  email: string | null;
};

type AuthContextValue = {
  derivedStatus: DerivedStatus;
  roles: UserRole[];
  email: string | null;
  isHydrated: boolean;
  isSupabaseEnabled: boolean;
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

function getTargetPath(status: DerivedStatus) {
  switch (status) {
    case "candidate":
      return "/(candidate)";
    case "pending_member":
      return "/(candidate)/pending";
    case "member_active":
      return "/(member)/(tabs)";
    case "suspended":
      return "/(member)/(tabs)/profile";
    default:
      return "/(public)";
  }
}

function canAccessPath(
  status: DerivedStatus,
  pathname: string,
  firstSegment?: string
) {
  if (status === "public") {
    return firstSegment === "(public)" || firstSegment === "(auth)";
  }

  if (status === "candidate" || status === "pending_member") {
    return firstSegment === "(candidate)";
  }

  if (status === "member_active") {
    return firstSegment === "(member)";
  }

  if (status === "suspended") {
    return pathname === "/(member)/(tabs)/profile";
  }

  return false;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mockSession, setMockSession] = useState<MockSession>({
    derivedStatus: "public",
    roles: [],
    email: null
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!isMounted) {
        return;
      }

      if (raw) {
        setMockSession(JSON.parse(raw) as MockSession);
      }
      setIsHydrated(true);
    }

    void hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      // Real Supabase session wiring will replace the mock session in a later lot.
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      derivedStatus: mockSession.derivedStatus,
      roles: mockSession.roles,
      email: mockSession.email,
      isHydrated,
      isSupabaseEnabled: Boolean(supabase),
      signInAs: async (status, roles = getDefaultRoles(status)) => {
        const nextSession: MockSession = {
          derivedStatus: status,
          roles,
          email: getDefaultEmail(status)
        };

        setMockSession(nextSession);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      },
      signOut: async () => {
        setMockSession({
          derivedStatus: "public",
          roles: [],
          email: null
        });
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    }),
    [isHydrated, mockSession]
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
