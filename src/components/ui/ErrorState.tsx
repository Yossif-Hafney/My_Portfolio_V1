import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  fullscreen?: boolean;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  actionLabel,
  onAction,
  fullscreen,
}: ErrorStateProps) {
  const body = (
    <div className="text-center max-w-md mx-auto">
      <div className="rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-500/10 border border-red-500/30">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-300 mb-6">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="min-h-screen bg-[#0d2438] flex items-center justify-center p-6">
        {body}
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-[#13283a] border border-slate-800/60 rounded-xl">
      {body}
    </div>
  );
}
