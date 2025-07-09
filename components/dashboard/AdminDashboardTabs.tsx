"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimeRangeSelector } from "./TimeRangeSelector"
import { ClaimsProcessingPerformanceChart } from "./ClaimsProcessingPerformanceChart"
import { ClaimsAgingChart } from "./ClaimsAgingChart"
import { FinancialImpactChart } from "./FinancialImpactChart"
import { 
  generateClaimsProcessingData,
  generateClaimsAgingData,
  generateFinancialImpactData
} from "@/lib/data/mock-claims-data"
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react"

export function AdminDashboardTabs() {
  const [timeRange, setTimeRange] = useState("1y")
  const [activeSection, setActiveSection] = useState("overview")

  // Generate mock data
  const claimsProcessingData = generateClaimsProcessingData()
  const claimsAgingData = generateClaimsAgingData()
  const financialImpactData = generateFinancialImpactData()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    
    if (element) {
      // Add a brief highlight effect to show what section we're scrolling to
      element.style.outline = '3px solid #0d9488'
      element.style.outlineOffset = '4px'
      element.style.borderRadius = '8px'
      
      // First, scroll to the element using scrollIntoView
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
      
      // Then adjust for the sticky header after a short delay
      setTimeout(() => {
        const stickyHeader = document.querySelector('.sticky') as HTMLElement
        const headerHeight = 80 // Main app header
        const stickyHeaderHeight = stickyHeader ? stickyHeader.offsetHeight : 80
        const totalOffset = headerHeight + stickyHeaderHeight + 20 // Extra padding
        
        const currentScroll = window.pageYOffset
        const adjustedScroll = currentScroll - totalOffset
        
        // Debug logging
        console.log('Scroll adjustment:', {
          sectionId,
          currentScroll,
          totalOffset,
          adjustedScroll,
          stickyHeaderHeight
        })
        
        window.scrollTo({
          top: Math.max(0, adjustedScroll),
          behavior: 'smooth'
        })
      }, 100)
      
      // Remove the highlight after a short delay
      setTimeout(() => {
        element.style.outline = 'none'
        element.style.outlineOffset = '0'
        element.style.borderRadius = ''
      }, 2000)
    } else {
      console.error('Element not found:', sectionId)
    }
  }

  const handleTabClick = (tabValue: string) => {
    setActiveSection(tabValue)
    
    // Small delay to ensure state is updated
    setTimeout(() => {
      // Scroll to the appropriate section
      if (tabValue === "overview") {
        scrollToSection("system-overview-cards")
      } else if (tabValue === "analytics") {
        scrollToSection("claims-analytics-overview")
      }
    }, 100)
  }

  // Handle scroll detection to update active section
  useEffect(() => {
    const handleScroll = () => {
      const overviewElement = document.getElementById('system-overview-cards')
      const analyticsElement = document.getElementById('claims-analytics-overview')
      
      if (overviewElement && analyticsElement) {
        const stickyHeader = document.querySelector('.sticky') as HTMLElement
        const stickyHeaderHeight = stickyHeader ? stickyHeader.offsetHeight + 80 : 160
        
        const scrollPosition = window.scrollY + stickyHeaderHeight
        const overviewTop = overviewElement.offsetTop
        const analyticsTop = analyticsElement.offsetTop
        
        // Determine which section is currently in view
        if (scrollPosition >= analyticsTop - 50) {
          setActiveSection('analytics')
        } else {
          setActiveSection('overview')
        }
      }
    }

    // Debounce scroll events for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 50)
    }

    window.addEventListener('scroll', debouncedHandleScroll)
    
    // Initial check
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="w-full relative">
      {/* Navigation Header - Sticky position for natural scrolling behavior */}
      <div className="sticky top-20 z-[200] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg mb-6">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Tabs value={activeSection} onValueChange={handleTabClick} className="w-auto">
              <TabsList className="grid w-full min-w-[300px] max-w-[400px] grid-cols-2 bg-gray-100">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center justify-center gap-2 cursor-pointer data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm"
                  onClick={() => handleTabClick("overview")}
                >
                  <BarChart3 className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center justify-center gap-2 cursor-pointer data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm"
                  onClick={() => handleTabClick("analytics")}
                >
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex-shrink-0">
              <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Remove excessive padding */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-32 space-y-6 mb-16">
          {/* Dashboard Overview Header */}
          <div className="mb-6 p-4 bg-teal-50 rounded-lg">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">Dashboard Overview</h3>
            <p className="text-sm text-teal-700">
              Comprehensive view of your system status, claims processing, recent activities, and key performance indicators. 
              Monitor real-time metrics and stay informed about critical alerts and team performance.
            </p>
          </div>
          
          {/* System Overview Cards */}
          <div id="system-overview-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 scroll-mt-32">
            <Card className="overflow-hidden border-gray-200 h-full flex flex-col">
              <CardHeader className="bg-gray-50 border-b border-gray-200 pb-3 flex-shrink-0">
                <CardTitle className="text-sm text-gray-800">System Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Users</span>
                    <span className="text-lg font-semibold text-gray-900">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Practitioners</span>
                    <span className="text-lg font-semibold text-green-600">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Supervisors</span>
                    <span className="text-lg font-semibold text-blue-600">43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Students</span>
                    <span className="text-lg font-semibold text-purple-600">1,284</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-yellow-200 h-full flex flex-col">
              <CardHeader className="bg-yellow-50 border-b border-yellow-200 pb-3 flex-shrink-0">
                <CardTitle className="text-sm text-yellow-800">Claims Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Claims</span>
                    <Badge className="bg-yellow-100 text-yellow-800">124</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ready to Submit</span>
                    <Badge className="bg-blue-100 text-blue-800">67</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Paid Claims</span>
                    <Badge className="bg-green-100 text-green-800">89</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rejected Claims</span>
                    <Badge className="bg-red-100 text-red-800">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-green-200 h-full flex flex-col">
              <CardHeader className="bg-green-50 border-b border-green-200 pb-3 flex-shrink-0">
                <CardTitle className="text-sm text-green-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-gray-900 font-medium">New User Registration</div>
                    <div className="text-gray-600">Sarah Mitchell - Practitioner</div>
                    <div className="text-gray-400 text-xs">2 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-900 font-medium">Configuration Update</div>
                    <div className="text-gray-600">Billing codes updated</div>
                    <div className="text-gray-400 text-xs">4 hours ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-900 font-medium">Bulk Student Import</div>
                    <div className="text-gray-600">45 new students added</div>
                    <div className="text-gray-400 text-xs">1 day ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-red-200 h-full flex flex-col">
              <CardHeader className="bg-red-50 border-b border-red-200 pb-3 flex-shrink-0">
                <CardTitle className="text-sm text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-red-900 font-medium">Overdue Claims</div>
                    <div className="text-red-700">23 claims need attention</div>
                    <div className="text-red-400 text-xs">High priority</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-orange-900 font-medium">Processing Delays</div>
                    <div className="text-orange-700">15 claims aging &gt;30 days</div>
                    <div className="text-orange-400 text-xs">Medium priority</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-yellow-900 font-medium">System Maintenance</div>
                    <div className="text-yellow-700">Scheduled for weekend</div>
                    <div className="text-yellow-400 text-xs">Low priority</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-teal-200 h-full flex flex-col">
              <CardHeader className="bg-teal-50 border-b border-teal-200 pb-3 flex-shrink-0">
                <CardTitle className="text-sm text-teal-800">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Processing Time</span>
                    <span className="text-lg font-semibold text-teal-600">3.2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-lg font-semibold text-green-600">98.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Volume</span>
                    <span className="text-lg font-semibold text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue Impact</span>
                    <span className="text-lg font-semibold text-purple-600">$156K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-indigo-200 h-full flex flex-col">
              <CardHeader className="bg-indigo-50 border-b border-indigo-200 pb-3 flex-shrink-0">
                <CardTitle className="text-sm text-indigo-800">Practitioner Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Performer</span>
                    <span className="text-lg font-semibold text-indigo-600">Sarah Johnson</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Claims/Week</span>
                    <span className="text-lg font-semibold text-green-600">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Team Size</span>
                    <span className="text-lg font-semibold text-blue-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Efficiency Score</span>
                    <span className="text-lg font-semibold text-purple-600">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics" className="scroll-mt-32 space-y-6">
          <div id="claims-analytics-overview" className="mb-6 p-4 bg-teal-50 rounded-lg scroll-mt-32">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">Claims Analytics Overview</h3>
            <p className="text-sm text-teal-700">
              Complete analysis of claims processing performance, trends, and operational efficiency. 
              Use the time range selector above to filter data for different periods.
            </p>
          </div>

          {/* Claims Processing Performance */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="w-full flex">
                <ClaimsProcessingPerformanceChart data={claimsProcessingData} timeRange={timeRange} />
              </div>
              
              <div className="w-full flex">
                <ClaimsAgingChart data={claimsAgingData} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="w-full flex">
                <FinancialImpactChart data={financialImpactData} timeRange={timeRange} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}