'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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

export function Header() {
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
      {/* Desktop Header - Premium Glassmorphism */}
      <header className="fixed top-0 z-40 w-full">
        {/* Ultra-subtle gradient border */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        
        {/* Main header content */}
        <div className="relative bg-zinc-950/40 backdrop-blur-xl border-b border-white/5">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              {/* Logo - Enhanced size and spacing */}
              <Link 
                href={`/${currentLocale}`} 
                className="flex items-center space-x-3 group"
              >
                <div className="relative w-11 h-11 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/logo.png?v=2"
                    alt="TattooTalks"
                    fill
                    className="object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                    priority
                  />
                </div>
                <span className="gradient-text font-bold text-xl tracking-tight hidden sm:block">
                  TattooTalks
                </span>
              </Link>

              {/* Desktop Navigation - Minimalist */}
              <nav className="hidden lg:flex items-center space-x-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative group px-5 py-2.5"
                    >
                      <div className={cn(
                        'flex items-center space-x-2 transition-all duration-300',
                        isActive
                          ? 'text-yellow-400'
                          : 'text-zinc-400 group-hover:text-white'
                      )}>
                        <item.icon 
                          size={16} 
                          className={cn(
                            'transition-all duration-300',
                            isActive 
                              ? 'opacity-100' 
                              : 'opacity-60 group-hover:opacity-100'
                          )} 
                        />
                        <span className="text-sm font-light tracking-wide">
                          {item.name}
                        </span>
                      </div>
                      
                      {/* Active indicator - Golden underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover effect - Subtle glow */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Right section - Language Switcher + Mobile Menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden lg:block">
                  <LanguageSwitcher />
                </div>
                
                {/* Mobile menu button - Premium styling */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="relative z-10">
                    {isOpen ? (
                      <X size={20} className="text-zinc-300 group-hover:text-yellow-400 transition-colors" />
                    ) : (
                      <Menu size={20} className="text-zinc-300 group-hover:text-yellow-400 transition-colors" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Premium */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 top-20"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile menu panel - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            >
              <div className="container mx-auto px-6 py-6">
                {/* Mobile Navigation */}
                <nav className="space-y-1 mb-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center space-x-3 px-5 py-3.5 rounded-xl text-sm font-light tracking-wide transition-all duration-300',
                          isActive
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon size={18} className={isActive ? 'opacity-100' : 'opacity-60'} />
                        <span>{item.name}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                        )}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile Language Switcher */}
                <div className="pt-5 border-t border-white/5">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
