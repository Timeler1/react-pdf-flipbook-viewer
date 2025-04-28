'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import config from '@/tailwind.config.js';
import { Suspense } from 'react';
//@ts-ignore
const primaryColor = config.theme.extend.colors.primary.DEFAULT; // Primary color of website

export default function NprogressProviders({ children }) {
    return (
        <>
            {children}
            <Suspense>
                <ProgressBar
                    height="4px"
                    color={primaryColor}
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </Suspense>
        </>
    );
};