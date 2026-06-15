'use client';

import { useTranslations } from '@/lib/i18n-context';
import { Target, Mic, Users, TrendingUp } from 'lucide-react';

export default function WhyJoinSection() {
  const t = useTranslations('whyJoin');

  const features = [
    {
      icon: Target,
      titleKey: 'column1.title',
      descriptionKey: 'column1.description',
    },
    {
      icon: Mic,
      titleKey: 'column2.title',
      descriptionKey: 'column2.description',
    },
    {
      icon: Users,
      titleKey: 'column3.title',
      descriptionKey: 'column3.description',
    },
    {
      icon: TrendingUp,
      titleKey: 'column4.title',
      descriptionKey: 'column4.description',
    },
  ];

  return (
    <section className="relative py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-24 text-white">
          {t('title')}
        </h2>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Circular Icon with Orange-to-Gold Gradient + Glow */}
                <div className="relative mb-6">
                  {/* Glow effect behind the circle */}
                  <div 
                    className="absolute inset-[-20px] rounded-full blur-[35px] opacity-60"
                    style={{
                      background: 'radial-gradient(circle at center, #FF6B00 0%, #FF5500 40%, transparent 75%)'
                    }}
                  />
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <Icon className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title in Bold Orange/Gold */}
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-3">
                  {t(feature.titleKey)}
                </h3>

                {/* Description in Light Gray */}
                <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xs">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
