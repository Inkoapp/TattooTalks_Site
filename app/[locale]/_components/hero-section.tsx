'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Apple } from 'lucide-react'
import { useTranslations } from '@/lib/i18n-context'

/* ========================================
   PREMIUM HERO SECTION - MOBILE OPTIMIZED
   Split-Screen with Molten Gold Atmosphere
   ======================================== */

export function HeroSection() {
  const t = useTranslations('landing')
  const pathname = usePathname()
  
  // Extract locale from pathname
  const locale = pathname?.split('/')[1] || 'en'
  const validLocales = ['en', 'fr', 'es', 'pt']
  const currentLocale = validLocales.includes(locale) ? locale : 'en'

  return (
    <section className="w-full min-h-screen bg-[#121212] relative overflow-hidden m-0 p-0 pt-16 md:pt-20">
      {/* ========================================
          CLEAN DARK BACKGROUND (No corner glows)
          ======================================== */}
      <div className="absolute inset-0 w-full h-full bg-[#121212]" />

      {/* ========================================
          TATTOO ARTIST IMAGE - DESKTOP ONLY (BOTTOM LEFT)
          ======================================== */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 z-20 hidden md:block"
      >
        <div className="relative w-[450px] lg:w-[550px] xl:w-[620px]">
          <Image
            src="/hero-tattoo-artist.png"
            alt="TattooTalks - Tattoo Artist"
            width={620}
            height={620}
            priority
            className="w-full h-auto relative z-10"
          />
          
          {/* Glow behind image */}
          <div 
            className="absolute inset-0 -z-10 blur-[120px] opacity-70 scale-125"
            style={{ background: 'radial-gradient(circle at center bottom, #FF7A00 0%, #FF5500 30%, #CC4400 50%, transparent 75%)' }}
          />
        </div>
      </motion.div>

      {/* ========================================
          MOBILE LAYOUT - Vertical stack
          ======================================== */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-start h-full px-4 pt-12 pb-8">
        {/* MOBILE: Title & Subtitle at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center space-y-3 mb-4"
        >
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
            {t('hero.title')}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-white max-w-md mx-auto leading-relaxed">
            {t('hero.subtitle1')} <span className="text-[#FF7A00] font-bold">{t('hero.subtitleHighlight')}</span>{t('hero.subtitle2') && !t('hero.subtitle2').includes('hero.') ? ` ${t('hero.subtitle2')}` : ''}
          </p>
          <p className="font-sans text-sm sm:text-base text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
            <span className="text-[#FF7A00] font-semibold">{t('hero.cta1')}</span> {t('hero.cta2')}
          </p>
        </motion.div>

        {/* MOBILE: Image centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex-1 flex items-center justify-center w-full"
        >
          <div className="relative w-[280px] sm:w-[320px]">
            <Image
              src="/hero-tattoo-artist.png"
              alt="TattooTalks - Tattoo Artist"
              width={320}
              height={320}
              priority
              className="w-full h-auto relative z-10"
            />
            
            {/* Glow behind image - mobile */}
            <div 
              className="absolute inset-0 -z-10 blur-[60px] opacity-50 scale-110"
              style={{ background: 'radial-gradient(circle at center, #FF7A00 0%, #FF5500 40%, transparent 70%)' }}
            />
          </div>
        </motion.div>

        {/* MOBILE: Buttons at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-4"
        >
          {/* Apple App Store Button - Mobile */}
          <Link 
            href="https://apps.apple.com/fr/app/tattootalks/id6756529301"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Apple className="w-6 h-6 text-white" />
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-zinc-400 leading-none">{t('cta.appStore.subtitle')}</span>
                <span className="text-sm font-semibold text-white leading-tight">{t('cta.appStore.title')}</span>
              </div>
            </div>
          </Link>

          {/* Google Play Button - Mobile */}
          <Link 
            href="https://play.google.com/store/apps/details?id=com.tattoo.talks&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" fill="#fff"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-zinc-400 leading-none">{t('cta.playStore.subtitle')}</span>
                <span className="text-sm font-semibold text-white leading-tight">{t('cta.playStore.title')}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ========================================
          DESKTOP LAYOUT - Grid (vertically centered)
          ======================================== */}
      <div className="hidden md:flex relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full h-screen items-center py-0">
        <div className="grid grid-cols-12 gap-12 items-center w-full">
          
          {/* Desktop spacer for image area */}
          <div className="col-span-5" />

          {/* ========================================
              RIGHT COLUMN: TYPOGRAPHY & CTA (DESKTOP)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="col-span-7 flex flex-col justify-center text-left space-y-6"
          >
            {/* HEADLINE (H1) - Desktop */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
              {t('hero.title')}
            </h1>

            {/* SUB-HEADLINE - Desktop */}
            <p className="font-sans text-2xl lg:text-3xl text-white max-w-2xl leading-relaxed">
              {t('hero.subtitle1')} <span className="text-[#FF7A00] font-bold">{t('hero.subtitleHighlight')}</span>{t('hero.subtitle2') && !t('hero.subtitle2').includes('hero.') ? ` ${t('hero.subtitle2')}` : ''}
            </p>

            {/* CTA TEXT - Desktop */}
            <p className="font-sans text-lg text-[#A3A3A3] max-w-2xl leading-relaxed">
              <span className="text-[#FF7A00] font-semibold">{t('hero.cta1')}</span> {t('hero.cta2')}
            </p>

            {/* APP STORE BUTTONS - Desktop */}
            <div className="flex items-center gap-4 mt-6">
              {/* Apple App Store Button */}
              <Link 
                href="https://apps.apple.com/fr/app/tattootalks/id6756529301" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A059]/50 rounded-2xl transition-all duration-300 backdrop-blur-sm"
              >
                <Apple className="w-6 h-6 text-white" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-zinc-400 font-light">{t('cta.appStore.subtitle')}</span>
                  <span className="text-sm font-semibold text-white">{t('cta.appStore.title')}</span>
                </div>
              </Link>
              
              {/* Google Play Store Button */}
              <Link 
                href="https://play.google.com/store/apps/details?id=com.tattoo.talks&pcampaignid=web_share" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A059]/50 rounded-2xl transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="url(#paint0_linear_desktop)" />
                  <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="url(#paint1_linear_desktop)" />
                  <path d="M20.16 10.5C20.72 10.81 21 11.27 21 12C21 12.73 20.72 13.19 20.16 13.5L17.89 14.95L15.39 12.45L17.89 9.95L20.16 10.5Z" fill="url(#paint2_linear_desktop)" />
                  <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="url(#paint3_linear_desktop)" />
                  <defs>
                    <linearGradient id="paint0_linear_desktop" x1="8.18" y1="4.38" x2="1.67" y2="-2.13" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00D7FE" />
                      <stop offset="1" stopColor="#0095FF" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_desktop" x1="14.64" y1="13.81" x2="3.05" y2="25.4" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFDA1C" />
                      <stop offset="1" stopColor="#FEB800" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_desktop" x1="22.09" y1="12" x2="2.54" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3A44" />
                      <stop offset="1" stopColor="#C31162" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_desktop" x1="1.96" y1="-1.01" x2="9.54" y2="6.57" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#33C481" />
                      <stop offset="1" stopColor="#01A870" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-zinc-400 font-light">{t('cta.playStore.subtitle')}</span>
                  <span className="text-sm font-semibold text-white">{t('cta.playStore.title')}</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom transition line - subtle orange gradient fade */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 140, 0, 0.4) 30%, rgba(255, 165, 0, 0.5) 50%, rgba(255, 140, 0, 0.4) 70%, transparent 100%)',
        }}
      />
    </section>
  )
}
