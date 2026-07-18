import { Home, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export type TabId = "home" | "packages" | "settings";

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  const packagesActive = active === "packages";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-primary/20 h-16 flex items-stretch">
      {/* Home tab — in-page state */}
      <button
        onClick={() => onChange("home")}
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative",
          active === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {active === "home" && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary rounded-b-full" />
        )}
        <Home className={cn("w-5 h-5 transition-transform", active === "home" && "scale-110")} />
        <span className="text-[10px] font-medium tracking-wide uppercase">Home</span>
      </button>

      {/* Packages tab — real link so crawlers can follow it */}
      <Link
        href="/pricing"
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative no-underline",
          packagesActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {packagesActive && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary rounded-b-full" />
        )}
        <ShoppingBag className={cn("w-5 h-5 transition-transform", packagesActive && "scale-110")} />
        <span className="text-[10px] font-medium tracking-wide uppercase">Packages</span>
      </Link>

      {/* Settings tab — in-page state */}
      <button
        onClick={() => onChange("settings")}
        className={cn(
          "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative",
          active === "settings" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {active === "settings" && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary rounded-b-full" />
        )}
        <SlidersHorizontal className={cn("w-5 h-5 transition-transform", active === "settings" && "scale-110")} />
        <span className="text-[10px] font-medium tracking-wide uppercase">Settings</span>
      </button>
    </nav>
  );
}
