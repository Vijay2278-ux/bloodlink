"use client"

import { useEffect, useState } from "react"
import { ArrowRightLeft, Check, Copy, Languages, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
] as const

export default function TranslateView() {
  const { language, t } = useLanguage()
  const [originalLang, setOriginalLang] = useState<typeof language>(language)
  const [targetLang, setTargetLang] = useState<"en" | "hi" | "ta" | "te">("hi")
  const [originalText, setOriginalText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setOriginalLang(language)
  }, [language])

  useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const handleTranslate = async () => {
    if (!originalText.trim()) {
      setError(t("enterOriginal") || "Enter text")
      return
    }

    if (originalLang === targetLang) {
      setError("Choose a different target language")
      return
    }

    setLoading(true)
    setError("")
    setTranslatedText("")
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: originalText, source: originalLang, target: targetLang }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || t("translateFailed") || "Translation failed")
      } else {
        setTranslatedText(data.translatedText || data.translated_text || "")
      }
    } catch (err) {
      setError(t("translateFailed") || "Translation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSwap = () => {
    if (!translatedText) return

    setOriginalText(translatedText)
    setTranslatedText(originalText)
    setOriginalLang(targetLang)
    setTargetLang(originalLang)
    setError("")
  }

  const handleClear = () => {
    setOriginalText("")
    setTargetLang(language === "en" ? "hi" : "en")
    setTranslatedText("")
    setError("")
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!translatedText) return

    await navigator.clipboard.writeText(translatedText)
    setCopied(true)
  }

  return (
    <Card className="mt-8 overflow-hidden border-primary/15 bg-card/90 text-left shadow-[0_24px_60px_-32px_rgba(29,78,216,0.35)] backdrop-blur-sm">
      <CardHeader className="border-b border-primary/10 bg-gradient-to-r from-primary/10 via-card/95 to-secondary/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full border-primary/20 bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-primary">
              <Languages className="size-3.5" />
              {t("translateTitle")}
            </Badge>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Fast classroom translation
            </CardTitle>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Convert short notes, questions, and keywords between English, Hindi, Tamil, and Telugu without leaving the dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="size-4 text-secondary" />
            Supports quick study phrases
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("originalLang")}</label>
            <select
              value={originalLang}
              onChange={(e) => setOriginalLang(e.target.value as typeof language)}
              className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-primary/40"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mx-auto size-11 rounded-full border-primary/20 bg-background text-primary shadow-sm"
            onClick={handleSwap}
            disabled={!translatedText}
          >
            <ArrowRightLeft className="size-4" />
          </Button>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("targetLang")}</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as typeof targetLang)}
              className="h-11 w-full rounded-2xl border border-primary/15 bg-background px-4 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-primary/40"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-[1.5rem] border border-primary/10 bg-muted/60 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">{t("enterOriginal")}</label>
              <span className="text-xs text-muted-foreground">{originalText.trim().length} characters</span>
            </div>
            <Textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder={t("enterOriginalPlaceholder")}
              className="min-h-40 rounded-2xl border-primary/10 bg-background p-4 text-base leading-7 shadow-none"
            />
          </div>

          <div className="space-y-3 rounded-[1.5rem] border border-secondary/20 bg-secondary/10 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">{t("translate")}</label>
              {translatedText ? (
                <span className="text-xs text-emerald-700">Ready to copy</span>
              ) : (
                <span className="text-xs text-muted-foreground">Translation appears here</span>
              )}
            </div>
            <Textarea
              value={translatedText}
              readOnly
              placeholder="Your translated text will appear here..."
              className="min-h-40 rounded-2xl border-secondary/20 bg-background p-4 text-base leading-7 shadow-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleTranslate}
              disabled={loading || !originalText.trim()}
              className="rounded-full px-6 shadow-lg"
            >
              {loading ? t("translating") : t("translate")}
            </Button>
            <Button variant="outline" onClick={handleClear} className="rounded-full px-6 bg-background">
              {t("clear")}
            </Button>
            <Button
              variant="outline"
              onClick={handleCopy}
              disabled={!translatedText}
              className="rounded-full px-6 bg-background"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : t("copy")}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Best for short classroom text and study notes.
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}
      </CardContent>
    </Card>
  )
}





