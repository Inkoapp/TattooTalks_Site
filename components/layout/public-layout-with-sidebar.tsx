'use client'

import { Header } from './header'

interface PublicLayoutWithSidebarProps {
  children: React.ReactNode
}

export function PublicLayoutWithSidebar({ children }: PublicLayoutWithSidebarProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
