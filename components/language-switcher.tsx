'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Extract current locale from pathname
  const currentLocale = pathname?.split('/')[1] || 'en'
  const isValidLocale = languages.some(lang => lang.code === currentLocale)
  const activeLocale = isValidLocale ? currentLocale : 'en'

  const handleLanguageChange = (newLocale: string) => {
    setOpen(false)
    
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname?.split('/').slice(2).join('/') || ''
    const newPath = `/${newLocale}/${pathWithoutLocale}`
    
    router.push(newPath)
  }

  const currentLanguage = languages.find(lang => lang.code === activeLocale) || languages[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-full justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Globe size={18} />
          <span className="flex-1 text-left">{currentLanguage.flag} {currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-zinc-900 border-zinc-800">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            <span className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </span>
            {activeLocale === language.code && (
              <Check size={16} className="text-yellow-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
