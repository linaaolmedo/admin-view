"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, User, Shield, Clock, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Mock user history data
const mockUserHistory = [
  { date: "2025-01-15", action: "Logged in", time: "09:30 AM" },
  { date: "2025-01-15", action: "Viewed caseload", time: "09:35 AM" },
  { date: "2025-01-15", action: "Updated student record", time: "10:15 AM" },
  { date: "2025-01-14", action: "Generated report", time: "02:45 PM" },
  { date: "2025-01-14", action: "Logged in", time: "08:15 AM" },
  { date: "2025-01-13", action: "Logged in", time: "09:00 AM" },
  { date: "2025-01-13", action: "Reviewed claims", time: "11:30 AM" },
  { date: "2025-01-12", action: "Updated qualifications", time: "03:20 PM" },
]

// Mock account types
const accountTypes = ["practitioner", "admin", "supervisor"] as const
type AccountType = (typeof accountTypes)[number]

export default function ProfilePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [accountType, setAccountType] = useState<AccountType>("practitioner")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  useEffect(() => {
    // Get user info from localStorage
    const email = localStorage.getItem("userEmail") || "cassandra.beck@kern.org"
    setUserEmail(email)

    // Randomly assign account type for demo purposes
    const randomType = accountTypes[Math.floor(Math.random() * accountTypes.length)]
    setAccountType(randomType)
  }, [])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields")
      setMessageType("error")
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match")
      setMessageType("error")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long")
      setMessageType("error")
      setIsLoading(false)
      return
    }

    // Simulate password reset
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setMessage("Password updated successfully!")
      setMessageType("success")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setMessage("Failed to update password. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const getAccountTypeBadge = (type: AccountType) => {
    const variants = {
      practitioner: "bg-blue-100 text-blue-800",
      admin: "bg-red-100 text-red-800",
      supervisor: "bg-green-100 text-green-800",
    }
    return variants[type]
  }

  const getAccountTypeIcon = (type: AccountType) => {
    switch (type) {
      case "admin":
        return <Shield className="w-4 h-4" />
      case "supervisor":
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[#000000]">Profile Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Information */}
        <Card>
          <CardHeader className="bg-[#7a8dff] text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-sm font-medium text-[#787878]">Email</Label>
              <p className="text-[#000000] font-medium">{userEmail}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#787878]">Account Type</Label>
              <div className="mt-1">
                <Badge className={`${getAccountTypeBadge(accountType)} flex items-center gap-1 w-fit`}>
                  {getAccountTypeIcon(accountType)}
                  {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#787878]">Status</Label>
              <p className="text-[#000000]">Active</p>
            </div>
          </CardContent>
        </Card>

        {/* Password Reset */}
        <Card>
          <CardHeader className="bg-[#7a8dff] text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-sm font-medium text-[#000000]">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-sm font-medium text-[#000000]">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#000000]">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {message && (
                <div className={`text-sm ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full bg-[#4286f4] hover:bg-[#2f3a83] text-white">
                {isLoading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* User History */}
      <Card className="mt-6">
        <CardHeader className="bg-[#7a8dff] text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-[#787878]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#787878]">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-[#787878]">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockUserHistory.map((entry, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3 px-4 text-[#000000]">{entry.date}</td>
                    <td className="py-3 px-4 text-[#000000]">{entry.time}</td>
                    <td className="py-3 px-4 text-[#000000]">{entry.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
