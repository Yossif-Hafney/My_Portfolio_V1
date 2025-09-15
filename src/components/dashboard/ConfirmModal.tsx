import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "warning",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: "text-red-400",
      iconBg: "bg-red-500/20",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      icon: "text-amber-400",
      iconBg: "bg-amber-500/20",
      button: "bg-amber-600 hover:bg-amber-700",
    },
    info: {
      icon: "text-blue-400",
      iconBg: "bg-blue-500/20",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${styles.iconBg} rounded-lg`}>
              <AlertTriangle className={`w-5 h-5 ${styles.icon}`} />
            </div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-300 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 ${styles.button} text-white rounded-lg transition-colors font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
