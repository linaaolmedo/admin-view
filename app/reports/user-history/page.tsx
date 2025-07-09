"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const handleExport = () => {
    console.log("Exporting user history data...")
    alert("Export functionality would be implemented here")
  }

  const handleBack = () => {
    router.push("/reports")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-teal-800">User History Report</h1>
            <p className="text-sm text-gray-600">Complete log of user activities and system interactions</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleExport} className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

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
              {mockUserHistory.map((item, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
