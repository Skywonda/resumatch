import { Outlet, NavLink } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LayoutDashboard, FileText, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/dashboard/enhance-resume",
    label: "Resume Enhancement",
    icon: FileText,
  },
  {
    path: "/dashboard/tailor-resume",
    label: "Resume Tailoring",
    icon: GraduationCap,
  },
] as const;

export function RootLayout() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-bold">ResuMatch AI</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4 lg:space-x-6">
              {navigationItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Future: User menu, theme toggle, etc. */}
            <div className="flex items-center gap-4">
              {/* Placeholder for future components */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto min-h-[calc(100vh-3.5rem)] px-4 py-6 lg:px-8">
        <Outlet />
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
