"use client"

import React, { useState, useEffect } from "react"
import { BloodLinkNavbar } from "@/app/bloodlink-navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Phone, MapPin, Hospital, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EmergencyPage() {
  const [mounted, setMounted] = useState(false)
  const [requesterName, setRequesterName] = useState("")
  const [bloodGroup, setBloodGroup] = useState<string>("")
  const [hospitalName, setHospitalName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [urgency, setUrgency] = useState<string>("NORMAL")

  const handleSubmit = () => {
    // Logic to save to Neon DB via server action would go here
    console.log({ requesterName, bloodGroup, urgency, hospitalName, contactNumber })
    alert("Emergency request submitted!")
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      <BloodLinkNavbar />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-1">
            <Card className="border-red-100 shadow-lg">
              <CardHeader className="bg-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Create Emergency Request
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient/Requester Name</label>
                  <Input 
                    placeholder="Enter name" 
                    value={requesterName} 
                    onChange={(e) => setRequesterName(e.target.value)} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Blood Group</label>
                    <Select value={bloodGroup} onValueChange={setBloodGroup}>
                      <SelectTrigger><SelectValue placeholder="Group" /></SelectTrigger>
                      <SelectContent className="z-[999]">
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Urgency</label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
                      <SelectContent className="z-[999]">
                        <SelectItem value="NORMAL">Normal</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                        <SelectItem value="CRITICAL">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hospital Name</label>
                  <Input 
                    placeholder="e.g. City General Hospital" 
                    value={hospitalName} 
                    onChange={(e) => setHospitalName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input 
                    placeholder="Phone number" 
                    value={contactNumber} 
                    onChange={(e) => setContactNumber(e.target.value)} 
                  />
                </div>
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-red-600 hover:bg-red-700 font-bold h-12"
                >
                  Submit Request
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Requests List (Placeholder) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="text-red-600" />
              Active Emergency Requests
            </h2>
            
            {/* Placeholder for actual requests */}
            <Card className="hover:border-red-200 transition-all border-l-4 border-l-red-600">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="animate-pulse">
                        CRITICAL
                      </Badge>
                      <span className="text-sm text-slate-500 font-medium">Posted 2 hours ago</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">O+ Blood Needed Immediately</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-slate-600">
                      <div className="flex items-center gap-2 text-sm"><Hospital className="h-4 w-4" /> St. Mary's Hospital</div>
                      <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> Downtown, New York</div>
                      <div className="flex items-center gap-2 text-sm font-bold text-red-600"><Phone className="h-4 w-4" /> +1 (555) 012-3456</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button className="w-full md:w-auto bg-slate-900 text-white">Help Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:border-red-200 transition-all border-l-4 border-l-slate-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        URGENT
                      </Badge>
                      <span className="text-sm text-slate-500 font-medium">Posted 5 hours ago</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">A- Blood Needed for Surgery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-slate-600">
                      <div className="flex items-center gap-2 text-sm"><Hospital className="h-4 w-4" /> City General Hospital</div>
                      <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> Midtown, New York</div>
                      <div className="flex items-center gap-2 text-sm font-bold text-red-600"><Phone className="h-4 w-4" /> +1 (555) 987-6543</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" className="w-full md:w-auto">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}