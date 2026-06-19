"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { LoginForm } from "@/components/login-form"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { Droplet } from "lucide-react"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  const tabParam = searchParams.get("tab")
  const defaultTab = tabParam === "register" ? "register" : "login"

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && !loading && isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, loading, router, mounted])

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-white flex flex-col">
      <div className="px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
            <Droplet className="h-4 w-4 fill-white" />
          </div>
          <span className="text-lg font-bold text-red-700">Blood<span className="text-red-500">Link</span></span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <Droplet className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome to BloodLink</h1>
            <p className="text-muted-foreground mt-1">Sign in to save lives or create an account</p>
          </div>
          <LoginForm onSuccess={() => router.push("/")} defaultTab={defaultTab} />
        </div>
      </div>
      <div className="text-center py-4 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} BloodLink. Saving lives together.
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
