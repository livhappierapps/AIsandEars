import { Home, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabId = "home" | "packages" | "settings";

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "packages", label: "Packages", Icon: ShoppingBag },
  { id: "settings", label: "Settings", Icon: SlidersHorizontal },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-primary/20 h-16 flex items-stretch">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary rounded-b-full" />
            )}
            <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
            <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
