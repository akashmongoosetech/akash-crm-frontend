import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { AuthLayout, PasswordInput, FormField } from "../components";
import { InternationalPhoneInput } from "@/components/common/InternationalPhoneInput";
import { loginSchema, type LoginFormData } from "../schemas";
import { useAuthStore } from "../store";
import { cn } from "@/lib/utils";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(false);
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [phoneValue, setPhoneValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      const loginValue = loginType === "phone" ? phoneValue : data.emailOrPhone;
      await login(loginValue, data.password);
      toast.success("Welcome back! Login successful.");
      navigate({ to: "/", replace: true });
    } catch {
      // Error is handled in the store
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value || "");
    setValue("emailOrPhone", value || "");
  };

  const demoCredentials = [
    { email: "admin@pulse.io", password: "Admin@123", role: "Super Admin" },
    { email: "manager@pulse.io", password: "Manager@123", role: "Manager" },
    { email: "user@pulse.io", password: "User@123", role: "User" },
  ];

  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your credentials to access your dashboard"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Login Type Toggle */}
        <div className="flex rounded-md border border-input p-1">
          <button
            type="button"
            onClick={() => setLoginType("email")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
              loginType === "email"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Mail className="h-4 w-4" /> Email
          </button>
          <button
            type="button"
            onClick={() => setLoginType("phone")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
              loginType === "phone"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Phone className="h-4 w-4" /> Mobile
          </button>
        </div>

        {loginType === "email" ? (
          <FormField
            label="Email address"
            htmlFor="emailOrPhone"
            error={errors.emailOrPhone?.message}
            required
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                {...register("emailOrPhone")}
                id="emailOrPhone"
                type="email"
                placeholder="name@company.com"
                className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </FormField>
        ) : (
          <InternationalPhoneInput
            value={phoneValue}
            onChange={handlePhoneChange}
            label="Mobile number"
            placeholder="Enter mobile number"
            error={errors.emailOrPhone?.message}
            required
          />
        )}

        <FormField label="Password" htmlFor="password" error={errors.password?.message} required>
          <PasswordInput
            {...register("password")}
            id="password"
            placeholder="Enter your password"
          />
        </FormField>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Create account
          </Link>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Demo Credentials</span>
          </div>
        </div>

        <div className="space-y-2">
          {demoCredentials.map((cred) => (
            <button
              key={cred.email}
              type="button"
              onClick={() => {
                setLoginType("email");
                const event = new Event("submit", { bubbles: true });
                document.querySelector("form")?.dispatchEvent(event);
                const input = document.getElementById("emailOrPhone") as HTMLInputElement;
                const passwordInput = document.getElementById("password") as HTMLInputElement;
                if (input && passwordInput) {
                  input.value = cred.email;
                  passwordInput.value = cred.password;
                }
              }}
              className="w-full p-3 text-left rounded-md border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
            >
              <p className="text-sm font-medium group-hover:text-primary transition-colors">
                {cred.role}
              </p>
              <p className="text-xs text-muted-foreground font-mono">{cred.email}</p>
            </button>
          ))}
        </div>
      </form>
    </AuthLayout>
  );
}
