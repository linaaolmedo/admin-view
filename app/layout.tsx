import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"

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
          <DashboardLayout>{children}</DashboardLayout>
        </AuthGuard>
      </body>
    </html>
  )
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#ffffff] overflow-x-hidden">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 overflow-x-hidden">
          <div className="container-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
