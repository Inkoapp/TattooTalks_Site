
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { S3Avatar } from '@/components/ui/s3-avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, Heart, Clock, ArrowRight, Trash2, Flame, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS, es, ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useTranslations, useLocale } from '@/lib/i18n-context'

interface Talk {
  id: string
  content: string
  title?: string
  created_at: string
  likes_count: number
  user: {
    id: string
    pseudo: string
    avatar_url?: string
  }
  room: {
    id: string
    title: string
  }
  _count: {
    messages: number
    likes: number
  }
  likes: { user_id: string }[]
}

export function FeedClient() {
  const t = useTranslations()
  const locale = useLocale()
  const [popularTalks, setPopularTalks] = useState<Talk[]>([])
  const [recentTalks, setRecentTalks] = useState<Talk[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)
  const { data: session } = useSession() || {}

  const getDateFnsLocale = () => {
    switch (locale) {
      case 'fr': return fr
      case 'en': return enUS
      case 'es': return es
      case 'pt': return ptBR
      default: return enUS
    }
  }

  useEffect(() => {
    fetchTalks()
  }, [])

  const fetchTalks = async () => {
    try {
      // Récupérer les talks populaires et récents en parallèle
      const [popularResponse, recentResponse] = await Promise.all([
        fetch('/api/feed?type=popular&limit=6'),
        fetch('/api/feed?type=recent&limit=10')
      ])

      if (popularResponse.ok && recentResponse.ok) {
        const popular = await popularResponse.json()
        const recent = await recentResponse.json()
        setPopularTalks(popular)
        setRecentTalks(recent)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des talks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePost = async (talkId: string) => {
    if (!confirm(t('talk.deleteConfirm'))) {
      return
    }

    setDeletingPostId(talkId)
    try {
      const response = await fetch(`/api/talks/${talkId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success(t('talk.deleteSuccess'))
        // Retirer le talk des deux listes
        setPopularTalks(popularTalks.filter(p => p.id !== talkId))
        setRecentTalks(recentTalks.filter(p => p.id !== talkId))
      } else {
        const data = await response.json()
        toast.error(data.error || t('talk.deleteError'))
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error(t('talk.deleteError'))
    } finally {
      setDeletingPostId(null)
    }
  }

  const renderTalkCard = (talk: Talk, index: number) => (
    <motion.div
      key={talk.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <S3Avatar
                cloudStoragePath={talk.user.avatar_url}
                fallback={talk.user.pseudo.charAt(0).toUpperCase()}
              />
              <div className="space-y-1">
                <h4 className="font-semibold text-white">
                  {talk.user.pseudo}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <Clock size={14} />
                  <span>
                    {formatDistanceToNow(new Date(talk.created_at), { 
                      addSuffix: true, 
                      locale: getDateFnsLocale()
                    })}
                  </span>
                </div>
                <Link href={`/${locale}/rooms/${talk.room.id}`}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-zinc-700">
                    {talk.room.title}
                  </Badge>
                </Link>
              </div>
            </div>
            
            {session?.user?.id === talk.user.id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeletePost(talk.id)}
                disabled={deletingPostId === talk.id}
                className="text-zinc-400 hover:text-red-500 hover:bg-red-950/20"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {talk.title && (
            <h3 className="text-lg font-semibold text-white mb-2">{talk.title}</h3>
          )}
          <p className="text-zinc-200 mb-4 leading-relaxed line-clamp-3">
            {talk.content}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-zinc-400">
                <Heart size={16} />
                <span className="text-sm">{talk._count.likes}</span>
              </div>
              <div className="flex items-center space-x-1 text-zinc-400">
                <MessageSquare size={16} />
                <span className="text-sm">{talk._count.messages}</span>
              </div>
            </div>
            
            <Link href={`/${locale}/rooms/${talk.room.id}`}>
              <Button variant="ghost" size="sm">
                {t('rooms.viewRoom')}
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(2)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="h-8 w-48 bg-zinc-700 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="w-24 h-4 bg-zinc-700 rounded"></div>
                        <div className="w-32 h-3 bg-zinc-700 rounded"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-zinc-700 rounded"></div>
                      <div className="w-3/4 h-4 bg-zinc-700 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const hasNoTalks = popularTalks.length === 0 && recentTalks.length === 0

  return (
    <div className="space-y-8">
      {/* Header avec bouton Toutes les salles */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.feed')}</h2>
        <Link href={`/${locale}/rooms`}>
          <Button>
            <MessageSquare size={16} className="mr-2" />
            {t('nav.allRooms')}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      {hasNoTalks ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-zinc-500 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">
              {t('dashboard.noPostsYet')}
            </h3>
            <p className="text-zinc-500 mb-4">
              {t('room.noPosts')}
            </p>
            <Link href={`/${locale}/rooms`}>
              <Button>{t('dashboard.newPost')}</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Section Talks Populaires */}
          {popularTalks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Flame className="text-orange-500" size={24} />
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  {t('dashboard.popularTalks')}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularTalks.map((talk, index) => renderTalkCard(talk, index))}
              </div>
            </div>
          )}

          {/* Section Derniers Talks */}
          {recentTalks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-500" size={24} />
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {t('dashboard.recentTalks')}
                </h3>
              </div>
              <div className="space-y-4">
                {recentTalks.map((talk, index) => renderTalkCard(talk, index))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
