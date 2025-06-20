"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Download, Printer, Filter, Settings2 } from "lucide-react"

// Mock data for user history
const mockUserHistory = [
  {
    id: 1,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 2,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 3,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 4,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log added",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 5,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log added",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 6,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log added",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 7,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Viewed student data",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 8,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log added",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 9,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Supervision log added",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 10,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 11,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  },
  {
    id: 12,
    practitioner: "Bradley Brown",
    eventTime: "11/7/2024 2:37:02 PM",
    eventDescription: "Service log removed",
    studentFirstName: "Samantha",
    studentLastName: "Greenfield",
    serviceDate: "11/1/2024"
  }
]

export default function UserHistoryPage() {
  const [activeTab, setActiveTab] = useState("user-history")
  const [searchTerm, setSearchTerm] = useState("")
  const [districtFilter, setDistrictFilter] = useState("district-1")
  const [orderBy, setOrderBy] = useState("date-desc")

  // Filter the data based on search and filters
  const filteredHistory = mockUserHistory.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.practitioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentLastName.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
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
        <h1 className="text-2xl font-bold text-[#000000]">Reports</h1>
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
        <TabsList className="grid grid-cols-2 w-auto">
          <TabsTrigger 
            value="claims" 
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Claims
          </TabsTrigger>
          <TabsTrigger 
            value="user-history"
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            User History
          </TabsTrigger>
        </TabsList>

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
          {/* Filters */}
          <div className="flex justify-end gap-4 items-end">
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
  
                <SelectItem value="district-1">District 1</SelectItem>
                <SelectItem value="district-2">District 2</SelectItem>
                <SelectItem value="district-3">District 3</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Practitioner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No user history found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.practitioner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.eventTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.eventDescription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.studentFirstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.studentLastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.serviceDate}
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
