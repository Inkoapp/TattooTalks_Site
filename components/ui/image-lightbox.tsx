
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import Image from 'next/image'

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  alt?: string
}

export function ImageLightbox({ isOpen, onClose, imageUrl, alt = 'Image' }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  
  // Reset zoom and rotation when opening
  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setRotation(0)
    }
  }, [isOpen])
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3))
  }
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5))
  }
  
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-zinc-800">
        <div className="relative w-full h-[95vh] flex flex-col">
          {/* Header with controls */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black via-black/90 to-transparent">
            <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-2 border border-zinc-700/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="text-white hover:bg-zinc-800 hover:text-yellow-400 transition-colors bg-zinc-800/50 border border-zinc-700 disabled:opacity-30"
              >
                <ZoomOut size={20} />
              </Button>
              <span className="text-white text-sm font-semibold min-w-[60px] text-center px-2 bg-zinc-800/80 rounded py-1 border border-zinc-700">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="text-white hover:bg-zinc-800 hover:text-yellow-400 transition-colors bg-zinc-800/50 border border-zinc-700 disabled:opacity-30"
              >
                <ZoomIn size={20} />
              </Button>
              <div className="w-px h-6 bg-zinc-700" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRotate}
                className="text-white hover:bg-zinc-800 hover:text-blue-400 transition-colors bg-zinc-800/50 border border-zinc-700"
              >
                <RotateCw size={20} />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-red-500/20 hover:text-red-400 transition-colors bg-zinc-900/90 backdrop-blur-sm border-2 border-zinc-700 hover:border-red-500/50 rounded-lg h-12 w-12"
            >
              <X size={28} className="stroke-[2.5]" />
            </Button>
          </div>
          
          {/* Image container */}
          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <div
              className="relative transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <Image
                src={imageUrl}
                alt={alt}
                width={1200}
                height={800}
                className="max-w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
