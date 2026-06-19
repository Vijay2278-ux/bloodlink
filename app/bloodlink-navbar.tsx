"use client"

import Link from "next/link"
import { useState } from "react"
import { Droplet, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function BloodLinkNavbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-transform group-hover:scale-105">
            <Droplet className="h-5 w-5 fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-red-700">
            Blood<span className="text-red-500">Link</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/#emergency" label="Emergency Requests" />
          <NavLink href="/#donate" label="Donate Blood" />
          {isAuthenticated && <NavLink href="/dashboard" label="Dashboard" />}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 shadow-sm">
                <Link href="/login?tab=register">Join BloodLink</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-red-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-red-100 bg-white px-4 pb-4 pt-2 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1">
            <MobileNavLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
            <MobileNavLink href="/#emergency" label="Emergency Requests" onClick={() => setMobileOpen(false)} />
            <MobileNavLink href="/#donate" label="Donate Blood" onClick={() => setMobileOpen(false)} />
            {isAuthenticated && (
              <MobileNavLink href="/dashboard" label="Dashboard" onClick={() => setMobileOpen(false)} />
            )}
            <div className="mt-2 pt-2 border-t border-red-100">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600"
                  onClick={() => { logout(); setMobileOpen(false) }}
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700" onClick={() => setMobileOpen(false)}>
                    <Link href="/login?tab=register">Join BloodLink</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
    >
      {label}
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
    >
      {label}
    </Link>
  )
}