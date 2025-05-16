import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from "./../lib/utils"; // Assuming this path is correct

interface SimpleDropdownProps {
    trigger: ReactNode;
    children: (closeDropdown: () => void) => ReactNode; // Children is a render prop
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    align?: 'left' | 'right'; // Optional alignment for the dropdown content
}

export const Dropdown = ({
    trigger,
    children,
    contentClassName,
    contentStyle,
    align = 'left'
}: SimpleDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            const handleEsc = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    closeDropdown();
                }
            };
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener('keydown', handleEsc);
            };
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const defaultContentStyle: React.CSSProperties = {
        position: 'absolute',
        top: '100%',
        left: align === 'left' ? 0 : undefined,
        right: align === 'right' ? 0 : undefined,
        zIndex: 50,
        marginTop: '4px', // Default offset
        ...contentStyle
    };

    return (
        <div className="relative inline-block" ref={wrapperRef}>
            <div
                onClick={toggleDropdown}
                className="cursor-pointer"
                role="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown();
                    }
                }}
            >
                {trigger}
            </div>
            {isOpen && (
                <div
                    className={cn(
                        "min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                        contentClassName ?? ''
                    )}
                    style={defaultContentStyle}
                    role="menu"
                >
                    {children(closeDropdown)}
                </div>
            )}
        </div>
    );
};