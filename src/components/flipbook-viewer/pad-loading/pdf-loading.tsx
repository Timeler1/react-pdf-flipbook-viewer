import React from 'react';
import './style.css';

const PdfLoading = () => {
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-background">
            <div className="flex items-center gap-3 p-2 rounded-md">
                <div className="w-14 h-fit flex items-center justify-end relative animate-pulse">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="hsl(var(--primary))"
                        viewBox="0 0 126 75"
                        className="w-full h-auto shadow-sm"
                    >
                        <rect
                            strokeWidth="3"
                            stroke="hsl(var(--background))"
                            rx="7.5"
                            height="70"
                            width="121"
                            y="2.5"
                            x="2.5"
                        ></rect>
                        <line
                            strokeWidth="2"
                            stroke="hsl(var(--background))"
                            y2="75"
                            x2="63.5"
                            x1="63.5"
                        ></line>
                        <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="hsl(var(--background))"
                            d="M25 20H50"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="hsl(var(--background))"
                            d="M101 20H76"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="hsl(var(--background))"
                            d="M16 30L50 30"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="hsl(var(--background))"
                            d="M110 30L76 30"
                        ></path>
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff74"
                        viewBox="0 0 65 75"
                        className="page w-1/2 h-auto absolute"
                    >
                        <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="hsl(var(--primary))"
                            d="M40 20H15"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="hsl(var(--primary))"
                            d="M49 30L15 30"
                        ></path>
                        <path
                            strokeWidth="2"
                            stroke="hsl(var(--primary))"
                            d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
                        ></path>
                    </svg>
                </div>
                <div className="text-base font-semibold">
                    Loading PDF...
                </div>
            </div>
        </div>
    )
}

export default PdfLoading