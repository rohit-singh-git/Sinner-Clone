import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize() {
                return null;
            },
        }),
    ],
    pages: { signIn: "/account/login" },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as { role?: string }).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const role = (auth?.user as { role?: string })?.role;
            const path = nextUrl.pathname;

            if (
                path.startsWith("/account") &&
                !path.startsWith("/account/login") &&
                !path.startsWith("/account/register") &&
                !isLoggedIn
            )
                return false;

            if (path.startsWith("/admin")) {
                if (!isLoggedIn) return false;
                if (role !== "admin")
                    return Response.redirect(new URL("/", nextUrl));
            }

            return true;
        },
    },
};
