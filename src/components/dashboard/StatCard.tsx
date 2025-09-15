import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: "blue" | "emerald" | "amber" | "purple" | "red";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  onClick?: () => void;
}

const colorClasses = {
  blue: {
    gradient: "from-blue-500/20 to-purple-500/20",
    icon: "text-blue-400",
    border: "hover:border-blue-500/30",
    shadow: "hover:shadow-blue-500/10",
  },
  emerald: {
    gradient: "from-emerald-500/20 to-teal-500/20",
    icon: "text-emerald-400",
    border: "hover:border-emerald-500/30",
    shadow: "hover:shadow-emerald-500/10",
  },
  amber: {
    gradient: "from-amber-500/20 to-orange-500/20",
    icon: "text-amber-400",
    border: "hover:border-amber-500/30",
    shadow: "hover:shadow-amber-500/10",
  },
  purple: {
    gradient: "from-purple-500/20 to-pink-500/20",
    icon: "text-purple-400",
    border: "hover:border-purple-500/30",
    shadow: "hover:shadow-purple-500/10",
  },
  red: {
    gradient: "from-red-500/20 to-pink-500/20",
    icon: "text-red-400",
    border: "hover:border-red-500/30",
    shadow: "hover:shadow-red-500/10",
  },
};

const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    case "down":
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    case "neutral":
      return <Minus className="w-4 h-4 text-slate-400" />;
    default:
      return null;
  }
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  color,
  trend,
  trendValue,
  onClick,
}: StatCardProps) {
  const classes = colorClasses[color];

  return (
    <div
      className={`group bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 ${classes.border} transition-all duration-300 hover:shadow-2xl ${classes.shadow} transform hover:-translate-y-1 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${classes.gradient} rounded-xl`}>
          <Icon className={`w-6 h-6 ${classes.icon}`} />
        </div>
        <span className="text-2xl font-black text-white">{value}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
        {label}
      </h3>
      {trend && trendValue && (
        <div className="flex items-center gap-2">
          {getTrendIcon(trend)}
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-emerald-400"
                : trend === "down"
                  ? "text-red-400"
                  : "text-slate-400"
            }`}
          >
            {trend === "neutral"
              ? "No change"
              : `${trendValue} from last month`}
          </span>
        </div>
      )}
    </div>
  );
}
