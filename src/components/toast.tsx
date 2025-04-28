import { Cross2Icon } from "@radix-ui/react-icons"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "./../lib/utils"
import { forwardRef, ReactNode } from "react";

const ToastProvider = ToastPrimitives.Provider
type GenericToastProps = {
    className?: string,
    children?: ReactNode
}

const ToastViewport = forwardRef<HTMLOListElement, GenericToastProps>(({ className, ...children }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
            className ?? ''
        )}
        {...children} />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
type ToastProps = GenericToastProps & {
    variant: "default" | "destructive"
}
const Toast = forwardRef<HTMLLIElement, ToastProps>(({ className, variant, ...children }, ref) => {
    return (
        (<ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant }), className ?? '')}
            {...children} />)
    );
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastClose = forwardRef<HTMLButtonElement, GenericToastProps>(({ className, ...children }, ref) => (
    <ToastPrimitives.Close
        ref={ref}
        className={cn(
            "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
            className ?? ''
        )}
        toast-close=""
        {...children}>
        <Cross2Icon className="h-4 w-4" />
    </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = forwardRef<HTMLDivElement, GenericToastProps>(({ className, ...children }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        className={cn("text-sm font-semibold [&+div]:text-xs", className ?? '')}
        {...children} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = forwardRef<HTMLDivElement, GenericToastProps>(({ className, ...children }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        className={cn("text-sm opacity-90", className ?? '')}
        {...children} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose };
