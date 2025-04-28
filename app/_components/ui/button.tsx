import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/app/_lib/utils"
import { forwardRef, ReactNode } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            },
            size: {
                default: "h-9 px-3 py-2",
                xs: "h-6 rounded-sm px-2 font-normal text-xs",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-6",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)
type ButtonProps = { 
    className: string, 
    variant: "default" | "secondary", 
    size: "default" | "xs" | "sm" | "lg" | "icon", 
    onClick?: () => void, 
    disabled?:boolean, 
    asChild?: boolean, 
    children: ReactNode 
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, onClick, disabled = false, asChild = false, ...children }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        (<Comp
            className={cn('h-9', buttonVariants({ variant, size, className }))}
            ref={ref}
            onClick={onClick}
            disabled={disabled}
            {...children} />)
    );
})
Button.displayName = "Button"

export { Button, buttonVariants }
