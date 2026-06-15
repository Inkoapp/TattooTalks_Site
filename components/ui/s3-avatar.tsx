'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

interface S3AvatarProps {
  cloudStoragePath?: string | null
  fallback: React.ReactNode
  className?: string
}

export function S3Avatar({ cloudStoragePath, fallback, className }: S3AvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!cloudStoragePath) {
      setImageUrl(undefined)
      return
    }

    // Si c'est deja une URL complete, l'utiliser directement
    if (cloudStoragePath.startsWith('http://') || cloudStoragePath.startsWith('https://')) {
      setImageUrl(cloudStoragePath)
      return
    }

    // Utiliser directement l'URL de l'API qui redirige vers la signed URL
    const encodedKey = encodeURIComponent(cloudStoragePath)
    setImageUrl(`/api/images/${encodedKey}`)
  }, [cloudStoragePath])

  return (
    <Avatar className={className}>
      {imageUrl && <AvatarImage src={imageUrl} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
