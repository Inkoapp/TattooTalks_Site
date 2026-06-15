
'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from 'react-hot-toast'
import { Toaster as SonnerToaster } from 'sonner'
import { useState, useEffect } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1C1C1C',
              color: '#FFFFFF',
              border: '1px solid #FFC93C',
            },
          }}
        />
        <SonnerToaster 
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1C1C1C',
              color: '#FFFFFF',
              border: '1px solid #FFC93C',
            },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  )
}
