

'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { Button } from './button'
import Image from 'next/image'
import { S3Image } from './s3-image'
import { ImageCropModal } from './image-crop-modal'

interface CompactImageUploadProps {
  onImageUploaded: (cloudStoragePath: string) => void
  onImageRemoved?: () => void
  currentImageUrl?: string | null
  buttonText?: string
  buttonVariant?: 'default' | 'outline' | 'ghost'
  buttonSize?: 'default' | 'sm' | 'lg'
  aspectRatio?: number
  cropShape?: 'rect' | 'round'
  allowFreeAspect?: boolean
}

export function CompactImageUpload({ 
  onImageUploaded, 
  onImageRemoved,
  currentImageUrl,
  buttonText = "Ajouter une image",
  buttonVariant = "outline",
  buttonSize = "sm",
  aspectRatio = 16 / 9,
  cropShape = 'rect',
  allowFreeAspect = false
}: CompactImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Synchroniser previewUrl avec currentImageUrl
  useEffect(() => {
    setPreviewUrl(currentImageUrl || null)
  }, [currentImageUrl])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image')
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB')
      return
    }

    // Ouvrir le modal de recadrage
    const reader = new FileReader()
    reader.onload = () => {
      setSelectedImageSrc(reader.result as string)
      setShowCropModal(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = (croppedImagePath: string) => {
    setPreviewUrl(croppedImagePath)
    onImageUploaded(croppedImagePath)
    setShowCropModal(false)
    setSelectedImageSrc(null)
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onImageRemoved?.()
  }

  return (
    <>
      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="compact-image-upload"
        />

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={buttonVariant}
            size={buttonSize}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Upload...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                {buttonText}
              </>
            )}
          </Button>

          {previewUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4 mr-1" />
              Supprimer
            </Button>
          )}
        </div>

        {previewUrl && (
          <div 
            className={`relative w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700 ${allowFreeAspect ? 'h-[300px]' : 'aspect-video'}`}
          >
            <S3Image
              cloudStoragePath={previewUrl}
              alt="Preview"
              fill
              className={allowFreeAspect ? "object-contain" : "object-cover"}
              clickable={false}
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>

      {selectedImageSrc && (
        <ImageCropModal
          isOpen={showCropModal}
          onClose={() => {
            setShowCropModal(false)
            setSelectedImageSrc(null)
            if (fileInputRef.current) {
              fileInputRef.current.value = ''
            }
          }}
          imageSrc={selectedImageSrc}
          onCropComplete={handleCropComplete}
          aspectRatio={aspectRatio}
          cropShape={cropShape}
          title="Recadrer l'image"
          allowFreeAspect={allowFreeAspect}
        />
      )}
    </>
  )
}
