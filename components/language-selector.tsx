"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { ThemeToggle } from "@/components/theme-toggle"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      {(["en", "hi", "ta", "te"] as const).map((lang) => (
        <Button
          key={lang}
          onClick={() => setLanguage(lang)}
          variant={language === lang ? "default" : "outline"}
          className="rounded-2xl"
          size="sm"
        >
          {lang.toUpperCase()}
        </Button>
      ))}
      <ThemeToggle />
    </div>
  )
}
