'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home,
  Mail,
  Shield,
  Scale,
  Menu, 
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/lib/i18n-context'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('nav')

  // Extract locale from pathname
  const locale = pathname?.split('/')[1] || 'en'
  const validLocales = ['en', 'fr', 'es', 'pt']
  const currentLocale = validLocales.includes(locale) ? locale : 'en'

  // Navigation with translations
  const navigation = [
    { name: t('home'), href: `/${currentLocale}`, icon: Home },
    { name: t('contact'), href: `/${currentLocale}/contact`, icon: Mail },
    { name: t('privacy'), href: `/${currentLocale}/privacy`, icon: Shield },
    { name: 'Terms & Conditions', href: `/${currentLocale}/terms`, icon: Scale },
  ]

  return (
    <>
      {/* Mobile menu button - Only shows hamburger icon when closed */}
      {!isOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      {/* Sidebar - Desktop version (always visible) */}
      <div className="hidden lg:block lg:w-64 lg:h-screen lg:sticky lg:top-0 bg-zinc-900 border-r border-zinc-800">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png?v=2"
                  alt="TattooTalks"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="gradient-text font-bold text-lg">TattooTalks</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Language Switcher */}
          <div className="p-4 border-t border-zinc-800">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Sidebar - Mobile version (animated) */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-800"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png?v=2"
                    alt="TattooTalks"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="gradient-text font-bold text-lg">TattooTalks</span>
              </Link>
              
              {/* Close button - Only visible on mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Language Switcher */}
          <div className="p-4 border-t border-zinc-800">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
