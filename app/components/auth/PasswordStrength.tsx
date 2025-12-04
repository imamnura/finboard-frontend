import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setLabel("");
      return;
    }

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Calculate strength score
    if (checks.length) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.number) score += 20;
    if (checks.special) score += 20;

    setStrength(score);

    // Set label and color based on score
    if (score <= 40) {
      setLabel("Weak");
      setColor("bg-destructive");
    } else if (score <= 60) {
      setLabel("Fair");
      setColor("bg-accent");
    } else if (score <= 80) {
      setLabel("Good");
      setColor("bg-secondary");
    } else {
      setLabel("Strong");
      setColor("bg-primary");
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password Strength:</span>
        <span
          className={`font-medium ${
            strength <= 40
              ? "text-destructive"
              : strength <= 60
              ? "text-accent-foreground"
              : strength <= 80
              ? "text-secondary"
              : "text-primary"
          }`}
        >
          {label}
        </span>
      </div>
      <Progress value={strength} className="h-2" />
      <ul className="text-xs text-muted-foreground space-y-1">
        <li className={password.length >= 8 ? "text-primary" : ""}>
          {password.length >= 8 ? "✓" : "○"} At least 8 characters
        </li>
        <li className={/[A-Z]/.test(password) ? "text-primary" : ""}>
          {/[A-Z]/.test(password) ? "✓" : "○"} One uppercase letter
        </li>
        <li className={/[a-z]/.test(password) ? "text-primary" : ""}>
          {/[a-z]/.test(password) ? "✓" : "○"} One lowercase letter
        </li>
        <li className={/[0-9]/.test(password) ? "text-primary" : ""}>
          {/[0-9]/.test(password) ? "✓" : "○"} One number
        </li>
      </ul>
    </div>
  );
};
