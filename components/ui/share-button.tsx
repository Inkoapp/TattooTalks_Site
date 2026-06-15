
'use client'

import { useState } from 'react'
import { Button } from './button'
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Link as LinkIcon, Check, Instagram } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover'
import { useTranslations } from '@/lib/i18n-context'
import toast from 'react-hot-toast'

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  size?: 'sm' | 'default' | 'lg'
}

export function ShareButton({ url, title, description, size = 'default' }: ShareButtonProps) {
  const t = useTranslations()
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success(t('share.linkCopied'))
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error(t('share.copyError'))
    }
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success(t('share.instagramCopied'), {
        duration: 4000,
      })
    } catch (err) {
      toast.error(t('share.copyError'))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={size}
          className="gap-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 transition-all duration-200"
        >
          <Share2 size={16} />
          <span className="hidden sm:inline">{t('share.share')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-zinc-900 border-zinc-800" align="end">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <h4 className="font-semibold text-zinc-100 flex items-center gap-2">
              <Share2 size={18} className="text-amber-500" />
              {t('share.shareThis')}
            </h4>
            {description && (
              <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
            )}
          </div>

          {/* Social Media Buttons */}
          <div className="flex items-center justify-center gap-3 px-2">
            {/* Facebook */}
            <button
              onClick={() => handleShare('facebook')}
              className="group relative w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#1565D8] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
              title="Facebook"
            >
              <Facebook size={20} className="drop-shadow-md" />
            </button>
            
            {/* Twitter/X */}
            <button
              onClick={() => handleShare('twitter')}
              className="group relative w-12 h-12 rounded-full bg-black hover:bg-zinc-800 text-white shadow-lg shadow-zinc-800/50 hover:shadow-zinc-700/70 hover:scale-110 transition-all duration-300 flex items-center justify-center border border-zinc-700/50"
              title="Twitter / X"
            >
              <Twitter size={20} className="drop-shadow-md" />
            </button>
            
            {/* LinkedIn */}
            <button
              onClick={() => handleShare('linkedin')}
              className="group relative w-12 h-12 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
              title="LinkedIn"
            >
              <Linkedin size={20} className="drop-shadow-md" />
            </button>
            
            {/* WhatsApp */}
            <button
              onClick={() => handleShare('whatsapp')}
              className="group relative w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center"
              title="WhatsApp"
            >
              <MessageCircle size={20} className="drop-shadow-md" />
            </button>
            
            {/* Instagram */}
            <button
              onClick={handleInstagramShare}
              className="group relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white shadow-xl shadow-pink-500/30 hover:shadow-pink-500/60 hover:scale-110 transition-all duration-300 flex items-center justify-center"
              title="Instagram"
            >
              <Instagram size={20} className="drop-shadow-md" />
            </button>
          </div>

          {/* Copy Link Button */}
          <div className="pt-3 border-t border-zinc-800">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className={`w-full gap-2 transition-all duration-300 font-medium ${
                copied 
                  ? 'border-green-500 bg-green-500/10 text-green-400 shadow-lg shadow-green-500/20' 
                  : 'border-zinc-700 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]'
              }`}
              size="sm"
            >
              {copied ? (
                <>
                  <Check size={18} className="drop-shadow-md" />
                  <span>{t('share.copied')}</span>
                </>
              ) : (
                <>
                  <LinkIcon size={18} className="drop-shadow-md" />
                  {t('share.copyLink')}
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
