import { useState } from "react";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: ToastState["type"] = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const showSuccess = (message: string) => showToast(message, "success");
  const showError = (message: string) => showToast(message, "error");
  const showInfo = (message: string) => showToast(message, "info");
  const showWarning = (message: string) => showToast(message, "warning");

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
