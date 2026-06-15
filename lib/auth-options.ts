
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user?.password_hash) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          pseudo: user.pseudo,
          is_admin: user.is_admin,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.pseudo = user.pseudo
        token.is_admin = user.is_admin
        token.avatar_url = user.avatar_url
      }
      
      // Récupérer l'avatar_url depuis la DB à chaque requête ou lors d'une mise à jour
      if (trigger === 'update' || !token.avatar_url) {
        if (token.sub) {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { avatar_url: true, pseudo: true, is_admin: true },
          })
          if (dbUser) {
            token.avatar_url = dbUser.avatar_url ?? undefined
            token.pseudo = dbUser.pseudo
            token.is_admin = dbUser.is_admin
          }
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.pseudo = token.pseudo as string
        session.user.is_admin = token.is_admin as boolean
        session.user.avatar_url = token.avatar_url as string | undefined
      }
      return session
    },
  },
}
