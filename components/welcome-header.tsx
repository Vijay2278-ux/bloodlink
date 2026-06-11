"use client"

import { LanguageSelector } from "@/components/language-selector"

interface WelcomeHeaderProps {
  userName?: string
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  return (
    <div className="fixed top-4 left-4 z-50">
      {userName && (
        <div className="rounded-2xl border border-border/80 border-dashed bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-sm font-medium text-primary">
            Welcome, <span className="font-bold">{userName}</span>! 👋
          </p>
        </div>
      )}
    </div>
  )
}

export function TopRightHeader() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <LanguageSelector />
    </div>
  )
}
