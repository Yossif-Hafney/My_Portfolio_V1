import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface EnhancedToastProps {
  message: string;
  show: boolean;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

const typeStyles = {
  success: {
    bg: "bg-emerald-500/20 border-emerald-500/30",
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    text: "text-emerald-300",
  },
  error: {
    bg: "bg-red-500/20 border-red-500/30",
    icon: <AlertCircle className="w-5 h-5 text-red-400" />,
    text: "text-red-300",
  },
  info: {
    bg: "bg-blue-500/20 border-blue-500/30",
    icon: <Info className="w-5 h-5 text-blue-400" />,
    text: "text-blue-300",
  },
  warning: {
    bg: "bg-amber-500/20 border-amber-500/30",
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    text: "text-amber-300",
  },
};

export default function EnhancedToast({
  message,
  show,
  type,
  onClose,
  duration = 4000,
}: EnhancedToastProps) {
  const styles = typeStyles[type];

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-xl ${styles.bg} min-w-80`}
      >
        {styles.icon}
        <span className={`font-medium flex-1 ${styles.text}`}>{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-slate-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
