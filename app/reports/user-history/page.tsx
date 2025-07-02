"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Download, Printer, Filter } from "lucide-react"

// Mock data for user history
const mockUserHistory = [
  {
    id: 1,
    user: "Bradley Brown",
    userType: "Practitioner",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    userType: "Supervisor",
    eventTime: "11/7/2024 2:35:15 PM",
    eventDescription: "Approved supervision log"
  },
  {
    id: 3,
    user: "Mike Wilson",
    userType: "Administrator",
    eventTime: "11/7/2024 2:30:45 PM",
    eventDescription: "Updated user permissions"
  },
  {
    id: 4,
    user: "Bradley Brown",
    userType: "Practitioner",
    eventTime: "11/7/2024 2:25:12 PM",
    eventDescription: "Service log added"
  },
  {
    id: 5,
    user: "Lisa Garcia",
    userType: "Practitioner",
    eventTime: "11/7/2024 2:20:33 PM",
    eventDescription: "Service log added"
  },
  {
    id: 6,
    user: "David Kim",
    userType: "Supervisor",
    eventTime: "11/7/2024 2:15:22 PM",
    eventDescription: "Reviewed student data"
  },
  {
    id: 7,
    user: "Emily Chen",
    userType: "Practitioner",
    eventTime: "11/7/2024 2:10:18 PM",
    eventDescription: "Viewed student data"
  },
  {
    id: 8,
    user: "Robert Taylor",
    userType: "Administrator",
    eventTime: "11/7/2024 2:05:41 PM",
    eventDescription: "Modified user account"
  },
  {
    id: 9,
    user: "Maria Rodriguez",
    userType: "Supervisor",
    eventTime: "11/7/2024 2:00:29 PM",
    eventDescription: "Supervision log added"
  },
  {
    id: 10,
    user: "James Anderson",
    userType: "Practitioner",
    eventTime: "11/7/2024 1:55:37 PM",
    eventDescription: "Service log removed"
  },
  {
    id: 11,
    user: "Jennifer Lee",
    userType: "Administrator",
    eventTime: "11/7/2024 1:50:14 PM",
    eventDescription: "System configuration updated"
  },
  {
    id: 12,
    user: "Bradley Brown",
    userType: "Practitioner",
    eventTime: "11/7/2024 1:45:28 PM",
    eventDescription: "Service log removed"
  }
]

export default function UserHistoryPage() {
  const [activeTab, setActiveTab] = useState("user-history")
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")

  // Get unique user types for filter dropdown
  const userTypes = Array.from(new Set(mockUserHistory.map(item => item.userType)))

  // Filter the data based on search and filters
  const filteredHistory = mockUserHistory.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesUserType = userTypeFilter === "all" || item.userType === userTypeFilter
    
    return matchesSearch && matchesUserType
  })

  const handleExport = () => {
    console.log("Exporting user history data...")
    alert("Export functionality would be implemented here")
  }

  const handlePrint = () => {
    console.log("Printing user history report...")
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-800">Reports</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrint} className="flex items-center">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs and Controls Row */}
        <div className="flex justify-start items-center">
          <TabsList>
            <TabsTrigger value="claims">
              Claims
            </TabsTrigger>
            <TabsTrigger value="user-history">
              User History
            </TabsTrigger>
          </TabsList>
          
          {/* Search and Filter Controls - only show for user-history tab */}
          {activeTab === "user-history" && (
            <div className="flex gap-4 items-end ml-auto mr-6">
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All User Types</SelectItem>
                  {userTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users, events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </div>

        {/* Claims Tab Content */}
        <TabsContent value="claims" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-[#787878]">Claims reporting functionality would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User History Tab Content */}
        <TabsContent value="user-history" className="mt-6 space-y-6">

          {/* Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No user history found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.userType === 'Administrator' 
                              ? 'bg-red-100 text-red-800' 
                              : item.userType === 'Supervisor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {item.userType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.eventTime}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.eventDescription}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination info */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              Showing {filteredHistory.length} of {mockUserHistory.length} entries
              {userTypeFilter !== "all" && (
                <span className="ml-2 text-teal-600">
                  (filtered by {userTypeFilter})
                </span>
              )}
            </div>
            <div>
              Page 1 of 1
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
