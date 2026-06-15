
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const ADMIN_SESSION_NAME = 'admin_session'
const ADMIN_SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'tattootalks_admin_secure_token_2024'

// For Server Components
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(ADMIN_SESSION_NAME)
    return sessionCookie?.value === ADMIN_SESSION_TOKEN
  } catch (error) {
    console.error('Admin auth check error:', error)
    return false
  }
}

// For API Routes - reads cookies from request
export function isAdminAuthenticatedFromRequest(req: NextRequest): boolean {
  try {
    const sessionCookie = req.cookies.get(ADMIN_SESSION_NAME)
    console.log('[Admin Auth API] Cookie name:', ADMIN_SESSION_NAME)
    console.log('[Admin Auth API] Cookie value from request:', sessionCookie?.value)
    console.log('[Admin Auth API] Expected token:', ADMIN_SESSION_TOKEN)
    console.log('[Admin Auth API] Match:', sessionCookie?.value === ADMIN_SESSION_TOKEN)
    return sessionCookie?.value === ADMIN_SESSION_TOKEN
  } catch (error) {
    console.error('Admin auth check error (API route):', error)
    return false
  }
}
