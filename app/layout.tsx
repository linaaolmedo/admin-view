import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayoutClient } from "@/components/dashboard-layout-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KIDS Dashboard",
  description: "Kids Information Data System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <DashboardLayoutClient>{children}</DashboardLayoutClient>
        </AuthGuard>
      </body>
    </html>
  )
}
