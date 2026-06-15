
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

    // Get counts
    const [
      totalUsers,
      totalTalks,
      totalMessages,
      totalRooms,
      totalLikes,
      totalContactMessages,
      newContactMessages,
      recentUsers,
      recentTalks
    ] = await Promise.all([
      prisma.user.count(),
      prisma.talk.count(),
      prisma.message.count(),
      prisma.room.count(),
      prisma.like.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: 'nouveau' } }),
      prisma.user.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.talk.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ])

    // Get most active users
    const activeUsers = await prisma.user.findMany({
      select: {
        id: true,
        pseudo: true,
        email: true,
        avatar_url: true,
        _count: {
          select: {
            talks: true,
            messages: true,
            likes: true
          }
        }
      },
      orderBy: [
        { talks: { _count: 'desc' } }
      ],
      take: 10
    })

    // Get most popular rooms
    const popularRooms = await prisma.room.findMany({
      select: {
        id: true,
        title: true,
        cover_image_url: true,
        _count: {
          select: {
            talks: true
          }
        }
      },
      orderBy: [
        { talks: { _count: 'desc' } }
      ],
      take: 5
    })

    // Get activity by day (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const dailyActivity = await prisma.$queryRaw<{ date: Date; talks: bigint; messages: bigint }[]>`
      SELECT 
        created_at::date as date,
        COUNT(CASE WHEN type = 'talk' THEN 1 END) as talks,
        COUNT(CASE WHEN type = 'message' THEN 1 END) as messages
      FROM (
        SELECT created_at, 'talk' as type FROM talks WHERE created_at >= ${sevenDaysAgo}
        UNION ALL
        SELECT created_at, 'message' as type FROM messages WHERE created_at >= ${sevenDaysAgo}
      ) combined
      GROUP BY created_at::date
      ORDER BY date ASC
    `

    // Convert bigint to number for JSON serialization
    const formattedDailyActivity = dailyActivity.map(day => ({
      date: day.date,
      talks: Number(day.talks),
      messages: Number(day.messages)
    }))

    // Get users by country
    const usersByCountry = await prisma.user.groupBy({
      by: ['country'],
      _count: {
        id: true
      },
      where: {
        country: {
          not: null
        }
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    })

    // Calculate engagement rate (users with at least 1 talk or message)
    const activeUsersCount = await prisma.user.count({
      where: {
        OR: [
          { talks: { some: {} } },
          { messages: { some: {} } }
        ]
      }
    })

    const engagementRate = totalUsers > 0 ? ((activeUsersCount / totalUsers) * 100).toFixed(1) : '0'

    // Get previous month stats for comparison
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const [usersLastMonth, talksLastMonth] = await Promise.all([
      prisma.user.count({
        where: {
          created_at: {
            gte: oneMonthAgo
          }
        }
      }),
      prisma.talk.count({
        where: {
          created_at: {
            gte: oneMonthAgo
          }
        }
      })
    ])

    return NextResponse.json({
      overview: {
        totalUsers,
        totalTalks,
        totalMessages,
        totalRooms,
        totalLikes,
        totalContactMessages,
        newContactMessages,
        recentUsers,
        recentTalks,
        engagementRate: parseFloat(engagementRate),
        activeUsersCount,
        usersLastMonth,
        talksLastMonth
      },
      activeUsers,
      popularRooms,
      dailyActivity: formattedDailyActivity,
      usersByCountry: usersByCountry.map(item => ({
        country: item.country || 'Non spécifié',
        count: item._count.id
      }))
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}