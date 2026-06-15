
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface TalkRedirectProps {
  targetUrl: string
  title: string
  author: string
}

export function TalkRedirect({ targetUrl, title, author }: TalkRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // Rediriger après un court délai pour permettre aux scrapers de lire les métadonnées
    const timer = setTimeout(() => {
      router.push(targetUrl)
    }, 100)

    return () => clearTimeout(timer)
  }, [targetUrl, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold text-zinc-100">
          {title || 'Discussion'}
        </h1>
        <p className="text-zinc-400">
          par {author}
        </p>
        <p className="text-sm text-zinc-500">
          Redirection en cours...
        </p>
      </div>
    </div>
  )
}
