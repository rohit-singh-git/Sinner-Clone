import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                await connectDB();
                const user = await User.findOne({
                    email: credentials.email,
                }).select("+password");
                if (!user || !user.password) return null;
                const valid = await bcrypt.compare(
                    credentials.password as string,
                    user.password,
                );
                if (!valid) return null;
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
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
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDB();
                const existing = await User.findOne({ email: user.email });
                if (!existing) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        provider: "google",
                    });
                }
            }
            return true;
        },
    },
    pages: { signIn: "/account/login" },
    session: { strategy: "jwt" },
});
