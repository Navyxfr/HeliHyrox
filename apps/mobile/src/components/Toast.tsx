import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
  useRef,
  useState
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

type ToastTone = "success" | "error" | "info";

type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void;
};

type ToastState = {
  message: string;
  tone: ToastTone;
} | null;

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback((message: string, tone: ToastTone = "info") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message, tone });
    timeoutRef.current = setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, 2800);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <View pointerEvents="box-none" style={styles.wrapper}>
          <Pressable
            onPress={() => setToast(null)}
            style={[
              styles.toast,
              toast.tone === "success"
                ? styles.toastSuccess
                : toast.tone === "error"
                  ? styles.toastError
                  : styles.toastInfo
            ]}
          >
            <Text style={styles.toastText}>{toast.message}</Text>
          </Pressable>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

const styles = StyleSheet.create({
  wrapper: {
    bottom: 24,
    left: 20,
    position: "absolute",
    right: 20
  },
  toast: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  toastSuccess: {
    backgroundColor: colors.success
  },
  toastError: {
    backgroundColor: colors.danger
  },
  toastInfo: {
    backgroundColor: colors.primary
  },
  toastText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
});
