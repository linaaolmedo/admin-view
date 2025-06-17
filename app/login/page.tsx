"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Accept any non-empty username and password
      if (email.trim() && password.trim()) {
        // Set a simple auth flag in localStorage (in a real app, use proper auth tokens)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", email)

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Please enter both username and password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    // Simulate Google sign in
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", "user@google.com")
    router.push("/dashboard")
  }

  const handleMicrosoftSignIn = () => {
    // Simulate Microsoft sign in
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", "user@microsoft.com")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-normal text-black mb-8">Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal text-black">
                Username or Email
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-normal text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white font-normal rounded-md"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center">
            <button className="text-sm text-black hover:underline">forgot password?</button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or access quickly</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-12 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700">Sign in with Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleMicrosoftSignIn}
              className="w-full h-12 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#00A4EF" d="M13 1h10v10H13z" />
                <path fill="#7FBA00" d="M1 13h10v10H1z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
              <span className="text-gray-700">Sign in with Microsoft</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex-1 bg-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-12">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large subtle circles */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-2xl"></div>

            {/* Geometric shapes with shadows */}
            <div className="absolute top-20 right-20 w-16 h-16 bg-white/40 rounded-lg rotate-12 shadow-lg"></div>
            <div className="absolute bottom-32 left-16 w-12 h-12 bg-white/30 rounded-full shadow-md"></div>
            <div className="absolute top-1/2 left-8 w-8 h-20 bg-white/25 rounded-full rotate-45 shadow-sm"></div>

            {/* Subtle grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Logo Container with enhanced styling */}
          <div className="relative z-10 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xI1JVw1XUPMjYaP97M5YxAhZtvxSeU.png"
                alt="EDUclaim - Kern Integrated Data Systems"
                className="w-80 h-auto mx-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Us Footer */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button className="text-gray-600 hover:text-gray-800 font-medium">Contact us</button>
        </div>
      </div>
    </div>
  )
}
