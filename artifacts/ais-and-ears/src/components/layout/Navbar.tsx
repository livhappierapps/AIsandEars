import { Link } from "wouter";
import { Activity, Radio } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/20 h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/40 group-hover:box-glow transition-all">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-foreground group-hover:text-primary transition-colors">
            AIs<span className="text-primary">&</span>Ears
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-primary/10">
            <Activity className="w-3 h-3 text-primary" />
            <span>Systems Nominal</span>
          </div>
        </div>
      </div>
    </header>
  );
}
