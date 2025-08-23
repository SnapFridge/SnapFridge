"use client";

import { Toast } from "radix-ui";
import { createContext, type PropsWithChildren, useContext, useState } from "react";

interface AppToast {
  variant: "success" | "error" | "warn" | "info";
  title: string;
  description: string | undefined;
  id: string;
}

const ToastContext = createContext<
  | {
      toasts: AppToast[];
      addToast: (
        variant: "success" | "error" | "warn" | "info",
        title: string,
        description?: string
      ) => void;
      removeToast: (id: string) => void;
    }
  | undefined
>(undefined);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  function addToast(
    variant: "success" | "error" | "warn" | "info",
    title: string,
    description?: string
  ) {
    const nextToasts = [
      ...toasts,
      {
        variant,
        title,
        description,
        id: crypto.randomUUID(),
      },
    ];
    setToasts(nextToasts);
  }

  function removeToast(id: string) {
    setToasts((toasts) => {
      return toasts.filter((toast) => toast.id !== id);
    });
  }

  return (
    <Toast.Provider>
      <ToastContext value={{ toasts, addToast, removeToast }}>{children}</ToastContext>
    </Toast.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext)!;
}
