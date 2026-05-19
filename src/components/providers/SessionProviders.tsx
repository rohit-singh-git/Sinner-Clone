"use client";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function AuthSessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            {children}
            <ProgressBar
                height="2px"
                color="#ffffff"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </SessionProvider>
    );
}
