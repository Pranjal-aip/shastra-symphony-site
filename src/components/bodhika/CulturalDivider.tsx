import { cn } from "@/lib/utils";

interface CulturalDividerProps {
  variant?: "lotus" | "om" | "diya" | "simple";
  className?: string;
}

export const CulturalDivider = ({ variant = "lotus", className }: CulturalDividerProps) => {
  const renderIcon = () => {
    switch (variant) {
      case "lotus":
        return (
          <svg viewBox="0 0 100 60" className="w-24 h-14 text-saffron">
            <path
              fill="currentColor"
              d="M50 5c-5 10-15 20-25 25 10 5 20 15 25 25 5-10 15-20 25-25-10-5-20-15-25-25z"
              opacity="0.3"
            />
            <path
              fill="currentColor"
              d="M50 15c-3 6-9 12-15 15 6 3 12 9 15 15 3-6 9-12 15-15-6-3-12-9-15-15z"
            />
            <circle cx="50" cy="30" r="5" fill="currentColor" />
          </svg>
        );
      case "om":
        return (
          <div className="text-4xl text-saffron">ॐ</div>
        );
      case "diya":
        return (
          <svg viewBox="0 0 80 60" className="w-20 h-12 text-saffron">
            <ellipse cx="40" cy="45" rx="30" ry="12" fill="currentColor" opacity="0.3" />
            <ellipse cx="40" cy="42" rx="25" ry="10" fill="currentColor" />
            <path
              d="M40 10 C35 20, 35 30, 40 35 C45 30, 45 20, 40 10"
              fill="#FF9500"
            />
            <path
              d="M40 15 C38 22, 38 28, 40 32 C42 28, 42 22, 40 15"
              fill="#FFD700"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex items-center justify-center gap-6 py-8", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-saffron/30 to-saffron/50" />
      {renderIcon()}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-saffron/30 to-saffron/50" />
    </div>
  );
};
