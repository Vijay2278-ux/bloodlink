"use client"

import React, { useState, useEffect, useRef } from "react"
import { BloodLinkNavbar } from "./bloodlink-navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import {
  Droplet, Heart, Phone, MapPin, Hospital, Clock, Users,
  AlertCircle, CheckCircle, ArrowRight, Search, ChevronRight, Loader2, Sparkles
} from "lucide-react"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const stats = [
  { icon: Users, label: "Registered Donors", value: "2,847" },
  { icon: Heart, label: "Lives Saved", value: "1,234" },
  { icon: Hospital, label: "Partner Hospitals", value: "48" },
  { icon: Clock, label: "Emergency Requests", value: "156" },
]

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

export default function EmergencyPage() {
  const { user, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [requests, setRequests] = useState<EmergencyRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    requesterName: "", bloodGroup: "", hospitalName: "", location: "", contactNumber: "", urgency: "NORMAL"
  })
  const [donorForm, setDonorForm] = useState({
    bloodGroup: "", age: "", phone: "", city: "", lastDonation: "", isAvailable: true,
  })
  const [donorSubmitting, setDonorSubmitting] = useState(false)
  const [donorError, setDonorError] = useState("")
  const [donorSuccess, setDonorSuccess] = useState(false)
  const [isDonor, setIsDonor] = useState(false)
  const [donors, setDonors] = useState<any[]>([])
  const [showAllDonors, setShowAllDonors] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    fetchRequests()
    fetch("/api/donors")
      .then((r) => r.json())
      .then((data) => { if (data.donors) setDonors(data.donors) })
      .catch(() => {})
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/emergency")
      const data = await res.json()
      if (data.requests) setRequests(data.requests)
    } catch (err) {
      console.error("Failed to fetch requests:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.requesterName || !formData.bloodGroup || !formData.contactNumber) {
      toast.error("Please fill in all required fields.")
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json()
        toast.error(err.error || "Failed to submit request")
        return
      }
      setFormData({ requesterName: "", bloodGroup: "", hospitalName: "", location: "", contactNumber: "", urgency: "NORMAL" })
      await fetchRequests()
      toast.success("Emergency request submitted! We'll notify matching donors.", { duration: 5000 })
    } catch (err) {
      toast.error("Failed to submit request. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/donors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.donors?.some((d: any) => d.userId === user?.id)) {
            setIsDonor(true)
          }
        })
        .catch(() => {})
    }
  }, [isAuthenticated, user])

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDonorError("")
    setDonorSuccess(false)

    if (!donorForm.bloodGroup || !donorForm.age || !donorForm.phone || !donorForm.city) {
      setDonorError("Please fill in all required fields.")
      return
    }

    const ageNum = parseInt(donorForm.age)
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      setDonorError("Please enter a valid age.")
      return
    }

    setDonorSubmitting(true)
    try {
      const token = localStorage.getItem("auth_token")
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bloodGroup: donorForm.bloodGroup,
          age: ageNum,
          phone: donorForm.phone,
          city: donorForm.city,
          lastDonation: donorForm.lastDonation || undefined,
          isAvailable: donorForm.isAvailable,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        const msg = Array.isArray(data.error) ? data.error[0]?.message : data.error
        setDonorError(msg || "Failed to register as donor")
        return
      }

      setDonorSuccess(true)
      setIsDonor(true)
      setDonorForm({ bloodGroup: "", age: "", phone: "", city: "", lastDonation: "", isAvailable: true })
      toast.success("You're now registered as a blood donor!", { duration: 5000 })
    } catch {
      setDonorError("Failed to submit. Please try again.")
    } finally {
      setDonorSubmitting(false)
    }
  }

  const urgencyBadge = (level: string) => {
    const map: Record<string, { class: string; label: string }> = {
      CRITICAL: { class: "bg-red-600 text-white animate-pulse", label: "CRITICAL" },
      URGENT: { class: "bg-orange-500 text-white", label: "URGENT" },
      NORMAL: { class: "bg-yellow-500 text-white", label: "NORMAL" },
    }
    return map[level] || map.NORMAL
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-1.5 text-sm mb-6 border border-white/10 shadow-lg shadow-red-900/20">
              <Heart className="h-4 w-4 text-red-200" />
              Every donation can save up to 3 lives
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Connect. Donate.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-100">Save Lives.</span>
            </h1>
            <p className="text-lg md:text-xl text-red-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              BloodLink connects blood donors with those in urgent need. Join our community of heroes and make a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-50 shadow-lg shadow-red-900/30 hover:shadow-xl hover:scale-[1.02] transition-all">
                <Link href="/login?tab=register">
                  Become a Donor <Heart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                <Link href="#emergency">
                  View Requests <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-red-50 to-transparent" />
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={stat.label} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-100 to-red-50 shadow-inner">
                  <stat.icon className="h-6 w-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20" id="emergency">

        {/* Emergency Request Form + Active Requests */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="border-red-200/50 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-none p-5">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  Emergency Blood Request
                </CardTitle>
                <p className="text-sm text-red-100 font-normal">Fill this form to request blood immediately</p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Patient/Requester Name *</label>
                    <Input
                      placeholder="Full name"
                      value={formData.requesterName}
                      onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                      required
                      className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Blood Group *</label>
                      <select
                        value={mounted ? formData.bloodGroup : ""}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:border-red-400 focus:ring-[3px] focus:ring-red-400/20"
                        required
                      >
                        <option value="" disabled>Select</option>
                        {bloodGroups.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Urgency *</label>
                      <select
                        value={mounted ? formData.urgency : "NORMAL"}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:border-red-400 focus:ring-[3px] focus:ring-red-400/20"
                      >
                        <option value="NORMAL">Normal</option>
                        <option value="URGENT">Urgent</option>
                        <option value="CRITICAL">Critical</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Hospital Name</label>
                    <Input
                      placeholder="e.g. City General Hospital"
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Location</label>
                    <Input
                      placeholder="City, Area"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Contact Number *</label>
                    <Input
                      placeholder="Phone number"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      required
                      className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-11 text-base shadow-lg shadow-red-600/20" disabled={submitting}>
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      "Submit Emergency Request"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Active Requests */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                  <Clock className="h-4 w-4 text-red-600" />
                </div>
                Active Emergency Requests
              </h2>
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                {requests.length} Active
              </Badge>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                  <p className="text-sm text-muted-foreground">Loading requests...</p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <Card className="border-dashed border-2 border-red-200 bg-red-50/40">
                <CardContent className="p-14 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">No Active Requests</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    All emergency requests have been fulfilled. Check back later or register as a donor.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {requests.map((req, i) => (
                  <Card key={req.id} className="hover:shadow-lg transition-all border-l-[5px] border-l-red-600 overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={urgencyBadge(req.urgencyLevel).class}>
                              {urgencyBadge(req.urgencyLevel).label}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {timeAgo(req.createdAt)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">
                            <span className="text-red-600">{req.bloodGroup}</span> Blood Needed
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> Requester: {req.requesterName}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            {req.hospitalName && (
                              <div className="flex items-center gap-2 bg-slate-50 rounded-md px-3 py-1.5">
                                <Hospital className="h-4 w-4 text-red-400 flex-shrink-0" />
                                {req.hospitalName}
                              </div>
                            )}
                            {req.location && (
                              <div className="flex items-center gap-2 bg-slate-50 rounded-md px-3 py-1.5">
                                <MapPin className="h-4 w-4 text-red-400 flex-shrink-0" />
                                {req.location}
                              </div>
                            )}
                            <div className="flex items-center gap-2 bg-slate-50 rounded-md px-3 py-1.5 font-medium text-red-600">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              {req.contactNumber}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={`tel:${req.contactNumber}`}>
                            <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 transition-transform active:scale-95 shadow-md">
                              <Phone className="h-4 w-4 mr-1" /> Help Now
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="text-center pt-2">
                  <Button variant="link" className="text-red-600 hover:text-red-700" onClick={fetchRequests}>
                    Refresh <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Donor Registration */}
        <section className="mb-20" id="donate">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-4 py-1.5 text-sm text-red-700 mb-4">
              <Droplet className="h-4 w-4" /> Make a Difference
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Register as a Blood Donor</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Sign up to be notified when someone in your area needs your blood type
            </p>
          </div>

          {!isAuthenticated ? (
            <Card className="max-w-lg mx-auto border-2 border-dashed border-red-200 bg-gradient-to-br from-red-50/50 to-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Sign in Required</h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Please sign in or create an account to register as a blood donor and start saving lives.
                </p>
                <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/20">
                  <Link href="/login?tab=register">Create Account</Link>
                </Button>
              </CardContent>
            </Card>
          ) : isDonor ? (
            <Card className="max-w-lg mx-auto border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">You're Already Registered!</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Thank you for being a registered blood donor. Check your dashboard for emergency requests in your area.
                </p>
                <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-lg mx-auto border-red-200/50 shadow-xl">
              <div className="h-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-t-lg" />
              <CardContent className="p-7">
                {donorError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 mb-4 border border-red-100">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{donorError}</span>
                  </div>
                )}
                {donorSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700 mb-4 border border-green-100">
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    <span>Successfully registered as a donor!</span>
                  </div>
                )}
                <form onSubmit={handleDonorSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Blood Group *</label>
                    <select
                      value={donorForm.bloodGroup}
                      onChange={(e) => setDonorForm({ ...donorForm, bloodGroup: e.target.value })}
                      className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus:outline-none focus:border-red-400 focus:ring-[3px] focus:ring-red-400/20"
                      required
                    >
                      <option value="" disabled>Select blood group</option>
                      {bloodGroups.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Age *</label>
                      <Input
                        type="number"
                        placeholder="e.g. 25"
                        value={donorForm.age}
                        onChange={(e) => setDonorForm({ ...donorForm, age: e.target.value })}
                        required
                        min={1}
                        max={150}
                        className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone *</label>
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={donorForm.phone}
                        onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                        required
                        className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">City *</label>
                    <Input
                      placeholder="e.g. Mumbai"
                      value={donorForm.city}
                      onChange={(e) => setDonorForm({ ...donorForm, city: e.target.value })}
                      required
                      className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Donation Date</label>
                    <Input
                      type="date"
                      value={donorForm.lastDonation}
                      onChange={(e) => setDonorForm({ ...donorForm, lastDonation: e.target.value })}
                      className="border-slate-200 focus:border-red-400 focus:ring-red-400/20"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      checked={donorForm.isAvailable}
                      onChange={(e) => setDonorForm({ ...donorForm, isAvailable: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="isAvailable" className="text-sm text-slate-700 font-medium cursor-pointer">
                      Available for donation
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-11 text-base shadow-lg shadow-red-600/20" disabled={donorSubmitting}>
                    {donorSubmitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Registering...</>
                    ) : (
                      "Register as Donor"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Registered Donors Showcase */}
        {donors.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Donor Community</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {donors.length} registered donors ready to help
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {(showAllDonors ? donors : donors.slice(0, 6)).map((donor: any) => (
                <Card key={donor.id} className="border-red-100/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-50 flex-shrink-0">
                      <Droplet className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 truncate">{donor.user?.name || "Anonymous"}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-red-600">{donor.bloodGroup}</span>
                        <span>&middot;</span>
                        <span>{donor.city}</span>
                        <span>&middot;</span>
                        <span>{donor.phone}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${donor.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {donor.isAvailable ? "Available" : "Busy"}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
            {donors.length > 6 && !showAllDonors && (
              <div className="text-center mt-6">
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => setShowAllDonors(true)}>
                  View All {donors.length} Donors <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </section>
        )}

        {/* How It Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-4 py-1.5 text-sm text-red-700 mb-4">
              <Sparkles className="h-4 w-4" /> Simple Process
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Three simple steps to save a life through blood donation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Search, step: "01", title: "Find a Request", desc: "Browse emergency blood requests in your area or nearby hospitals." },
              { icon: CheckCircle, step: "02", title: "Respond & Confirm", desc: "Contact the requester or hospital to confirm your donation appointment." },
              { icon: Droplet, step: "03", title: "Donate & Save", desc: "Visit the hospital, donate blood, and help save a life in your community." },
            ].map((item, i) => (
              <Card key={item.step} className="border-0 shadow-lg text-center bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-red-50 shadow-inner transition-transform hover:scale-110">
                    <item.icon className="h-7 w-7 text-red-600" />
                  </div>
                  <div className="text-xs font-bold text-red-400 mb-1 tracking-wider">{item.step}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 p-12 md:p-16 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/10 rounded-full blur-[60px]" />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/10">
              <Heart className="h-8 w-8 text-red-200" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-red-100/90 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Join thousands of donors who have already saved lives through BloodLink
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-50 hover:scale-[1.02] transition-all shadow-lg shadow-red-900/30">
                <Link href="/login?tab=register">Register as Donor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                <Link href="/login">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-100/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg">
                  <Droplet className="h-5 w-5 fill-white" />
                </div>
                <span className="text-xl font-bold text-red-700">Blood<span className="text-red-500">Link</span></span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                BloodLink is a community-driven platform connecting blood donors with patients in need. Every drop counts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-red-600 transition-colors">Home</Link></li>
                <li><Link href="/login" className="hover:text-red-600 transition-colors">Sign In</Link></li>
                <li><Link href="/login?tab=register" className="hover:text-red-600 transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><span className="hover:text-red-600 cursor-pointer transition-colors">Contact Us</span></li>
                <li><span className="hover:text-red-600 cursor-pointer transition-colors">FAQ</span></li>
                <li><span className="hover:text-red-600 cursor-pointer transition-colors">Privacy Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-100/50 mt-10 pt-6 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
