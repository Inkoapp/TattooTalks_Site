'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MessageCircle,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium-button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from '@/lib/i18n-context'

// Mock Data
const MOCK_FEATURED_ARTWORK = {
  imageUrl: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=2000',
  artistName: 'Yuki Matsuda',
  style: 'Japanese Traditional',
  title: 'Dragon & Waves Sleeve',
}

const MOCK_TRENDING_STYLES = [
  {
    id: 1,
    name: 'Realism',
    imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600',
    count: '2.4K Talks',
  },
  {
    id: 2,
    name: 'Blackwork',
    imageUrl: 'https://adrenalinestudios.com/wp-content/uploads/2025/07/Plant-Tattoo-Artist-Vancouver-BC-Blackwork-2.jpg',
    count: '1.8K Talks',
  },
  {
    id: 3,
    name: 'Japanese',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Genji_emaki_azumaya.jpg/500px-Genji_emaki_azumaya.jpg',
    count: '3.1K Talks',
  },
  {
    id: 4,
    name: 'Fine Line',
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=600',
    count: '1.5K Talks',
  },
]

const MOCK_LIVE_TALKS = [
  {
    id: 1,
    title: 'Best needles for Japanese cloud work?',
    author: 'SakuraInk',
    room: 'Technical Mastery',
    replies: 47,
    timestamp: '12 min ago',
  },
  {
    id: 2,
    title: 'Client aftercare: What should studios provide?',
    author: 'StudioOwner_LA',
    room: 'Business & Marketing',
    replies: 89,
    timestamp: '28 min ago',
  },
  {
    id: 3,
    title: 'Transitioning from traditional to electric machines',
    author: 'HandPokeKing',
    room: 'Equipment & Techniques',
    replies: 134,
    timestamp: '1 hour ago',
  },
]

export function HomeDashboard() {
  const t = useTranslations('landing')

  return (
    <div className="min-h-screen bg-ink-primary">
      {/* ========================================
          HERO SECTION - FEATURED ARTWORK
          ======================================== */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={MOCK_FEATURED_ARTWORK.imageUrl}
            alt={MOCK_FEATURED_ARTWORK.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-primary/30 to-ink-primary" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex">
                <div className="gold-border-glow-strong px-6 py-3 rounded-full bg-ink-surface/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-molten-gold" />
                    <span className="gold-gradient-text font-sans font-bold text-sm uppercase tracking-wider">
                      Tattoo of the Week
                    </span>
                  </div>
                </div>
              </div>

              {/* Artist Name */}
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-tight">
                {MOCK_FEATURED_ARTWORK.artistName}
              </h1>

              {/* Artwork Details */}
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-ink-surface/80 backdrop-blur-sm text-text-secondary border-border-subtle">
                  {MOCK_FEATURED_ARTWORK.style}
                </Badge>
                <p className="font-sans text-lg text-text-secondary">
                  {MOCK_FEATURED_ARTWORK.title}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link href="/contact">
                  <PremiumButton 
                    variant="primary" 
                    size="lg" 
                    glow="strong"
                    className="group"
                  >
                    View Masterpiece
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </PremiumButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          TRENDING STYLES SECTION - DISCOVERY
          ======================================== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-molten-gold icon-premium" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary">
                Trending Styles
              </h2>
            </div>
            <p className="font-sans text-lg text-text-secondary max-w-2xl">
              Explore the most popular tattoo styles in our community
            </p>
          </motion.div>

          {/* Horizontal Scrollable Grid */}
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-6 min-w-max md:grid md:grid-cols-2 lg:grid-cols-4 md:min-w-0">
              {MOCK_TRENDING_STYLES.map((style, index) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-[280px] md:w-auto"
                >
                  <Card className="group card-premium hover:gold-border-glow cursor-pointer h-full">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <Image
                          src={style.imageUrl}
                          alt={style.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/50 to-transparent opacity-80" />
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="font-serif text-2xl font-bold text-text-primary group-hover:gold-gradient-text transition-all">
                          {style.name}
                        </h3>
                        <p className="font-sans text-sm text-text-secondary">
                          {style.count}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          LIVE TALKS SECTION - COMMUNITY PULSE
          ======================================== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-ink-surface/30">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Fresh Ink & Talks
            </h2>
            <p className="font-sans text-lg text-text-secondary">
              Join the conversation with the world's top tattoo professionals
            </p>
          </motion.div>

          {/* Talks List */}
          <div className="space-y-4">
            {MOCK_LIVE_TALKS.map((talk, index) => (
              <motion.div
                key={talk.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href="/contact">
                  <Card className="card-premium hover:gold-border-glow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: Content */}
                        <div className="flex-1 space-y-3">
                          {/* Title */}
                          <h3 className="font-sans text-xl font-semibold text-text-primary group-hover:gold-gradient-text transition-all leading-tight">
                            {talk.title}
                          </h3>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                            <span className="font-medium text-text-primary">
                              {talk.author}
                            </span>
                            <span className="text-text-muted">•</span>
                            <Badge variant="secondary" className="text-xs">
                              {talk.room}
                            </Badge>
                            <span className="text-text-muted">•</span>
                            <span>{talk.timestamp}</span>
                          </div>
                        </div>

                        {/* Right: Reply Count */}
                        <div className="flex items-center gap-2 shrink-0">
                          <MessageCircle className="h-5 w-5 icon-premium" />
                          <span className="gold-gradient-text font-sans font-bold text-lg">
                            {talk.replies}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/contact">
              <PremiumButton 
                variant="outline" 
                size="lg" 
                glow="medium"
              >
                Explore All Discussions
                <ArrowRight className="h-5 w-5" />
              </PremiumButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
