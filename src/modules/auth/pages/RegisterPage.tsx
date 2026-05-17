import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Briefcase, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AuthLayout,
  PasswordInput,
  PasswordStrengthIndicator,
  ImageUpload,
  FormField,
} from "../components";
import { InternationalPhoneInput } from "@/components/common/InternationalPhoneInput";
import { registerSchema, type RegisterFormData } from "../schemas";
import { useAuthStore } from "../store";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [avatar, setAvatar] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [phoneValue, setPhoneValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      designation: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value || "");
    setValue("phone", value || "");
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser({
        ...data,
        phone: phoneValue,
        avatar,
      });
      toast.success("Account created successfully! Please sign in.");
      navigate({ to: "/auth/login", replace: true });
    } catch {
      // Error is handled in the store
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Enter your details to get started with Pulse CRM"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex justify-center">
          <ImageUpload value={avatar} onChange={setAvatar} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First name"
            htmlFor="firstName"
            error={errors.firstName?.message}
            required
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                {...register("firstName")}
                id="firstName"
                type="text"
                placeholder="John"
                className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </FormField>

          <FormField label="Last name" htmlFor="lastName" error={errors.lastName?.message} required>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder="Doe"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </FormField>
        </div>

        <FormField label="Email address" htmlFor="email" error={errors.email?.message} required>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="john@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </FormField>

        <InternationalPhoneInput
          value={phoneValue}
          onChange={handlePhoneChange}
          label="Mobile number"
          placeholder="Enter mobile number"
          error={errors.phone?.message}
          required
        />

        <FormField label="Address" htmlFor="address" error={errors.address?.message}>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              {...register("address")}
              id="address"
              type="text"
              placeholder="123 Street, City, Country"
              className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </FormField>

        <FormField
          label="Designation"
          htmlFor="designation"
          error={errors.designation?.message}
          required
        >
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              {...register("designation")}
              id="designation"
              type="text"
              placeholder="Sales Manager"
              className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password?.message} required>
          <div className="space-y-2">
            <PasswordInput
              {...register("password")}
              id="password"
              placeholder="Create a strong password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordStrengthIndicator password={password} />
          </div>
        </FormField>

        <FormField
          label="Confirm password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
          required
        >
          <PasswordInput
            {...register("confirmPassword")}
            id="confirmPassword"
            placeholder="Confirm your password"
          />
        </FormField>

        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
