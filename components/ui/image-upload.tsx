

'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from './button'
import { downloadFile } from '@/lib/s3'
import Image from 'next/image'
import { ImageCropModal } from './image-crop-modal'

interface ImageUploadProps {
  onImageUploaded: (cloudStoragePath: string) => void
  currentImageUrl?: string | null
  onImageRemoved?: () => void
  label?: string
  className?: string
  aspectRatio?: number
  cropShape?: 'rect' | 'round'
}

export function ImageUpload({ 
  onImageUploaded, 
  currentImageUrl, 
  onImageRemoved,
  label = "Ajouter une image",
  className = "",
  aspectRatio = 16 / 9,
  cropShape = 'rect'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />

        {!previewUrl ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors bg-zinc-900/50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <>
                  <Loader2 className="w-10 h-10 mb-3 text-amber-500 animate-spin" />
                  <p className="text-sm text-zinc-400">Upload en cours...</p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 mb-3 text-zinc-400" />
                  <p className="mb-2 text-sm text-zinc-400">
                    <span className="font-semibold">{label}</span>
                  </p>
                  <p className="text-xs text-zinc-500">PNG, JPG, GIF jusqu'à 5MB</p>
                </>
              )}
            </div>
          </label>
        ) : (
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700">
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
              disabled={uploading}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
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
        />
      )}
    </>
  )
}
