
'use client'

import { ThemeProvider } from './theme-provider'
import { useState, useEffect } from 'react'

interface AdminProvidersProps {
  children: React.ReactNode
}

export function AdminProviders({ children }: AdminProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
