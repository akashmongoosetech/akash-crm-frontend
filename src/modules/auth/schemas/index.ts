import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone number is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Mobile number is required")
      .refine((val) => {
        try {
          return isValidPhoneNumber(val);
        } catch {
          return false;
        }
      }, "Please enter a valid mobile number"),
    address: z.string().optional(),
    designation: z
      .string()
      .min(1, "Designation is required")
      .max(100, "Designation must be less than 100 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, lowercase, number, and special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase, lowercase, number, and special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const passwordStrengthSchema = z
  .string()
  .min(8, "At least 8 characters")
  .refine((pwd) => /[A-Z]/.test(pwd), "Must contain uppercase letter")
  .refine((pwd) => /[a-z]/.test(pwd), "Must contain lowercase letter")
  .refine((pwd) => /[0-9]/.test(pwd), "Must contain a number")
  .refine((pwd) => /[@$!%*?&]/.test(pwd), "Must contain a special character");

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;

  if (score <= 1) return { score, label: "Weak", color: "text-destructive" };
  if (score <= 3) return { score, label: "Medium", color: "text-warning" };
  return { score, label: "Strong", color: "text-success" };
}
