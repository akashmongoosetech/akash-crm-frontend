import { createFileRoute } from "@tanstack/react-router";
import { LeadsPage } from "./_app.leads";

export const Route = createFileRoute("/_app/leads/")({
  component: LeadsPage,
});
