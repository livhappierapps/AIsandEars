import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "neon" | "destructive"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
  
  const variants = {
    default: "border-transparent bg-secondary text-secondary-foreground",
    outline: "border border-primary/30 text-primary",
    neon: "border-transparent bg-primary/20 text-primary border border-primary/50 box-glow",
    destructive: "border-transparent bg-destructive/20 text-destructive border border-destructive/50",
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
