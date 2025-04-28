import "@/app/_styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from '../_lib/utils'
import NprogressProviders from "../_providers/nprogress-provider";
import ThemeProvider from "../_providers/theme-provider";
import { Toaster } from "../_components/ui/toaster";

export const fontSans = FontSans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-sans",
})

// To Avoidn 500 error of Promise.withResolvers is not a function (Issues of React_PDF) >>>>>>>>>>>>>>>>
if (typeof Promise.withResolvers === "undefined") {
    if (typeof window !== 'undefined') {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        window.Promise.withResolvers = function () {
            let resolve, reject
            const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })
            return { promise, resolve, reject }
        }
    } else {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        global.Promise.withResolvers = function () {
            let resolve, reject
            const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })
            return { promise, resolve, reject }
        }
    }
}

export default async function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <NprogressProviders>
                    <ThemeProvider attribute="class" defaultTheme="dark">
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </NprogressProviders>
            </body>
        </html>
    );
}
