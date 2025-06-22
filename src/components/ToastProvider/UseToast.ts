import { useContext } from "react";
import { ToastContext } from "./ToastProvider";

export default function useToast() {
  const { addToast, removeToast } = useContext(ToastContext)!;

  function addWarn(title: string, description?: string) {
    addToast("warn", title, description);
  }

  function addError(title: string, description?: string) {
    addToast("error", title, description);
  }

  function addSuccess(title: string, description?: string) {
    addToast("success", title, description);
  }

  function addInfo(title: string, description?: string) {
    addToast("info", title, description);
  }

  return { addWarn, addError, addSuccess, addInfo, removeToast };
}
