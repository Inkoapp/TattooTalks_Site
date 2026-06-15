
'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/i18n-context'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CompactImageUpload } from '@/components/ui/compact-image-upload'
import { X, Send, Image as ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CreateTalkModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { title: string; content: string; tags: string[]; image_url?: string }) => Promise<void>
  isSubmitting: boolean
}

export function CreateTalkModal({ open, onClose, onSubmit, isSubmitting }: CreateTalkModalProps) {
  const t = useTranslations()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return

    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      tags,
      image_url: imageUrl || undefined,
    })

    // Reset form
    setTitle('')
    setContent('')
    setTagsInput('')
    setImageUrl(null)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle('')
      setContent('')
      setTagsInput('')
      setImageUrl(null)
      onClose()
    }
  }

  const parsedTags = tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
            <Send className="w-6 h-6 text-yellow-500" />
            {t('room.createTalk')}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {t('room.createTalkDescription') || 'Share your thoughts, techniques, or questions with the community'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              {t('room.talkTitle')}
              <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('room.talkTitlePlaceholder')}
              className="bg-zinc-900/50 border-zinc-700 focus:border-yellow-500 text-zinc-100 placeholder:text-zinc-500"
              maxLength={100}
              disabled={isSubmitting}
            />
            <p className="text-xs text-zinc-500 text-right">{title.length}/100</p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              {t('room.talkContent')}
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('room.talkContentPlaceholder')}
              className="bg-zinc-900/50 border-zinc-700 focus:border-yellow-500 text-zinc-100 placeholder:text-zinc-500 min-h-[150px] resize-none"
              maxLength={2000}
              disabled={isSubmitting}
            />
            <p className="text-xs text-zinc-500 text-right">{content.length}/2000</p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-200">
              {t('room.talkTags')}
            </label>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder={t('room.talkTagsPlaceholder')}
              className="bg-zinc-900/50 border-zinc-700 focus:border-yellow-500 text-zinc-100 placeholder:text-zinc-500"
              disabled={isSubmitting}
            />
            {parsedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {parsedTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {t('room.talkPhoto')}
            </label>
            <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-700 rounded-lg p-4 hover:border-yellow-500/50 transition-colors">
              <CompactImageUpload
                onImageUploaded={setImageUrl}
                onImageRemoved={() => setImageUrl(null)}
                currentImageUrl={imageUrl}
                buttonText={imageUrl ? t('room.changePhoto') : t('room.addPhoto')}
                buttonVariant="ghost"
                aspectRatio={16 / 9}
                cropShape="rect"
                allowFreeAspect={true}
              />
              {!imageUrl && (
                <p className="text-sm text-zinc-500 text-center mt-2">
                  {t('room.addPhoto')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex-1 bg-transparent border-zinc-700 hover:bg-zinc-800 text-zinc-300"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 mr-2" />
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim() || isSubmitting}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? t('room.creating') : t('room.publish')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
