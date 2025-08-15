import { Loader2 } from "lucide-react";

interface LoadingProps {
  label?: string;
  fullscreen?: boolean;
}

export default function Loading({
  label = "Loading...",
  fullscreen,
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 text-slate-300">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      <span className="text-sm opacity-80">{label}</span>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="min-h-screen bg-[#0d2438] flex items-center justify-center p-6">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-[#13283a] border border-slate-800/60 rounded-xl flex items-center justify-center">
      {content}
    </div>
  );
}
