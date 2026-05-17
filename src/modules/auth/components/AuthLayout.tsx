import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-sidebar-foreground">Pulse CRM</span>
          </div>
          <h1 className="text-4xl font-bold text-sidebar-foreground mb-4 leading-tight">
            Welcome to Pulse CRM
          </h1>
          <p className="text-lg text-sidebar-foreground/70 mb-8 max-w-md">
            Manage your sales pipeline, leads, and customer relationships all in one powerful
            platform.
          </p>
          <div className="space-y-4">
            {[
              "Real-time Analytics & Insights",
              "Lead & Deal Management",
              "Team Collaboration Tools",
              "Advanced Reporting",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sidebar-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary shadow">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Pulse CRM</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
