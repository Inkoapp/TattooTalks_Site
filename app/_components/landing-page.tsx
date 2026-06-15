'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MessageSquare, 
  Users, 
  Globe, 
  Sparkles,
  ArrowRight,
  Heart,
  Palette,
  Shield,
  Wrench,
  GraduationCap,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

export function LandingPage() {
  const t = useTranslations('landing')

  const features = [
    {
      icon: MessageSquare,
      title: t('features.discussions.title'),
      description: t('features.discussions.description')
    },
    {
      icon: Palette,
      title: t('features.inspiration.title'),
      description: t('features.inspiration.description')
    },
    {
      icon: Users,
      title: t('features.community.title'),
      description: t('features.community.description')
    },
    {
      icon: Globe,
      title: t('features.global.title'),
      description: t('features.global.description')
    }
  ]

  const rooms = [
    {
      icon: Palette,
      title: t('rooms.inspirations'),
      description: t('rooms.inspirationsDesc'),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Wrench,
      title: t('rooms.equipment'),
      description: t('rooms.equipmentDesc'),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: t('rooms.hygiene'),
      description: t('rooms.hygieneDesc'),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: GraduationCap,
      title: t('rooms.apprentices'),
      description: t('rooms.apprenticesDesc'),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Briefcase,
      title: t('rooms.business'),
      description: t('rooms.businessDesc'),
      gradient: 'from-red-500 to-rose-600'
    },
    {
      icon: Heart,
      title: t('rooms.cafe'),
      description: t('rooms.cafeDesc'),
      gradient: 'from-amber-500 to-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {t('title')}
              <span className="block bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                {t('titleHighlight')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {t('getStarted')}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { label: t('stats.artists'), value: '1000+' },
              { label: t('stats.discussions'), value: '5000+' },
              { label: t('stats.members'), value: '10K+' },
              { label: t('stats.countries'), value: '50+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-zinc-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-zinc-400">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-zinc-800/50 border-zinc-700 hover:border-yellow-500/50 transition-all h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rooms Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('rooms.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => {
              const Icon = room.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all h-full overflow-hidden group">
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${room.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">
                        {room.title}
                      </h3>
                      <p className="text-zinc-400">
                        {room.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold text-lg px-8 py-6"
              >
                {t('getStarted')}
                <Sparkles className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500/10 to-orange-600/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-zinc-300">
              {t('cta.description')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold text-lg px-12 py-6 shadow-2xl hover:shadow-yellow-500/20 transition-all"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2" size={24} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="TattooTalks"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  TattooTalks
                </span>
              </div>
              <p className="text-zinc-400">
                {t('description')}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t('cta.button')}</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block text-zinc-400 hover:text-white transition-colors">
                  {t('getStarted')}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t('title')} {t('titleHighlight')}</h4>
              <p className="text-zinc-400">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500">
            <p>&copy; {new Date().getFullYear()} TattooTalks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
