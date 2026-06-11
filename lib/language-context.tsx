"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { TRANSLATIONS } from "./trans"

type LanguageCode = keyof typeof TRANSLATIONS

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: keyof typeof TRANSLATIONS.en, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("preferredLanguage") as LanguageCode | null
    if (savedLanguage && (["en", "hi", "ta", "te"] as const).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem("preferredLanguage", lang)
  }

  const t = (key: keyof typeof TRANSLATIONS.en, vars?: Record<string, string | number>): string => {
    const base = TRANSLATIONS[language][key as keyof (typeof TRANSLATIONS)[LanguageCode]] || TRANSLATIONS.en[key]
    if (!vars) return base
    return Object.keys(vars).reduce((s, varName) => s.replace(new RegExp(`{${varName}}`, "g"), String(vars[varName])), base)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
