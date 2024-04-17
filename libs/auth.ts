import prismadb from "@/libs/prismadb";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth";

type SessionProps = {
    session: any;
    token: any;
};

 export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) 
                    return null

                const dbUser = await prismadb.user.findFirst({
                    where: { email: credentials.email}
                })

                if (!dbUser) throw new Error('User not found')

                const matchPassword = await bcrypt.compare(credentials.password, dbUser.password)

                if (!matchPassword) throw new Error('Wrong password')

                return {
                    id: dbUser.id,
                    name: dbUser.username,
                    email: dbUser.email
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        session: async ({ session, token }: SessionProps) => {
          if (session?.user) {
            session.user.id = token.sub;
            delete session.user.email; // sanitize data for security
          }
          return session;
        },
    },
}