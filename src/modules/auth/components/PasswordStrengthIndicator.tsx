import { cn } from "@/lib/utils";
import { getPasswordStrength } from "../schemas";

interface PasswordStrengthIndicatorProps {
  password: string;
  showLabel?: boolean;
}

export function PasswordStrengthIndicator({
  password,
  showLabel = true,
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              level <= score
                ? score <= 1
                  ? "bg-destructive"
                  : score <= 3
                    ? "bg-warning"
                    : "bg-success"
                : "bg-muted",
            )}
          />
        ))}
      </div>
      {showLabel && password && <p className={cn("text-xs font-medium", color)}>{label}</p>}
    </div>
  );
}
