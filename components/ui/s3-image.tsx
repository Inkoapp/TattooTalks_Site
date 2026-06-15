

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, Maximize2, AlertCircle } from 'lucide-react'
import { ImageLightbox } from './image-lightbox'

interface S3ImageProps {
  cloudStoragePath?: string | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  clickable?: boolean
}

export function S3Image({ 
  cloudStoragePath, 
  alt, 
  fill,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  clickable = true
}: S3ImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!cloudStoragePath) {
      setIsLoading(false)
      return
    }

    // Réinitialiser l'état d'erreur quand le cloudStoragePath change
    setError(false)
    setIsLoading(true)

    // Si c'est déjà une URL complète, l'utiliser directement
    if (cloudStoragePath.startsWith('http://') || cloudStoragePath.startsWith('https://')) {
      setImageUrl(cloudStoragePath)
      setIsLoading(false)
      return
    }

    // Sinon, utiliser l'API qui redirige vers l'image S3
    // L'API /api/images/[key] fait maintenant une redirection directe vers l'image
    const encodedKey = encodeURIComponent(cloudStoragePath)
    setImageUrl(`/api/images/${encodedKey}`)
    setIsLoading(false)
  }, [cloudStoragePath, retryCount])

  if (!cloudStoragePath) {
    return null
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`} style={{ backgroundColor: '#18181b' }}>
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
      </div>
    )
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 bg-zinc-900 ${className}`} style={{ backgroundColor: '#18181b' }}>
        <AlertCircle className="w-10 h-10 text-zinc-500" />
        <span className="text-zinc-400 text-sm font-medium">Image non disponible</span>
        {retryCount < 3 && (
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="px-4 py-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>
    )
  }

  const handleImageError = () => {
    console.error('Erreur de chargement de l\'image:', cloudStoragePath)
    setError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    setError(false)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    if (clickable) {
      e.preventDefault()
      e.stopPropagation()
      setLightboxOpen(true)
    }
  }

  if (fill) {
    return (
      <>
        <div className="relative group w-full h-full">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className={`${className} ${clickable ? 'cursor-pointer transition-opacity hover:opacity-90' : ''}`}
            sizes={sizes}
            priority={priority}
            onClick={handleImageClick}
            onError={handleImageError}
            onLoad={handleImageLoad}
            unoptimized={imageUrl.startsWith('/api/images/')}
          />
          {clickable && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
              <div className="bg-white/90 rounded-full p-3">
                <Maximize2 className="text-black" size={24} />
              </div>
            </div>
          )}
        </div>
        {clickable && imageUrl && (
          <ImageLightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            imageUrl={imageUrl}
            alt={alt}
          />
        )}
      </>
    )
  }

  return (
    <>
      <div className="relative group inline-block">
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${clickable ? 'cursor-pointer transition-opacity hover:opacity-90' : ''}`}
          sizes={sizes}
          priority={priority}
          onClick={handleImageClick}
          onError={handleImageError}
          onLoad={handleImageLoad}
          unoptimized={imageUrl.startsWith('/api/images/')}
        />
        {clickable && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
            <div className="bg-white/90 rounded-full p-3">
              <Maximize2 className="text-black" size={24} />
            </div>
          </div>
        )}
      </div>
      {clickable && imageUrl && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageUrl={imageUrl}
          alt={alt}
        />
      )}
    </>
  )
}
