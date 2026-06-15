
"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./dialog"
import { Button } from "./button"
import { Slider } from "./slider"

interface AvatarCropModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  onCropComplete: (croppedImageBlob: Blob) => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function AvatarCropModal({ isOpen, onClose, imageSrc, onCropComplete }: AvatarCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropChange = (location: { x: number; y: number }) => {
    setCrop(location)
  }

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  }

  const onCropCompleteHandler = useCallback(
    (croppedArea: CropArea, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const createCroppedImage = async (
    imageSrc: string,
    pixelCrop: CropArea
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = imageSrc
      image.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Canvas context not available"))
          return
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

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Canvas to Blob conversion failed"))
          }
        }, "image/jpeg", 0.9)
      }
      image.onerror = () => {
        reject(new Error("Failed to load image"))
      }
    })
  }

  const handleSave = async () => {
    if (!croppedAreaPixels) return

    setIsProcessing(true)
    try {
      const croppedBlob = await createCroppedImage(imageSrc, croppedAreaPixels)
      onCropComplete(croppedBlob)
      onClose()
    } catch (error) {
      console.error("Error cropping image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-zinc-900 border-amber-500/20">
        <DialogHeader>
          <DialogTitle className="text-amber-500">Ajuster votre avatar</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        <div className="space-y-2 px-4">
          <label className="text-sm text-zinc-400">Zoom</label>
          <Slider
            value={[zoom]}
            onValueChange={(values) => setZoom(values[0] || 1)}
            min={1}
            max={3}
            step={0.1}
            className="w-full"
          />
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
            className="bg-gradient-to-r from-amber-500 to-orange-600"
          >
            {isProcessing ? "Traitement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
