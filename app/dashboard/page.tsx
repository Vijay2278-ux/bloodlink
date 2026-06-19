"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { BloodLinkNavbar } from "@/app/bloodlink-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplet, Heart, Clock, Users, Phone, MapPin, Hospital, Loader2 } from "lucide-react"
import Link from "next/link"

interface EmergencyRequest {
  id: string
  requesterName: string
  bloodGroup: string
  hospitalName: string
  location: string
  contactNumber: string
  urgencyLevel: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [requests, setRequests] = useState<EmergencyRequest[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [mounted, loading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/emergency")
        .then((res) => res.json())
        .then((data) => { if (data.requests) setRequests(data.requests) })
        .catch(() => {})
        .finally(() => setFetching(false))
    }
  }, [isAuthenticated])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 via-white to-white">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  const urgencyBadge = (level: string) => {
    const map: Record<string, string> = {
      CRITICAL: "bg-red-600 text-white animate-pulse",
      URGENT: "bg-orange-500 text-white",
      NORMAL: "bg-yellow-500 text-white",
    }
    return map[level] || ""
  }

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white">
      <BloodLinkNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name || "Donor"}</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s an overview of your impact and active requests.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">0</div>
                <div className="text-sm text-muted-foreground">Lives Saved</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{requests.length}</div>
                <div className="text-sm text-muted-foreground">Active Requests</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">1</div>
                <div className="text-sm text-muted-foreground">Your Donations</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-red-200 shadow-sm">
          <CardHeader className="border-b border-red-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplet className="h-5 w-5 text-red-600" />
              Active Emergency Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {fetching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-red-600" />
              </div>
            ) : requests.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No active requests at the moment.
              </div>
            ) : (
              <div className="divide-y divide-red-50">
                {requests.map((req) => (
                  <div key={req.id} className="p-5 hover:bg-red-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={urgencyBadge(req.urgencyLevel)}>
                            {req.urgencyLevel}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{timeAgo(req.createdAt)}</span>
                        </div>
                        <h3 className="font-semibold text-slate-900">
                          <span className="text-red-600">{req.bloodGroup}</span> Blood Needed — {req.requesterName}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          {req.hospitalName && <span className="flex items-center gap-1"><Hospital className="h-3.5 w-3.5 text-red-400" />{req.hospitalName}</span>}
                          {req.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-red-400" />{req.location}</span>}
                          <span className="flex items-center gap-1 font-medium text-red-600"><Phone className="h-3.5 w-3.5" />{req.contactNumber}</span>
                        </div>
                      </div>
                      <a href={`tel:${req.contactNumber}`}>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 whitespace-nowrap">
                          Help Now
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            <Link href="/#emergency">Create Emergency Request</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
