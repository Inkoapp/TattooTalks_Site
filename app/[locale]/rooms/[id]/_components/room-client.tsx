
'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations, useLocale } from '@/lib/i18n-context'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { S3Avatar } from '@/components/ui/s3-avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { S3Image } from '@/components/ui/s3-image'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Heart, MessageSquare, Clock, Send, ChevronLeft, Trash2, Search, Filter, X, Edit3 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { CreateTalkModal } from './create-talk-modal'
import { EditTalkModal } from './edit-talk-modal'
import { ShareButton } from '@/components/ui/share-button'

interface Room {
  id: string
  title: string
  description: string
  tags: string[]
  cover_image_url?: string
  creator?: {
    id: string
    pseudo: string
    avatar_url?: string
  }
  _count: {
    talks: number
  }
}

interface Talk {
  id: string
  title: string
  content: string
  tags: string[]
  image_url?: string
  created_at: string
  likes_count: number
  user: {
    id: string
    pseudo: string
    avatar_url?: string
  }
  _count: {
    messages: number
    likes: number
  }
  likes: { user_id: string }[]
  messages: {
    id: string
    content: string
    created_at: string
    likes_count: number
    user: {
      id: string
      pseudo: string
      avatar_url?: string
    }
    likes: { user_id: string }[]
  }[]
}

interface RoomClientProps {
  roomId: string
}

// Helper function to get translation key from room title
const getRoomTranslationKey = (title: string): string => {
  const mapping: { [key: string]: string } = {
    'Inspirations & Styles': 'inspirationsStyles',
    'Matériel & Techniques': 'materielTechniques',
    'Portfolios & Feedback': 'portfoliosFeedback',
    'Apprentis & Formations': 'apprentisFormations',
    'Hygiène & Sécurité': 'hygieneSecurite',
    'Guest Spots & Collaborations': 'guestSpotsCollabs',
    'Business & Marketing': 'businessMarketing',
    'Événements & Conventions': 'evenementsConventions',
    'TattooTalks Café': 'tattooCafe',
    'Conseils Clients & Couvertures': 'conseilsClients'
  }
  return mapping[title] || title.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function RoomClient({ roomId }: RoomClientProps) {
  const t = useTranslations()
  const locale = useLocale()
  const { data: session } = useSession() || {}
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [talks, setPosts] = useState<Talk[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({})
  const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({})
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)
  const [deletingRoom, setDeletingRoom] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showCreateTalkModal, setShowCreateTalkModal] = useState(false)
  const [showEditTalkModal, setShowEditTalkModal] = useState(false)
  const [editingTalk, setEditingTalk] = useState<Talk | null>(null)

  useEffect(() => {
    fetchRoom()
    fetchPosts()
  }, [roomId])

  // Auto-scroll to specific talk if hash is present in URL
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 300)
      }
    }
  }, [isLoading, talks])

  const fetchRoom = async () => {
    try {
      const response = await fetch(`/api/rooms`)
      if (response.ok) {
        const rooms = await response.json()
        const currentRoom = rooms.find((r: Room) => r.id === roomId)
        setRoom(currentRoom)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la salle:', error)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/rooms/${roomId}/talks`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des talks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTalk = async (data: { title: string; content: string; tags: string[]; image_url?: string }) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/rooms/${roomId}/talks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setShowCreateTalkModal(false)
        await fetchPosts()
        toast.success(t('room.talkCreated'))
      } else {
        toast.error(t('room.talkError'))
      }
    } catch (error) {
      toast.error(t('room.talkError'))
      console.error('Talk creation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditTalk = async (data: { title: string; content: string; tags: string[]; image_url?: string }) => {
    if (!editingTalk) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/talks/${editingTalk.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setShowEditTalkModal(false)
        setEditingTalk(null)
        await fetchPosts()
        toast.success(t('room.talkUpdated'))
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || t('room.talkUpdateError'))
      }
    } catch (error) {
      toast.error(t('room.talkUpdateError'))
      console.error('Talk edit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditModal = (talk: Talk) => {
    setEditingTalk(talk)
    setShowEditTalkModal(true)
  }

  const handleLike = async (talkId: string) => {
    try {
      const response = await fetch(`/api/talks/${talkId}/like`, {
        method: 'POST'
      })

      if (response.ok) {
        await fetchPosts()
      }
    } catch (error) {
      console.error('Erreur lors du like:', error)
    }
  }

  const handleMessageLike = async (talkId: string, messageId: string) => {
    try {
      const response = await fetch(`/api/talks/${talkId}/messages/${messageId}/like`, {
        method: 'POST'
      })

      if (response.ok) {
        await fetchPosts()
      }
    } catch (error) {
      console.error('Erreur lors du like du message:', error)
    }
  }

  const handleReply = async (talkId: string) => {
    const content = replyContent[talkId]
    if (!content?.trim()) return

    try {
      const response = await fetch(`/api/talks/${talkId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })

      if (response.ok) {
        setReplyContent({ ...replyContent, [talkId]: '' })
        await fetchPosts()
        toast.success(t('room.replyAdded'))
      }
    } catch (error) {
      toast.error(t('room.replyError'))
      console.error('Message error:', error)
    }
  }

  const toggleReplies = (talkId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [talkId]: !prev[talkId]
    }))
  }

  const handleDeletePost = async (talkId: string) => {
    if (!confirm(t('room.deleteTalkConfirm'))) {
      return
    }

    setDeletingPostId(talkId)
    try {
      const response = await fetch(`/api/talks/${talkId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success(t('room.talkDeleted'))
        setPosts(talks.filter(p => p.id !== talkId))
      } else {
        const data = await response.json()
        toast.error(data.error || t('room.deleteError'))
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error(t('room.deleteError'))
    } finally {
      setDeletingPostId(null)
    }
  }

  const handleDeleteRoom = async () => {
    if (!confirm(t('rooms.deleteConfirm'))) {
      return
    }

    setDeletingRoom(true)
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success(t('rooms.roomDeleted'))
        router.push(`/${locale}/rooms`)
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error('Erreur lors de la suppression de la salle')
    } finally {
      setDeletingRoom(false)
    }
  }

  // Extraire tous les tags uniques des talks
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    talks.forEach(talk => {
      talk.tags?.forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }, [talks])

  // Filter talks based on search query and selected tags
  const filteredTalks = useMemo(() => {
    return talks.filter(talk => {
      // Filtre par recherche
      const query = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery.trim() || 
        talk.title.toLowerCase().includes(query) ||
        talk.content.toLowerCase().includes(query) ||
        talk.user.pseudo.toLowerCase().includes(query) ||
        talk.tags?.some(tag => tag.toLowerCase().includes(query))
      
      // Filtre par tags (si des tags sont sélectionnés, le talk doit en avoir au moins un)
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => talk.tags?.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [talks, searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-zinc-700 rounded mb-4"></div>
          <div className="h-64 bg-zinc-700 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href={`/${locale}/rooms`}>
          <Button variant="ghost" size="sm">
            <ChevronLeft size={16} className="mr-1" />
            {t('room.backToRooms')}
          </Button>
        </Link>
        
        {room && room.creator && session?.user?.id === room.creator.id && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteRoom}
            disabled={deletingRoom}
            className="text-zinc-400 hover:text-red-500 hover:bg-red-950/20"
          >
            <Trash2 size={16} className="mr-2" />
            {t('room.deleteRoom')}
          </Button>
        )}
      </div>

      {/* Room Info */}
      {room && (
        <Card>
          <div className="aspect-video relative bg-zinc-800 rounded-t-xl overflow-hidden">
            {room.cover_image_url && (
              <S3Image
                cloudStoragePath={room.cover_image_url}
                alt={room.title}
                fill
                className="object-cover"
                sizes="100vw"
                clickable={false}
              />
            )}
          </div>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-4xl font-bold text-white mb-3">
              {t(`roomTitles.${getRoomTranslationKey(room.title)}`)}
            </h1>
            
            <p className="text-zinc-300 text-lg leading-relaxed">
              {t(`roomDescriptions.${getRoomTranslationKey(room.title)}`)}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              {room.creator ? (
                <div className="text-sm text-zinc-400">
                  {t('room.createdBy')} <span className="text-white">{room.creator.pseudo}</span>
                </div>
              ) : (
                <div className="text-sm text-zinc-400">
                  <span className="text-amber-500 font-semibold">{t('room.officialRoom')}</span>
                </div>
              )}
              <div className="text-sm text-zinc-400">
                {room._count.talks} {room._count.talks > 1 ? t('room.talks') : t('room.talk')}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Talk Button with Yellow/Orange Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Button
          onClick={() => setShowCreateTalkModal(true)}
          className="w-full py-5 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Edit3 size={20} className="mr-2" />
          {t('room.createTalk')}
        </Button>
      </motion.div>

      {/* Search and Filter Section */}
      {talks?.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                <Input
                  placeholder={t('room.searchTalks')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800/50 border-zinc-700"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Bouton Filtres par Tags */}
              {allTags.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="relative">
                      <Filter size={16} className="mr-2" />
                      {t('rooms.filters')}
                      {selectedTags.length > 0 && (
                        <Badge 
                          variant="default" 
                          className="ml-2 px-1.5 py-0 h-5 min-w-5 flex items-center justify-center"
                        >
                          {selectedTags.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-zinc-900 border-zinc-800" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{t('rooms.filterByCategory')}</h4>
                          <p className="text-xs text-zinc-400 mt-1">
                            {t('rooms.selectCategories')}
                          </p>
                        </div>
                        {selectedTags.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-xs"
                          >
                            <X size={14} className="mr-1" />
                            {t('rooms.clear')}
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                        {allTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer transition-all hover:scale-105"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/* Tags sélectionnés affichés */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-zinc-400">{t('rooms.activeFilters')}</span>
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <X size={12} className="ml-1" />
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Results count */}
            {(searchQuery || selectedTags.length > 0) && (
              <div className="text-sm text-zinc-400">
                {filteredTalks.length > 0 ? (
                  <>
                    {filteredTalks.length} {filteredTalks.length === 1 ? t('room.talkFound') : t('room.talksFound')}
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-zinc-400">{t('room.noTalksWithFilters')}</p>
                    <p className="text-zinc-500 text-xs mt-1">{t('room.tryDifferentFilters')}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {talks?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-zinc-500 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                {t('room.noDiscussions')}
              </h3>
              <p className="text-zinc-500">
                {t('room.beFirstToDiscuss')}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTalks?.map((talk, index) => {
            const userLiked = talk.likes.some(like => like.user_id === session?.user?.id)
            
            return (
              <motion.div
                key={talk.id}
                id={`talk-${talk.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="scroll-mt-24"
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <S3Avatar
                          cloudStoragePath={talk.user.avatar_url}
                          fallback={talk.user.pseudo.charAt(0).toUpperCase()}
                        />
                        <div>
                          <h4 className="font-semibold text-white">
                            {talk.user.pseudo}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-zinc-400">
                            <Clock size={14} />
                            <span>
                              {formatDistanceToNow(new Date(talk.created_at), { 
                                addSuffix: true, 
                                locale: fr 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {session?.user?.id === talk.user.id && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(talk)}
                            disabled={deletingPostId === talk.id}
                            className="text-zinc-400 hover:text-blue-500 hover:bg-blue-950/20"
                          >
                            <Edit3 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(talk.id)}
                            disabled={deletingPostId === talk.id}
                            className="text-zinc-400 hover:text-red-500 hover:bg-red-950/20"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Talk Title */}
                    {talk.title && (
                      <h3 className="text-xl font-bold text-white mb-3 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                        {talk.title}
                      </h3>
                    )}

                    {/* Talk Content */}
                    <p className="text-zinc-200 mb-4 leading-relaxed">
                      {talk.content}
                    </p>

                    {/* Talk Tags */}
                    {talk.tags && talk.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {talk.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Talk Image */}
                    {talk.image_url && (
                      <div className="mt-4 mb-4 relative w-full h-[400px] rounded-lg overflow-hidden bg-zinc-800">
                        <S3Image
                          cloudStoragePath={talk.image_url}
                          alt="Talk image"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 600px"
                        />
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(talk.id)}
                          className={userLiked ? 'text-red-400 hover:text-red-500 hover:bg-red-500/10' : 'text-zinc-400 hover:text-red-400 hover:bg-red-500/10'}
                        >
                          <Heart size={16} className={userLiked ? 'fill-current' : ''} />
                          <span className="ml-1">{talk._count.likes}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReplies(talk.id)}
                          className="text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10"
                        >
                          <MessageSquare size={16} />
                          <span className="ml-1">{talk._count.messages}</span>
                        </Button>

                        <ShareButton
                          url={`${typeof window !== 'undefined' ? window.location.origin : 'https://tattoo-talks.com'}/${locale}/talks/${talk.id}`}
                          title={talk.title}
                          description={talk.content.substring(0, 150)}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Replies */}
                    {talk.messages.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReplies(talk.id)}
                          className="text-zinc-400"
                        >
                          {expandedPosts[talk.id] ? t('room.hide') : t('room.show')} {talk.messages.length} {talk.messages.length > 1 ? t('room.replies') : t('room.reply')}
                        </Button>
                        
                        {expandedPosts[talk.id] && (
                          <div className="space-y-3">
                            {/* Messages List */}
                            <div className="pl-4 border-l-2 border-zinc-800 space-y-3">
                              {talk.messages.map((message) => (
                                <div key={message.id} className="flex space-x-3">
                                  <S3Avatar
                                    cloudStoragePath={message.user.avatar_url}
                                    fallback={message.user.pseudo.charAt(0).toUpperCase()}
                                    className="w-8 h-8"
                                  />
                                  <div className="flex-1">
                                    <div className="bg-zinc-800 rounded-lg p-3">
                                      <div className="text-sm font-medium text-white mb-1">
                                        {message.user.pseudo}
                                      </div>
                                      <p className="text-sm text-zinc-300">
                                        {message.content}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                      <div className="text-xs text-zinc-500">
                                        {formatDistanceToNow(new Date(message.created_at), { 
                                          addSuffix: true, 
                                          locale: fr 
                                        })}
                                      </div>
                                      {session?.user?.id && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleMessageLike(talk.id, message.id)}
                                          className={`h-6 px-2 ${
                                            message.likes.some((like) => like.user_id === session.user.id)
                                              ? 'text-red-500'
                                              : 'text-zinc-400'
                                          }`}
                                        >
                                          <Heart
                                            size={14}
                                            className={
                                              message.likes.some((like) => like.user_id === session.user.id)
                                                ? 'fill-current'
                                                : ''
                                            }
                                          />
                                          <span className="ml-1 text-xs">{message.likes_count}</span>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Message Form - Now at the bottom */}
                            <div className="pl-4">
                              <div className="flex space-x-3">
                                <S3Avatar
                                  cloudStoragePath={session?.user?.avatar_url}
                                  fallback={session?.user?.pseudo?.charAt(0).toUpperCase()}
                                  className="w-8 h-8"
                                />
                                <div className="flex-1 flex space-x-2">
                                  <Textarea
                                    placeholder={t('room.addReply')}
                                    value={replyContent[talk.id] || ''}
                                    onChange={(e) => setReplyContent({
                                      ...replyContent,
                                      [talk.id]: e.target.value
                                    })}
                                    rows={2}
                                    className="resize-none text-sm"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleReply(talk.id)}
                                    disabled={!replyContent[talk.id]?.trim()}
                                  >
                                    <Send size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Create Talk Modal */}
      <CreateTalkModal
        open={showCreateTalkModal}
        onClose={() => setShowCreateTalkModal(false)}
        onSubmit={handleCreateTalk}
        isSubmitting={isSubmitting}
      />

      {/* Edit Talk Modal */}
      {editingTalk && (
        <EditTalkModal
          open={showEditTalkModal}
          onClose={() => {
            setShowEditTalkModal(false)
            setEditingTalk(null)
          }}
          onSubmit={handleEditTalk}
          isSubmitting={isSubmitting}
          initialData={{
            title: editingTalk.title,
            content: editingTalk.content,
            tags: editingTalk.tags,
            image_url: editingTalk.image_url
          }}
        />
      )}
    </div>
  )
}
