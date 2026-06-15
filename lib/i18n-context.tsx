'use client'

import { createContext, useContext, ReactNode } from 'react'

type Messages = Record<string, any>

interface I18nContextType {
  locale: string
  messages: Messages
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: string
  messages: Messages
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslations must be used within I18nProvider')
  }

  return (key: string) => {
    const keys = namespace ? `${namespace}.${key}`.split('.') : key.split('.')
    let value: any = context.messages

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }
}

export function useLocale() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useLocale must be used within I18nProvider')
  }
  return context.locale
}
