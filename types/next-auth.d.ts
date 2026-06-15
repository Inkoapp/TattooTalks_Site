
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      pseudo: string
      is_admin: boolean
      avatar_url?: string
    }
  }

  interface User {
    id: string
    email: string
    pseudo: string
    is_admin: boolean
    avatar_url?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    pseudo: string
    is_admin: boolean
    avatar_url?: string
  }
}
