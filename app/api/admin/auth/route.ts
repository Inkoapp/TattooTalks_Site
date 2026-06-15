
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!'
const ADMIN_SESSION_NAME = 'admin_session'
const ADMIN_SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'tattootalks_admin_secure_token_2024'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body

    console.log('[Admin Auth] Login attempt:', { username, providedPass: password?.substring(0, 3) + '***' })
    console.log('[Admin Auth] Expected:', { username: ADMIN_USERNAME, password: ADMIN_PASSWORD?.substring(0, 3) + '***' })

    // Verify credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create response with redirect
      const response = NextResponse.json({ 
        success: true,
        redirectUrl: '/admin' 
      })
      
      // Set cookie via response headers
      response.cookies.set(ADMIN_SESSION_NAME, ADMIN_SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      console.log('[Admin Auth] Login successful, cookie set')
      return response
    }

    console.log('[Admin Auth] Login failed - invalid credentials')
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true })
    response.cookies.delete(ADMIN_SESSION_NAME)
    return response
  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
