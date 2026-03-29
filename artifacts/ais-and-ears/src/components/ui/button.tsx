import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "destructive" | "neon"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95"
    
    const variants = {
      default: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/20 hover:border-primary/50",
      outline: "border border-primary/30 bg-transparent hover:bg-primary/10 text-primary",
      ghost: "hover:bg-primary/10 hover:text-primary text-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 box-glow-strong",
      neon: "bg-primary text-primary-foreground hover:bg-primary/90 box-glow-strong text-glow hover:-translate-y-0.5",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
