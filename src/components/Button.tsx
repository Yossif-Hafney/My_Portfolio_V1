import { Button } from "primereact/button";

interface ButtonComponentProps {
  title: string;
  variant?: "primary" | "secondary" | "gradient" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export default function ButtonComponent({
  title,
  variant = "outline",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = "",
}: ButtonComponentProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transform hover:scale-105";
      case "secondary":
        return "bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 hover:border-slate-500";
      case "outline":
        return "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white";
      default:
        return "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-8 py-4 text-lg";
      default:
        return "px-6 py-3 text-md";
    }
  };

  const baseStyles =
    "font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  return (
    <Button
      label={title}
      icon={icon}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    />
  );
}
