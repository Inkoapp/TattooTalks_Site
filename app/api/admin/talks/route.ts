
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/db'
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const authenticated = isAdminAuthenticatedFromRequest(req)
    
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const roomId = searchParams.get('roomId') || ''

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } }
      ]
    }

    if (roomId) {
      where.room_id = roomId
    }

    const [talks, total] = await Promise.all([
      prisma.talk.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              pseudo: true,
              email: true,
              avatar_url: true
            }
          },
          room: {
            select: {
              id: true,
              title: true
            }
          },
          _count: {
            select: {
              messages: true,
              likes: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.talk.count({ where })
    ])

    return NextResponse.json({
      talks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching talks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
