import React, { useState, useEffect, useRef, ReactNode, useLayoutEffect } from 'react';
import { cn } from "./../lib/utils"; // Assuming this path is correct

interface SimpleDropdownProps {
    trigger: ReactNode;
    children: (closeDropdown: () => void) => ReactNode; // Children is a render prop
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    align?: 'left' | 'right'; // Optional alignment for the dropdown content
    openDirection?: 'up' | 'down' | 'auto'; // Control open direction
}

export const Dropdown = ({
    trigger,
    children,
    contentClassName,
    contentStyle,
    align = 'left',
    openDirection = 'auto' // Default to auto-detection
}: SimpleDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ref for the dropdown content

    // State to hold the calculated position style (top/bottom)
    const [calculatedPositionStyle, setCalculatedPositionStyle] = useState<React.CSSProperties>({
        top: '100%', // Default to opening downwards
        marginTop: '4px',
    });

    const toggleDropdown = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);

    // Effect for click outside and Esc key
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isOpen]);


    // Effect to calculate dropdown position (up or down)
    // useLayoutEffect ensures this runs after DOM mutations but before paint
    useLayoutEffect(() => {
        if (isOpen && wrapperRef.current && contentRef.current) {
            const triggerRect = wrapperRef.current.getBoundingClientRect();
            const contentHeight = contentRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const spaceAbove = triggerRect.top;
            const spaceBelow = viewportHeight - triggerRect.bottom;
            const offset = 4; // The 4px margin

            let newPositionStyle: React.CSSProperties = {};

            if (openDirection === 'up') {
                newPositionStyle = { bottom: '100%', top: 'auto', marginBottom: `${offset}px` };
            } else if (openDirection === 'down') {
                newPositionStyle = { top: '100%', bottom: 'auto', marginTop: `${offset}px` };
            } else { // 'auto'
                // Prefer opening downwards if enough space, or if more space below than above
                // Open upwards if not enough space below AND (enough space above OR more space above than below)
                if (spaceBelow < (contentHeight + offset) && spaceAbove > spaceBelow && spaceAbove > (contentHeight + offset) ) {
                     // Open upwards
                    newPositionStyle = { bottom: '100%', top: 'auto', marginBottom: `${offset}px` };
                } else {
                    // Default to opening downwards
                    newPositionStyle = { top: '100%', bottom: 'auto', marginTop: `${offset}px` };
                }
            }
            setCalculatedPositionStyle(newPositionStyle);
        } else if (!isOpen) {
            if (openDirection === 'auto') {
                 setCalculatedPositionStyle({
                    top: '100%',
                    marginTop: '4px',
                });
            }
        }
    }, [isOpen, openDirection, align]); // Rerun if isOpen or openDirection changes

    const finalContentStyle: React.CSSProperties = {
        position: 'absolute',
        left: align === 'left' ? 0 : undefined,
        right: align === 'right' ? 0 : undefined,
        zIndex: 50,
        ...contentStyle, // User-provided base styles
        ...calculatedPositionStyle, // Dynamically calculated position (top/bottom and margin)
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
                    ref={contentRef}
                    className={cn(
                        "min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                        contentClassName ?? ''
                    )}
                    style={finalContentStyle}
                    role="menu"
                >
                    {children(closeDropdown)}
                </div>
            )}
        </div>
    );
};