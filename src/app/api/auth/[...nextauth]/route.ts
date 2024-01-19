import { mergeAnonymCartIntoUserCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { FormSubmitButton } from './../../../../components/FormSubmitButton';
import { env } from './../../../../lib/env';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.username = session.user
        .name!.split(' ')
        .join('')
        .toLocaleLowerCase();
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonymCartIntoUserCart(user.id);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
