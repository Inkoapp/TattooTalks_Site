'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

export default function WelcomePage() {
  const router = useRouter();

  const handleLanguageSelect = (locale: string) => {
    // Sauvegarder la préférence de langue
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
    router.push(`/${locale}`);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.15) 0%, transparent 60%)'
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 mb-12"
      >
        <Image
          src="/logo.png"
          alt="TattooTalks"
          width={180}
          height={180}
          priority
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
      >
        TattooTalks
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 text-base sm:text-lg text-[#A3A3A3] mb-12 text-center"
      >
        Choisissez votre langue / Choose your language
      </motion.p>

      {/* Language buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md"
      >
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            onClick={() => handleLanguageSelect(lang.code)}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A059]/50 rounded-2xl transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="text-white font-medium text-lg group-hover:text-[#C5A059] transition-colors">
              {lang.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 text-sm text-zinc-500 mt-16"
      >
        © 2026 TattooTalks. All rights reserved.
      </motion.p>
    </div>
  );
}
