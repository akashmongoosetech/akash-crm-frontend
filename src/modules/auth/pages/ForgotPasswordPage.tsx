import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthLayout, FormField } from "../components";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas";
import { useAuthStore } from "../store";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      clearError();
      await forgotPassword(data.email);
      setEmailSent(true);
      toast.success("Password reset instructions sent to your email.");
    } catch {
      // Error is handled in the store
    }
  };

  if (emailSent) {
    return (
      <AuthLayout title="Check your email" description="We've sent you password reset instructions">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              We've sent password reset instructions to your email address. Please check your inbox
              and follow the instructions to reset your password.
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setEmailSent(false);
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try another email
            </Button>
            <Link
              to="/auth/login"
              className="block text-sm font-medium text-primary hover:text-primary/80"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email address and we'll send you instructions to reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <FormField label="Email address" htmlFor="email" error={errors.email?.message} required>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@company.com"
              className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </FormField>

        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending instructions...
            </>
          ) : (
            "Send reset instructions"
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
