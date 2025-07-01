"use client";

import { createContext, useState, type PropsWithChildren } from "react";
import { Toast } from "radix-ui";

export const ToastContext = createContext<
  | {
      toasts: Toast[];
      addToast: (
        variant: "success" | "error" | "warn" | "info",
        title: string,
        description?: string
      ) => void;
      removeToast: (id: string) => void;
    }
  | undefined
>(undefined);

interface Toast {
  variant: "success" | "error" | "warn" | "info";
  title: string;
  description: string | undefined;
  id: string;
}

function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

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
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  return (
    <Toast.Provider>
      <ToastContext value={{ toasts, addToast, removeToast }}>{children}</ToastContext>
    </Toast.Provider>
  );
}

export default ToastProvider;
