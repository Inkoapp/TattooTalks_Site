
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTranslations } from '@/lib/i18n-context'

interface CreateRoomModalProps {
  onRoomCreated: () => void
}

export function CreateRoomModal({ onRoomCreated }: CreateRoomModalProps) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    cover_image_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags
        })
      })

      if (response.ok) {
        toast.success(t('rooms.roomCreated'))
        setFormData({ title: '', description: '', tags: '', cover_image_url: '' })
        setOpen(false)
        onRoomCreated()
      } else {
        const data = await response.json()
        toast.error(data.error || t('rooms.creationError'))
      }
    } catch (error) {
      toast.error(t('rooms.creationError'))
      console.error('Room creation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} className="mr-2" />
          {t('rooms.createRoom')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('rooms.createNewRoom')}</DialogTitle>
          <DialogDescription>
            {t('rooms.createRoomDescription')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-zinc-300">
                {t('rooms.titleLabel')}
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={t('rooms.titlePlaceholder')}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-zinc-300">
                {t('rooms.descriptionLabel')}
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('rooms.descriptionPlaceholder')}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium text-zinc-300">
                {t('rooms.tagsLabel')}
              </label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder={t('rooms.tagsPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                {t('rooms.coverImageLabel')}
              </label>
              <ImageUpload
                onImageUploaded={(path) => setFormData({ ...formData, cover_image_url: path })}
                currentImageUrl={formData.cover_image_url}
                onImageRemoved={() => setFormData({ ...formData, cover_image_url: '' })}
                label={t('rooms.addCoverImage')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="spinner"></div>
                  <span>{t('rooms.creating')}</span>
                </div>
              ) : (
                t('rooms.createRoom')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
