import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border-primary/30 text-center">
        <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-8">
          The sector you are looking for does not exist in this database.
        </p>
        <Button asChild variant="neon" className="w-full">
          <Link href="/">Return to Main Sector</Link>
        </Button>
      </div>
    </div>
  );
}
