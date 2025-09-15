interface ActionButtonProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  color: "blue" | "emerald" | "purple" | "amber" | "red";
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500/20",
    hover: "hover:bg-blue-500/30",
    text: "text-blue-400",
    hoverText: "group-hover:text-blue-300",
  },
  emerald: {
    bg: "bg-emerald-500/20",
    hover: "hover:bg-emerald-500/30",
    text: "text-emerald-400",
    hoverText: "group-hover:text-emerald-300",
  },
  purple: {
    bg: "bg-purple-500/20",
    hover: "hover:bg-purple-500/30",
    text: "text-purple-400",
    hoverText: "group-hover:text-purple-300",
  },
  amber: {
    bg: "bg-amber-500/20",
    hover: "hover:bg-amber-500/30",
    text: "text-amber-400",
    hoverText: "group-hover:text-amber-300",
  },
  red: {
    bg: "bg-red-500/20",
    hover: "hover:bg-red-500/30",
    text: "text-red-400",
    hoverText: "group-hover:text-red-300",
  },
};

export default function ActionButton({
  title,
  description,
  icon,
  color,
  onClick,
  loading = false,
  disabled = false,
}: ActionButtonProps) {
  const classes = colorClasses[color];

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed w-full"
    >
      <div
        className={`p-2 ${classes.bg} ${classes.hover} rounded-lg transition-colors`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className={`w-5 h-5 ${classes.text}`}>{icon}</div>
        )}
      </div>
      <div className="text-left">
        <span
          className={`font-semibold text-white ${classes.hoverText} transition-colors block`}
        >
          {title}
        </span>
        {description && (
          <span className="text-slate-400 text-sm">{description}</span>
        )}
      </div>
    </button>
  );
}
