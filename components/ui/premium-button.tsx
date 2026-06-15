'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ========================================
   PREMIUM BUTTON COMPONENT
   World-Class Molten Gold Design System
   ======================================== */

export interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  glow?: 'subtle' | 'medium' | 'strong'
  shimmer?: boolean
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      glow = 'medium',
      shimmer = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles (always applied)
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-sans font-semibold tracking-wide uppercase
      transition-all duration-300 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-molten-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink-primary
      overflow-hidden
    `

    // Size variants
    const sizeStyles = {
      sm: 'px-4 py-2 text-xs rounded-md',
      md: 'px-6 py-3 text-sm rounded-lg',
      lg: 'px-8 py-4 text-base rounded-xl',
      xl: 'px-10 py-5 text-lg rounded-2xl',
    }

    // Variant styles
    const variantStyles = {
      // Primary: Full Molten Gold background with glow
      primary: `
        bg-gradient-to-r from-molten-gold to-molten-amber
        text-ink-primary
        hover:shadow-gold-lg hover:scale-[1.02]
        active:scale-[0.98]
      `,
      
      // Secondary: Dark background with gold text
      secondary: `
        bg-ink-surface
        text-molten-gold
        border border-molten-gold/30
        hover:bg-ink-surface/80 hover:border-molten-gold/50
        hover:shadow-gold-md
      `,
      
      // Outline: Gold border with transparent background
      outline: `
        bg-transparent
        text-text-primary
        gold-border-glow
        hover:bg-ink-surface/50
      `,
      
      // Ghost: No border, subtle hover
      ghost: `
        bg-transparent
        text-text-secondary
        hover:bg-ink-surface/30
        hover:text-molten-gold
      `,
    }

    // Glow intensity (adds to variant styles)
    const glowStyles = {
      subtle: 'shadow-gold-sm',
      medium: 'shadow-gold-md hover:shadow-gold-lg',
      strong: 'shadow-gold-lg hover:shadow-gold-xl',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          variant !== 'ghost' && glowStyles[glow],
          shimmer && 'animate-shimmer bg-gradient-to-r from-molten-gold via-molten-amber to-molten-gold bg-[length:200%_auto]',
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        
        {/* Button content */}
        {!isLoading && children}
        
        {/* Optional shimmer overlay */}
        {shimmer && !isLoading && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        )}
      </button>
    )
  }
)

PremiumButton.displayName = 'PremiumButton'

export { PremiumButton }
