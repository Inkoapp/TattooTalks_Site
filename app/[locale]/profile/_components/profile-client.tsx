
'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { S3Avatar } from '@/components/ui/s3-avatar'
import { AvatarCropModal } from '@/components/ui/avatar-crop-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, MapPin, Globe, Edit, Save, X, Camera, MessageSquare, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import { NotificationPreferences } from './notification-preferences'
import { useTranslations } from '@/lib/i18n-context'

interface UserProfile {
  id: string
  email: string
  pseudo: string
  avatar_url?: string
  country?: string
  city?: string
  created_at: string
  _count: {
    talks: number
    messages: number
  }
}

export function ProfileClient() {
  const t = useTranslations()
  const { data: session, update } = useSession() || {}
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [showCropModal, setShowCropModal] = useState(false)
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('')
  const avatarInputRef = React.useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    pseudo: '',
    avatar_url: '',
    country: '',
    city: ''
  })

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    if (!session?.user?.id) return

    try {
      const response = await fetch(`/api/users/${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          pseudo: data.pseudo || '',
          avatar_url: data.avatar_url || '',
          country: data.country || '',
          city: data.city || ''
        })
      }
    } catch (error) {
      console.error(t('profile.fetchError'), error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!session?.user?.id) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(t('profile.updateSuccess'))
        setIsEditing(false)
        await fetchProfile()
        
        // Rafraîchir la session pour mettre à jour l'avatar dans toute l'application
        if (update) {
          await update()
        }
      } else {
        toast.error(t('profile.updateError'))
      }
    } catch (error) {
      toast.error(t('profile.updateError'))
      console.error('Profile update error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      pseudo: profile?.pseudo || '',
      avatar_url: profile?.avatar_url || '',
      country: profile?.country || '',
      city: profile?.city || ''
    })
    setIsEditing(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      toast.error(t('profile.imageTypeError'))
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('profile.imageSizeError'))
      return
    }

    // Charger l'image pour le recadrage
    const reader = new FileReader()
    reader.onload = () => {
      setSelectedImageSrc(reader.result as string)
      setShowCropModal(true)
    }
    reader.readAsDataURL(file)

    // Réinitialiser l'input pour permettre la sélection du même fichier
    if (avatarInputRef.current) {
      avatarInputRef.current.value = ''
    }
  }

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    setIsUploadingAvatar(true)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', croppedImageBlob, 'avatar.jpg')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || t('profile.uploadError'))
      }

      const data = await response.json()
      setFormData({ ...formData, avatar_url: data.cloudStoragePath })
      toast.success(t('profile.avatarUpdated'))
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('profile.uploadError'))
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="w-20 h-20 bg-zinc-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-zinc-700 rounded"></div>
              <div className="w-48 h-4 bg-zinc-700 rounded"></div>
            </div>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          {t('profile.myProfile')}
        </h1>
        <p className="text-zinc-400 text-lg">
          {t('profile.managePersonalInfo')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader className="text-center">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <S3Avatar 
                  cloudStoragePath={formData.avatar_url || profile?.avatar_url}
                  fallback={<span className="text-2xl">{profile?.pseudo?.charAt(0).toUpperCase()}</span>}
                  className="w-24 h-24"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {isUploadingAvatar ? (
                      <div className="spinner w-6 h-6" />
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                  </button>
                )}
              </div>
              <CardTitle className="text-2xl">{profile?.pseudo}</CardTitle>
              <p className="text-zinc-400">{profile?.email}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <div className="flex items-center space-x-2">
                  <FileText size={18} className="text-yellow-400" />
                  <span className="text-zinc-300">{t('profile.talksCreated')}</span>
                </div>
                <span className="font-semibold text-lg text-yellow-400">{profile?._count.talks}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={18} className="text-blue-400" />
                  <span className="text-zinc-300">{t('profile.commentsCreated')}</span>
                </div>
                <span className="font-semibold text-lg text-blue-400">{profile?._count.messages}</span>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full"
                  variant={isEditing ? "outline" : "default"}
                >
                  {isEditing ? (
                    <>
                      <X size={16} className="mr-2" />
                      {t('common.cancel')}
                    </>
                  ) : (
                    <>
                      <Edit size={16} className="mr-2" />
                      {t('profile.editProfile')}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.personalInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User size={18} className="text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-400">{t('profile.pseudo')}</p>
                      <p className="text-white">{profile?.pseudo}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Globe size={18} className="text-zinc-400" />
                      <div>
                        <p className="text-sm text-zinc-400">{t('profile.country')}</p>
                        <p className="text-white">
                          {profile?.country || t('profile.notSpecified')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin size={18} className="text-zinc-400" />
                      <div>
                        <p className="text-sm text-zinc-400">{t('profile.city')}</p>
                        <p className="text-white">
                          {profile?.city || t('profile.notSpecified')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      {t('profile.pseudo')}
                    </label>
                    <Input
                      value={formData.pseudo}
                      onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                      placeholder={t('profile.yourPseudo')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        {t('profile.country')}
                      </label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder={t('profile.yourCountry')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        {t('profile.city')}
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder={t('profile.yourCity')}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1"
                    >
                      {isSaving ? (
                        <div className="flex items-center space-x-2">
                          <div className="spinner"></div>
                          <span>{t('profile.saving')}</span>
                        </div>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          {t('common.save')}
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                    >
                      <X size={16} className="mr-2" />
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Préférences de notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NotificationPreferences />
        </motion.div>
      </div>

      {/* Modal de recadrage d'avatar */}
      <AvatarCropModal
        isOpen={showCropModal}
        onClose={() => setShowCropModal(false)}
        imageSrc={selectedImageSrc}
        onCropComplete={handleCropComplete}
      />
    </div>
  )
}
