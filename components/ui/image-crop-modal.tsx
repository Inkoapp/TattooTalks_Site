
'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ZoomIn, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ImageCropModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  onCropComplete: (croppedImageUrl: string) => void
  aspectRatio?: number
  cropShape?: 'rect' | 'round'
  title?: string
  allowFreeAspect?: boolean
}

interface CroppedArea {
  x: number
  y: number
  width: number
  height: number
}

export function ImageCropModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  onCropComplete,
  aspectRatio = 16 / 9,
  cropShape = 'rect',
  title = 'Recadrer l\'image',
  allowFreeAspect = false
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number | undefined>(aspectRatio)

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop)
  }, [])

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const onCropCompleteHandler = useCallback(
    (croppedArea: any, croppedAreaPixels: CroppedArea) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.src = url
    })

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CroppedArea
  ): Promise<Blob> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        resolve(blob)
      }, 'image/jpeg', 0.95)
    })
  }

  const handleSave = async () => {
    if (!croppedAreaPixels) return

    setIsProcessing(true)
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      
      // Upload to S3
      const formData = new FormData()
      formData.append('file', croppedBlob, 'cropped-image.jpg')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onCropComplete(data.cloudStoragePath)
      toast.success('Image recadrée avec succès')
      onClose()
    } catch (error) {
      console.error('Error cropping image:', error)
      toast.error('Erreur lors du recadrage de l\'image')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Ajustez le cadrage et le zoom de votre image
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {allowFreeAspect && (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={selectedAspectRatio === undefined ? "default" : "outline"}
                onClick={() => setSelectedAspectRatio(undefined)}
                className="text-xs"
              >
                Libre
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedAspectRatio === 1 ? "default" : "outline"}
                onClick={() => setSelectedAspectRatio(1)}
                className="text-xs"
              >
                Carré (1:1)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedAspectRatio === 4/3 ? "default" : "outline"}
                onClick={() => setSelectedAspectRatio(4/3)}
                className="text-xs"
              >
                4:3
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedAspectRatio === 16/9 ? "default" : "outline"}
                onClick={() => setSelectedAspectRatio(16/9)}
                className="text-xs"
              >
                16:9
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedAspectRatio === 3/4 ? "default" : "outline"}
                onClick={() => setSelectedAspectRatio(3/4)}
                className="text-xs"
              >
                Portrait (3:4)
              </Button>
            </div>
          )}
          
          <div className="relative h-[400px] bg-zinc-900 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={selectedAspectRatio}
              cropShape={cropShape}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropCompleteHandler}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300 flex items-center">
                <ZoomIn size={16} className="mr-2" />
                Zoom
              </label>
              <span className="text-sm text-zinc-400">{Math.round(zoom * 100)}%</span>
            </div>
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={1}
              max={3}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            disabled={isProcessing || !croppedAreaPixels}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
