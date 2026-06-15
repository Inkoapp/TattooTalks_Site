
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Eye, FileText } from 'lucide-react'
import Link from 'next/link'
import { S3Image } from '@/components/ui/s3-image'
import { useTranslations, useLocale } from '@/lib/i18n-context'

interface Room {
  id: string
  title: string
  icon: string
  description: string
  tags: string[]
  cover_image_url?: string
  is_fixed: boolean
  _count: {
    talks: number
    messages: number
  }
}

// Mapping des titres français vers les clés de traduction
const titleToKeyMap: Record<string, string> = {
  'Inspirations & Styles': 'inspirationsStyles',
  'Matériel & Techniques': 'materielTechniques',
  'Portfolios & Feedback': 'portfoliosFeedback',
  'Apprentis & Formations': 'apprentisFormations',
  'Hygiène & Sécurité': 'hygieneSecurite',
  'Guest Spots & Collaborations': 'guestSpotsCollabs',
  'Business & Marketing': 'businessMarketing',
  'Événements & Conventions': 'evenementsConventions',
  'TattooTalks Café': 'tattooCafe',
  'Conseils Clients & Couvertures': 'conseilsClients',
}

export function RoomsClient() {
  const t = useTranslations()
  const locale = useLocale()
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fonction pour obtenir le titre traduit
  const getTranslatedTitle = (room: Room) => {
    const key = titleToKeyMap[room.title]
    return key ? t(`roomTitles.${key}`) : room.title
  }

  // Fonction pour obtenir la description traduite
  const getTranslatedDescription = (room: Room) => {
    const key = titleToKeyMap[room.title]
    return key ? t(`roomDescriptions.${key}`) : room.description
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms')
      if (response.ok) {
        const data = await response.json()
        setRooms(data)
      }
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-video bg-zinc-700 rounded-t-xl"></div>
            <CardContent className="p-6">
              <div className="w-24 h-5 bg-zinc-700 rounded mb-2"></div>
              <div className="w-full h-4 bg-zinc-700 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-zinc-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header - 10 thèmes fixes */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">{t('rooms.allRooms')}</h2>
          <p className="text-sm text-zinc-400">
            {rooms.length} {rooms.length > 1 ? t('rooms.roomsFound') : t('rooms.roomFound')}
          </p>
        </div>
      </div>

      {/* Grille des salles */}
      {rooms.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-zinc-500 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">
              {t('rooms.noRoomsFound')}
            </h3>
            <p className="text-zinc-500 mb-4">
              {t('rooms.firstToCreate')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms?.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${locale}/rooms/${room.id}`} className="block">
                <Card className="card-hover overflow-hidden h-full">
                  {/* Image avec texte superposé */}
                  <div className="relative bg-zinc-800 aspect-video">
                    {room.cover_image_url ? (
                      <>
                        <S3Image
                          cloudStoragePath={room.cover_image_url}
                          alt={getTranslatedTitle(room)}
                          fill
                          className="object-cover opacity-60"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-60">
                        <MessageSquare size={48} className="text-zinc-500" />
                      </div>
                    )}
                    
                    {/* Overlay gradient pour meilleure lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    
                    {/* Texte sur l'image */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{room.icon}</span>
                          <h3 className="text-2xl font-bold text-white">
                            {getTranslatedTitle(room)}
                          </h3>
                        </div>
                        <p className="text-zinc-200 text-sm line-clamp-2">
                          {getTranslatedDescription(room)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Badge de compteur - Messages totaux */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-white">
                        <MessageSquare size={14} />
                        <span className="font-semibold">{room._count.messages}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenu de la carte */}
                  <div className="flex-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-zinc-400">
                          <FileText size={14} />
                          <span>{room._count.talks} talks</span>
                        </div>
                        
                        <Button size="sm" onClick={(e) => e.stopPropagation()}>
                          <Eye size={14} className="mr-1" />
                          {t('rooms.view')}
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
