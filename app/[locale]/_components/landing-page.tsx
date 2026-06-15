'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Apple } from 'lucide-react'
import { useTranslations } from '@/lib/i18n-context'
import { HeroSection } from './hero-section'
import WhyJoinSection from './why-join-section'
import PhoneMockupMarquee from './phone-mockup-marquee'

export function LandingPage() {
  const t = useTranslations('landing')

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Premium Hero Section with Molten Gold - Full Screen */}
      <HeroSection />

      {/* Why Join Section - Seamless transition */}
      <WhyJoinSection />

      {/* Phone Mockup Marquee - Seamless transition */}
      <PhoneMockupMarquee />

      {/* CTA Section - Seamless with subtle glow */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        {/* Top transition line - subtle orange gradient fade */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 140, 0, 0.4) 30%, rgba(255, 165, 0, 0.5) 50%, rgba(255, 140, 0, 0.4) 70%, transparent 100%)',
          }}
        />
        
        {/* Subtle ambient glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at center, rgba(255, 140, 0, 0.06) 0%, transparent 70%)',
          }}
        />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-zinc-400">
              {t('cta.description')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
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
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="url(#paint0_linear_cta)" />
                <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="url(#paint1_linear_cta)" />
                <path d="M20.16 10.5C20.72 10.81 21 11.27 21 12C21 12.73 20.72 13.19 20.16 13.5L17.89 14.95L15.39 12.45L17.89 9.95L20.16 10.5Z" fill="url(#paint2_linear_cta)" />
                <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="url(#paint3_linear_cta)" />
                <defs>
                  <linearGradient id="paint0_linear_cta" x1="8.18" y1="4.38" x2="1.67" y2="-2.13" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00D7FE" />
                    <stop offset="1" stopColor="#0095FF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_cta" x1="14.64" y1="13.81" x2="3.05" y2="25.4" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFDA1C" />
                    <stop offset="1" stopColor="#FEB800" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_cta" x1="22.09" y1="12" x2="2.54" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3A44" />
                    <stop offset="1" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_cta" x1="1.96" y1="-1.01" x2="9.54" y2="6.57" gradientUnits="userSpaceOnUse">
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
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal, seamless */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle top fade line */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 165, 0, 0.2) 50%, transparent 100%)',
          }}
        />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="TattooTalks"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  TattooTalks
                </span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t('description')}
              </p>
            </div>
            <div>
              <h4 className="text-zinc-300 font-medium mb-4">{t('cta.button')}</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block text-zinc-500 hover:text-orange-400 transition-colors text-sm">
                  {t('getStarted')}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-zinc-300 font-medium mb-4">{t('title')} {t('titleHighlight')}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
          </div>
          
          {/* Bottom copyright - very subtle */}
          <div className="mt-12 pt-8 text-center">
            <p className="text-zinc-600 text-xs">
              &copy; {new Date().getFullYear()} TattooTalks. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}