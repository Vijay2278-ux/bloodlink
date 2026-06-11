"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { WelcomeHeader, TopRightHeader } from "@/components/welcome-header"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { Dashboard } from "@/components/dashboard"
import { UserProfile } from "@/components/user-profile"

export interface UserProfile {
  name: string
  age: number
  classLevel: number
  reason: string
  completedOnboarding: boolean
}

export default function HomePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile({ ...profile, completedOnboarding: true })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen relative">
      <div className="mb-4">
        <UserProfile />
      </div>
      <TopRightHeader />
      <WelcomeHeader userName={userProfile?.name} />

      {!userProfile?.completedOnboarding ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard userProfile={userProfile} />
      )}
    </div>
  )
}
