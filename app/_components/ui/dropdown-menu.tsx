"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/app/_lib/utils"
import { forwardRef, ReactNode } from "react"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
type GenericDropdownProps = {
    className?: string,
    onClick?: () => void,
    children?: ReactNode
}
type DropdownMenuContentProps = GenericDropdownProps & {
    sideOffset?: number,
}
const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(({ className, sideOffset = 4, onClick, ...children }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-2 text-popover-foreground shadow-sm",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...children} />
    </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = forwardRef<HTMLDivElement, GenericDropdownProps>(({ className, onClick, ...children }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...children} />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
}
