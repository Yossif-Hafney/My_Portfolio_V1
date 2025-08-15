import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  show: boolean;
  onClose?: () => void;
  duration?: number; // ms
};

export default function Toast({
  message,
  show,
  onClose,
  duration = 2000,
}: ToastProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const t = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(t);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-100 shadow-lg">
        {message}
      </div>
    </div>
  );
}
