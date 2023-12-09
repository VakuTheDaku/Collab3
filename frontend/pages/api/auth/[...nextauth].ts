import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import SpotifyProvider from "next-auth/providers/spotify";
import { profile } from 'console';

export const authOptions = (req: any, res: any) => {
    return {
        pages: {
            signIn: '/',
        },
        providers: [
            SpotifyProvider({
                clientId: process.env.SPOTIFY_CLIENT_ID!,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
                profile: async (profile: any) => {
                    try {
                        const user = {...profile}
                        return user as any
                    } catch (err: any) {
                        throw new Error(err.message)
                    }
                }
            })
        ],
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            store: '',
            maxAge: 60 * 60,
            error: {},
        },
        callbacks: {
            jwt: async ({ token, user }: any) => {
                user && (token.user = user);
                return token;
            },
            session: async ({ session, token }: any) => {
                console.log(token.user)
                session.user = token.user
                return session as any;
            },
        },
    }
}

export default (req: any, res: any) => {
    return NextAuth(req, res, authOptions(req, res));
};