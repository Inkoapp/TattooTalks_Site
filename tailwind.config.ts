import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ========================================
      // PREMIUM MOLTEN GOLD DESIGN SYSTEM
      // ========================================
      
      // PREMIUM COLOR PALETTE
      colors: {
        // Base Backgrounds (No Pure Black)
        'ink': {
          DEFAULT: '#121212',  // Primary Background (Cod Gray)
          surface: '#1A1A1A',  // Cards/Surfaces (Deep Charcoal)
          deep: '#0D0D0D',     // Deepest shadows
        },
        
        // Molten Gold Accent (Gradient Base Colors)
        'molten': {
          gold: '#C5A059',     // Old Gold / Metallic (Start)
          amber: '#CC5500',    // Burnt Amber / Fire (End)
        },
        
        // Text Hierarchy
        'text': {
          primary: '#F5F5F5',   // Off-White (softer than pure white)
          secondary: '#A3A3A3', // Neutral Gray
          muted: '#737373',     // Dimmed text
        },
        
        // Legacy shadcn/ui compatibility (mapped to new system)
        background: '#121212',
        foreground: '#F5F5F5',
        card: {
          DEFAULT: '#1A1A1A',
          foreground: '#F5F5F5',
        },
        popover: {
          DEFAULT: '#1A1A1A',
          foreground: '#F5F5F5',
        },
        primary: {
          DEFAULT: '#C5A059',
          foreground: '#121212',
        },
        secondary: {
          DEFAULT: '#A3A3A3',
          foreground: '#121212',
        },
        muted: {
          DEFAULT: '#1A1A1A',
          foreground: '#A3A3A3',
        },
        accent: {
          DEFAULT: '#CC5500',
          foreground: '#F5F5F5',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#F5F5F5',
        },
        border: '#2A2A2A',
        input: '#1A1A1A',
        ring: '#C5A059',
      },
      
      // PREMIUM TYPOGRAPHY
      fontFamily: {
        // Serif for Headings (Editorial & Classy)
        serif: ['Playfair Display', 'Georgia', 'serif'],
        
        // Sans-Serif for Body/UI (Clean & Geometric)
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        
        // Alternative serif option
        cinzel: ['Cinzel', 'Georgia', 'serif'],
      },
      
      // PREMIUM GRADIENTS
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        
        // Molten Gold Gradient (Primary Brand)
        'molten-gold': 'linear-gradient(135deg, #C5A059 0%, #CC5500 100%)',
        
        // Mesh-like gradient (Premium effect)
        'molten-mesh': 'radial-gradient(circle at 20% 50%, #C5A059 0%, transparent 50%), radial-gradient(circle at 80% 50%, #CC5500 0%, transparent 50%)',
        
        // Subtle glow gradient
        'molten-glow': 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
      },
      
      // PREMIUM SHADOWS (Gold Glow)
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(197, 160, 89, 0.15)',
        'gold-md': '0 4px 16px rgba(197, 160, 89, 0.2)',
        'gold-lg': '0 8px 32px rgba(197, 160, 89, 0.25)',
        'gold-xl': '0 12px 48px rgba(197, 160, 89, 0.3)',
        'gold-glow': '0 0 24px rgba(197, 160, 89, 0.4), inset 0 0 12px rgba(197, 160, 89, 0.1)',
        
        'amber-glow': '0 0 24px rgba(204, 85, 0, 0.4), inset 0 0 12px rgba(204, 85, 0, 0.1)',
      },
      
      // PREMIUM BORDERS
      borderWidth: {
        '0.5': '0.5px',
        '1.5': '1.5px', // For premium outline icons
      },
      
      // PREMIUM ANIMATIONS
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(197, 160, 89, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 32px rgba(197, 160, 89, 0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
