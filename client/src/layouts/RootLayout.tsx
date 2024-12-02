import { Outlet, NavLink } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { FileText, Target, Stars, Flame, FileEdit, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType;
  disabled?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    path: "/dashboard/enhance-resume",
    label: "Resume Enhancement",
    icon: FileText,
  },
  {
    path: "/dashboard/tailor-resume",
    label: "Resume Tailoring",
    icon: Target,
  },
  {
    path: "/dashboard/rate-resume",
    label: "Resume Rating",
    icon: Stars,
  },
  {
    path: "/dashboard/cover-letter",
    label: "Cover Letter",
    icon: FileEdit,
    disabled: false,
  },
  {
    path: "/dashboard/roast-resume",
    label: "Resume Roast",
    icon: Flame,
    disabled: true,
  },
  {
    path: "/dashboard/ai-review",
    label: "AI Review",
    icon: Bot,
    disabled: true,
  },
] as const;

export function RootLayout() {
  return (
    <div className="relative min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-14 items-center">
            {/* Logo - Fixed */}
            <div className="flex shrink-0 items-center gap-2">
              <FileText className="h-5 w-5" />
              <a href="/dashboard" className="font-bold">
                ResuMatch AI
              </a>
            </div>

            {/* Navigation - Scrollable */}
            <nav className="mx-4 flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center space-x-4 px-4 lg:space-x-6">
                {navigationItems.map(
                  ({ path, label, icon: Icon, disabled }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={(e) => {
                        if (disabled) {
                          e.preventDefault();
                          return;
                        }
                      }}
                      className={({ isActive }) =>
                        cn(
                          "flex shrink-0 items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : "text-muted-foreground",
                          disabled && "pointer-events-none opacity-50"
                        )
                      }
                    >
                      <Icon />
                      <span className="hidden lg:inline whitespace-nowrap">
                        {label}
                      </span>
                    </NavLink>
                  )
                )}
              </div>
            </nav>

            {/* Right Section - Fixed */}
            <div className="flex shrink-0 items-center gap-4">
              {/* Placeholder for future components */}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto min-h-[calc(100vh-3.5rem)] px-4 py-6 lg:px-8">
        <Outlet />
      </main>

      <Toaster />
    </div>
  );
}

// export function RootLayout() {
//   return (
//     <div className="relative min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex h-14 items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               <span className="font-bold">ResuMatch AI</span>
//             </div>

//             {/* Navigation */}
//             <nav className="flex items-center space-x-4 lg:space-x-6">
//               {navigationItems.map(({ path, label, icon: Icon }) => (
//                 <NavLink
//                   key={path}
//                   to={path}
//                   className={({ isActive }) =>
//                     cn(
//                       "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
//                       isActive ? "text-primary" : "text-muted-foreground"
//                     )
//                   }
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span className="hidden lg:inline">{label}</span>
//                 </NavLink>
//               ))}
//             </nav>

//             {/* Future: User menu, theme toggle, etc. */}
//             <div className="flex items-center gap-4">
//               {/* Placeholder for future components */}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto min-h-[calc(100vh-3.5rem)] px-4 py-6 lg:px-8">
//         <Outlet />
//       </main>

//       {/* Toast Notifications */}
//       <Toaster />
//     </div>
//   );
// }
