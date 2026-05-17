import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordPage } from "@/modules/auth/pages";

export const Route = createFileRoute("/auth/reset-password/$token")({
  component: ResetPasswordPage,
});
