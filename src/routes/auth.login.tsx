import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/modules/auth/pages";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
