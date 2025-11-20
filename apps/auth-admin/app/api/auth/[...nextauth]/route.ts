import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ApiClient } from '@sporton/apis'
import api from '@sporton/apis'

const handler = NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const endpoint = ApiClient.auth.login({
                        email: credentials?.email!,
                        password: credentials?.password!
                    })
                    const { data } = await api.post(endpoint.path, endpoint.parameters?.body)
                    if (data) {
                        return data
                    }
                    return null
                } catch (error) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                token.access_token = account.access_token
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.access_token = token.access_token as string
            session.user = token.user as any
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
        // verifyPhone: '/auth/verify-phone',
        // onboarding: '/onboarding',
    },
    session: {
        strategy: 'jwt',
    },
})

export { handler as GET, handler as POST } 