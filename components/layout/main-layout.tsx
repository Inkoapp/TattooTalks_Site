
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Sidebar } from './sidebar'
import { NotificationBell } from '@/components/notifications/notification-bell'
import Link from 'next/link'
import { Shield } from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession() || {}
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-zinc-400">Chargement...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:pl-0 flex flex-col">
          {/* Header avec notifications */}
          <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-end">
              <NotificationBell />
            </div>
          </header>
          
          <div className="flex-1 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>
          
          {/* Footer */}
          <footer className="border-t border-zinc-800 bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-zinc-400 text-sm">
                  © {new Date().getFullYear()} TattooTalks. Tous droits réservés.
                </div>
                <div className="flex items-center space-x-6">
                  <Link 
                    href="/privacy" 
                    className="flex items-center space-x-2 text-zinc-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    <Shield size={16} />
                    <span>Politique de Confidentialité</span>
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-zinc-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
