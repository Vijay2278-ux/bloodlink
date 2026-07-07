"use client"

import React, { useState, useEffect } from "react"
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
export interface UserProfile {
  name: string
  age: number
  classLevel: number
  reason: string
  completedOnboarding: boolean
}
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const bloodCompatibility: Record<string, { canDonateTo: string[]; canReceive: string[] }> = {
  "A+":  { canDonateTo: ["A+", "AB+"], canReceive: ["A+", "A-", "O+", "O-"] },
  "A-":  { canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceive: ["A-", "O-"] },
  "B+":  { canDonateTo: ["B+", "AB+"], canReceive: ["B+", "B-", "O+", "O-"] },
  "B-":  { canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceive: ["B-", "O-"] },
  "AB+": { canDonateTo: ["AB+"], canReceive: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  "AB-": { canDonateTo: ["AB+", "AB-"], canReceive: ["A-", "B-", "AB-", "O-"] },
  "O+":  { canDonateTo: ["A+", "B+", "AB+", "O+"], canReceive: ["O+", "O-"] },
  "O-":  { canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], canReceive: ["O-"] },
}

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

function BloodDropSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 5 10 5 15C5 19 8 22 12 22C16 22 19 19 19 15C19 10 12 2 12 2Z" fill="currentColor" opacity="0.15" />
      <path d="M12 2C12 2 7 9.5 7 14C7 17.5 9.5 20 12 20C14.5 20 17 17.5 17 14C17 9.5 12 2 12 2Z" fill="currentColor" opacity="0.3" />
      <path d="M12 4C12 4 8 10.5 8 14C8 16.5 10 18.5 12 18.5C14 18.5 16 16.5 16 14C16 10.5 12 4 12 4Z" fill="currentColor" />
    </svg>
  )
}

function HeartbeatLine() {
  return (
    <svg className="w-full h-8 text-red-400/30" viewBox="0 0 200 20" preserveAspectRatio="none">
      <polyline
        points="0,10 30,10 35,3 40,17 45,10 70,10 75,3 80,17 85,10 110,10 115,3 120,17 125,10 150,10 155,3 160,17 165,10 200,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="animate-pulse"
      />
    </svg>
  )
}

function FloatingDrop({ className, delay }: { className?: string; delay?: string }) {
  return (
    <div
      className={`absolute opacity-20 ${className || ""}`}
      style={{
        animation: `floatDrop 6s ease-in-out infinite`,
        animationDelay: delay || "0s",
      }}
    >
      <BloodDropSVG className="w-full h-full" />
    </div>
  )
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
      toast.error("Failed to submit  request. Please try again.")
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

      <style>{`
        @keyframes floatDrop {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.35; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80"
            alt="Blood donation"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(1.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.3),transparent_70%)]" />
        </div>

        <FloatingDrop className="w-16 h-16 text-red-400 top-[15%] left-[8%]" delay="0s" />
        <FloatingDrop className="w-10 h-10 text-red-300 top-[25%] right-[12%]" delay="1.5s" />
        <FloatingDrop className="w-20 h-20 text-red-400 bottom-[20%] right-[8%]" delay="3s" />
        <FloatingDrop className="w-12 h-12 text-red-300 bottom-[30%] left-[5%]" delay="4.5s" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm mb-6 border border-white/10 shadow-lg">
              <Heart className="h-4 w-4 text-red-300 animate-heartbeat" />
              <span className="text-white/90">Every donation can save up to 3 lives</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">
              Give Blood.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-100">Save a Life.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              BloodLink connects blood donors with those in urgent need. Join our community of everyday heroes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-semibold">
                <Link href="/login?tab=register">
                  Become a Donor <Heart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm">
                <Link href="#emergency">
                  View Requests <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-50 to-transparent" />
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />
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

      {/* Divider */}
      <div className="container mx-auto px-4 py-12">
        <HeartbeatLine />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" id="emergency">

        {/* Emergency Request Form + Active Requests */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(220,38,38,0.08)] border border-red-100/60 overflow-hidden">
              {/* Medical Image Banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80"
                  alt="Medical emergency"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.45) saturate(1.1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-900/50 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.2),transparent_60%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                      <AlertCircle className="h-5 w-5 text-red-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white drop-shadow-sm">Emergency Blood Request</h3>
                      <p className="text-xs text-white/70 mt-0.5">Fill this form to request blood immediately</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/30 backdrop-blur-sm text-red-200 border border-red-400/30 uppercase tracking-wider animate-pulse">
                    Urgent
                  </span>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      Patient / Requester Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Enter patient or requester name"
                        value={formData.requesterName}
                        onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                        required
                        className="pl-10 h-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-400/15 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {bloodGroups.map((g) => {
                        const isSelected = formData.bloodGroup === g
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, bloodGroup: g })}
                            className={`h-10 rounded-lg border text-sm font-bold transition-all ${
                              isSelected
                                ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20 scale-105"
                                : "bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50"
                            }`}
                          >
                            {g}
                          </button>
                        )
                      })}
                    </div>
                    {formData.bloodGroup && (
                      <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                        <Droplet className="h-3 w-3 text-red-400" />
                        Can receive from: {bloodCompatibility[formData.bloodGroup]?.canReceive.join(", ")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      Urgency Level <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {[
                        { value: "NORMAL", label: "Normal", color: "border-yellow-300 bg-yellow-50 text-yellow-700", selected: "bg-yellow-400 text-white border-yellow-400", dot: "bg-yellow-500" },
                        { value: "URGENT", label: "Urgent", color: "border-orange-300 bg-orange-50 text-orange-700", selected: "bg-orange-500 text-white border-orange-500", dot: "bg-orange-500" },
                        { value: "CRITICAL", label: "Critical", color: "border-red-300 bg-red-50 text-red-700", selected: "bg-red-600 text-white border-red-600 animate-pulse", dot: "bg-red-600" },
                      ].map((item) => {
                        const isSelected = formData.urgency === item.value
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, urgency: item.value })}
                            className={`flex-1 h-10 rounded-lg border text-xs font-semibold transition-all ${
                              isSelected ? item.selected : item.color
                            }`}
                          >
                            <span className="flex items-center justify-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${item.dot} ${isSelected ? "bg-white" : ""}`} />
                              {item.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Hospital Name</label>
                      <div className="relative">
                        <Hospital className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="e.g. City General"
                          value={formData.hospitalName}
                          onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                          className="pl-10 h-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-400/15 text-sm transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="City, Area"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="pl-10 h-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-400/15 text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="tel"
                        placeholder="Phone number with country code"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        required
                        className="pl-10 h-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-400/15 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm rounded-lg shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all disabled:opacity-50"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting Request...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Submit Emergency Request
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-50/50 border border-amber-200/50 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800">Important Notice</p>
                    <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
                      This request will be sent to all matching donors in your area. Please provide accurate contact information for a swift response.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Blood Compatibility Card */}
            <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(220,38,38,0.06)] border border-red-100/40 overflow-hidden">
              <div className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  Blood Compatibility Guide
                </h4>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  {bloodGroups.map((g) => (
                    <div key={g} className="py-2 px-1 rounded-md bg-slate-50 border border-slate-100">
                      <div className="font-bold text-red-600 text-sm">{g}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                        Donate: {bloodCompatibility[g].canDonateTo.length === 8 ? "All" : bloodCompatibility[g].canDonateTo.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  O- is the universal donor &bull; AB+ is the universal recipient
                </p>
              </div>
            </div>
          </div>

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
                {requests.map((req) => (
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
          <div className="relative mb-16 rounded-3xl overflow-hidden min-h-[200px] flex items-center">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?w=1200&q=80"
                alt="Blood donors"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.35) saturate(1.1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80" />
            </div>
            <div className="relative py-16 px-4 text-center w-full">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-1.5 text-sm text-white border border-white/10 mb-4">
                <Droplet className="h-4 w-4" /> Make a Difference
              </div>
              <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-sm">Register as a Blood Donor</h2>
              <p className="text-white/70 max-w-lg mx-auto text-lg">
                Sign up to be notified when someone in your area needs your blood type
              </p>
            </div>
          </div>

          {!isAuthenticated ? (
            <Card className="max-w-lg mx-auto border-2 border-dashed border-red-200 bg-gradient-to-br from-red-50/50 to-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Heart className="h-8 w-8 text-red-500 animate-heartbeat" />
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&q=80"
                  alt="Blood donation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <BloodDropSVG className="w-12 h-12 text-white/80 mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">Your Donation Matters</h3>
                  <p className="text-white/70 text-sm">One pint of blood can save up to three lives. Join our community today.</p>
                </div>
              </div>

              <Card className="border-red-200/50 shadow-xl">
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
            </div>
          )}
        </section>

        {/* Registered Donors Showcase */}
        {donors.length > 0 && (
          <section className="mb-20">
            <div className="relative mb-10 rounded-2xl overflow-hidden min-h-[160px] flex items-center">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80"
                  alt="Community of donors"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.35)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80" />
              </div>
              <div className="relative py-10 px-4 text-center w-full">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">Our Donor Community</h2>
                <p className="text-white/70 max-w-lg mx-auto">
                  {donors.length} registered donors ready to help
                </p>
              </div>
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
              {
                icon: Search, step: "01", title: "Find a Request", desc: "Browse emergency blood requests in your area or nearby hospitals.",
                img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80"
              },
              {
                icon: CheckCircle, step: "02", title: "Respond & Confirm", desc: "Contact the requester or hospital to confirm your donation appointment.",
                img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80"
              },
              {
                icon: Droplet, step: "03", title: "Donate & Save", desc: "Visit the hospital, donate blood, and help save a life in your community.",
                img: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80"
              },
            ].map((item) => (
              <Card key={item.step} className="border-0 shadow-lg text-center bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    style={{ filter: "brightness(0.6)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-800/30 to-transparent" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{item.step}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-red-300" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA with Image */}
        <section className="rounded-2xl overflow-hidden relative shadow-2xl mb-8">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1582719188393-badd2c0cb4df?w=1200&q=80"
              alt="Blood donation"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/60 to-red-950/80" />
          </div>
          <div className="relative p-12 md:p-16 text-white text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/10">
              <Heart className="h-8 w-8 text-red-300 animate-heartbeat" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Join thousands of donors who have already saved lives through BloodLink
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-50 hover:scale-[1.02] transition-all shadow-lg">
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
