

'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PublicLayoutProps {
  children: React.ReactNode
  showBackButton?: boolean
  backHref?: string
  backText?: string
}

export function PublicLayout({ children, showBackButton = true, backHref = '/auth/signup', backText = 'Retour à l\'inscription' }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      {/* Header with back button */}
      {showBackButton && (
        <header className="border-b border-zinc-800 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <Link href={backHref}>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-amber-500">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backText}
              </Button>
            </Link>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black/20 backdrop-blur-sm mt-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-zinc-400 text-sm">
              © {new Date().getFullYear()} TattooTalks. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy" 
                className="text-zinc-400 hover:text-amber-500 transition-colors text-sm"
              >
                Politique de Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
