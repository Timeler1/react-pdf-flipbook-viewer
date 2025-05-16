import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./../lib/utils";
import React, { forwardRef, ButtonHTMLAttributes, ReactElement } from "react";

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
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { // Provides variant and size from CVA
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {

    const cvaGeneratedClasses = buttonVariants({ variant, size });

    if (asChild) {
        if (React.Children.count(children) !== 1 || !React.isValidElement(children)) {
            console.error(
                "Button component with `asChild` prop expects a single ReactElement child."
            );
            throw new Error(
                "Button component with `asChild` prop expects a single ReactElement child."
            );
        }
        const childElement = children as ReactElement<any>;

        // Merge props:
        // 1. Start with the child's original props.
        // 2. Add/override with props passed directly to the Button component (like `onClick`, `disabled`, `type` from `...props`).
        // 3. Merge `className` carefully.
        // 4. Forward the `ref`.
        const mergedProps = {
            ...childElement.props, // Child's original props
            ...props,              // Props passed to Button (e.g., onClick, disabled, type)
            className: cn(
                cvaGeneratedClasses,      // Base styles from CVA
                className ?? '',                // Classes passed directly to <Button className="...">
                childElement.props.className // Child's original classes
            ),
            ref: ref,              // Forward the ref to the child element
        };

        return React.cloneElement(childElement, mergedProps);
    }

    // If not asChild, render a standard <button> element
    return (
        <button
            className={cn(cvaGeneratedClasses, className ?? '')}
            ref={ref}
            {...props}
        >
            {children} {/* Render children inside the button */}
        </button>
    );
});

Button.displayName = "Button";

export { Button, buttonVariants };