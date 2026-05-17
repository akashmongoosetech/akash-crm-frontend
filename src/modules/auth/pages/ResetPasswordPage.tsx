import { useState } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthLayout, PasswordInput, PasswordStrengthIndicator, FormField } from "../components";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas";
import { useAuthStore } from "../store";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams({ from: "/auth/reset-password/$token" });
  const { resetPassword, isLoading, error, clearError } = useAuthStore();
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      clearError();
      await resetPassword(token, data.password);
      setIsSuccess(true);
      toast.success("Password reset successfully!");
      setTimeout(() => {
        navigate({ to: "/auth/login", replace: true });
      }, 2000);
    } catch {
      // Error is handled in the store
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout title="Password reset successful" description="Your password has been updated">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
          </div>
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center w-full h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password" description="Create a new password for your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <FormField
          label="New password"
          htmlFor="password"
          error={errors.password?.message}
          required
        >
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <PasswordInput
                {...register("password")}
                id="password"
                placeholder="Create a new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <PasswordStrengthIndicator password={password} />
          </div>
        </FormField>

        <FormField
          label="Confirm new password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
          required
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <PasswordInput
              {...register("confirmPassword")}
              id="confirmPassword"
              placeholder="Confirm your new password"
            />
          </div>
        </FormField>

        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            "Reset password"
          )}
        </Button>

        <div className="text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
