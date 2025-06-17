"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, CheckCircle, XCircle, Clock, Eye } from "lucide-react"

// Types
type LogStatus = "pending" | "approved" | "rejected"

interface SupervisorLog {
  id: number
  practitioner: string
  student: string
  serviceDate: string
  serviceTime: string
  duration: string
  serviceType: string
  location: string
  status: LogStatus
  submittedDate: string
  caseNotes: string
  billingCode: string
  units: number
  approvedDate?: string
  rejectedDate?: string
  rejectionReason?: string
}

// Mock data for supervisor logs
const mockLogs: SupervisorLog[] = [
  {
    id: 1,
    practitioner: "Dr. Sarah Johnson",
    student: "Samantha Greenfield",
    serviceDate: "2025-01-15",
    serviceTime: "10:00 AM",
    duration: "60 min",
    serviceType: "Health behavior intervention",
    location: "03 - School",
    status: "pending" as LogStatus,
    submittedDate: "2025-01-16",
    caseNotes: "Student showed significant improvement in emotional regulation during today's session. We worked on breathing techniques and discussed triggers that cause anxiety. Homework assigned includes daily mindfulness exercises.",
    billingCode: "90834",
    units: 1
  },
  {
    id: 2,
    practitioner: "Dr. Michael Chen",
    student: "Linda Hermann",
    serviceDate: "2025-01-14",
    serviceTime: "2:00 PM",
    duration: "45 min",
    serviceType: "Individual counseling",
    location: "02 - Clinic",
    status: "approved" as LogStatus,
    submittedDate: "2025-01-15",
    approvedDate: "2025-01-16",
    caseNotes: "Continued work on social skills development. Student participated actively in role-playing exercises. Discussed strategies for peer interaction and conflict resolution.",
    billingCode: "90837",
    units: 1
  },
  {
    id: 3,
    practitioner: "Dr. Emily Rodriguez",
    student: "Zachary Gulgowski",
    serviceDate: "2025-01-13",
    serviceTime: "11:30 AM",
    duration: "30 min",
    serviceType: "Crisis intervention",
    location: "03 - School",
    status: "rejected" as LogStatus,
    submittedDate: "2025-01-14",
    rejectedDate: "2025-01-16",
    rejectionReason: "Insufficient documentation of crisis intervention protocols followed.",
    caseNotes: "Emergency session due to behavioral escalation in classroom. Implemented de-escalation techniques.",
    billingCode: "90834",
    units: 0.5
  },
  {
    id: 4,
    practitioner: "Dr. James Wilson",
    student: "Nicole Walker",
    serviceDate: "2025-01-12",
    serviceTime: "9:00 AM",
    duration: "60 min",
    serviceType: "Assessment and evaluation",
    location: "04 - Community",
    status: "pending" as LogStatus,
    submittedDate: "2025-01-13",
    caseNotes: "Comprehensive behavioral assessment completed. Administered standardized assessment tools and conducted parent interview. Results indicate moderate attention difficulties.",
    billingCode: "90791",
    units: 1
  },
  {
    id: 5,
    practitioner: "Dr. Lisa Martinez",
    student: "Leonard Reynolds",
    serviceDate: "2025-01-11",
    serviceTime: "3:30 PM",
    duration: "45 min",
    serviceType: "Group therapy",
    location: "03 - School",
    status: "approved" as LogStatus,
    submittedDate: "2025-01-12",
    approvedDate: "2025-01-13",
    caseNotes: "Group session focused on social skills and peer interaction. Student demonstrated improved communication skills and showed leadership qualities during group activities.",
    billingCode: "90853",
    units: 1
  }
]

export default function SupervisorLogsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [practitionerFilter, setPractitionerFilter] = useState("all")
  const [selectedLog, setSelectedLog] = useState<SupervisorLog | null>(null)

  // Filter logs based on active tab and filters
  const filteredLogs = mockLogs.filter(log => {
    const matchesTab = activeTab === "all" || log.status === activeTab
    const matchesSearch = searchTerm === "" || 
      log.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.practitioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    const matchesPractitioner = practitionerFilter === "all" || log.practitioner === practitionerFilter

    return matchesTab && matchesSearch && matchesStatus && matchesPractitioner
  })

  const handleApprove = (logId: number) => {
    console.log("Approving log:", logId)
    // In a real app, this would update the backend
    alert("Service log approved successfully!")
  }

  const handleReject = (logId: number) => {
    const reason = prompt("Please provide a reason for rejection:")
    if (reason) {
      console.log("Rejecting log:", logId, "Reason:", reason)
      // In a real app, this would update the backend
      alert("Service log rejected.")
    }
  }

  const getStatusBadge = (status: LogStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTabCounts = () => {
    const pending = mockLogs.filter(log => log.status === "pending").length
    const approved = mockLogs.filter(log => log.status === "approved").length
    const rejected = mockLogs.filter(log => log.status === "rejected").length
    return { pending, approved, rejected, all: mockLogs.length }
  }

  const counts = getTabCounts()

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#000000]">{counts.all}</div>
            <div className="text-sm text-[#787878]">Total Logs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{counts.pending}</div>
            <div className="text-sm text-[#787878]">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{counts.approved}</div>
            <div className="text-sm text-[#787878]">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{counts.rejected}</div>
            <div className="text-sm text-[#787878]">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Practitioner</Label>
              <Select value={practitionerFilter} onValueChange={setPractitionerFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Practitioners</SelectItem>
                  <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                  <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                  <SelectItem value="Dr. James Wilson">Dr. James Wilson</SelectItem>
                  <SelectItem value="Dr. Lisa Martinez">Dr. Lisa Martinez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs and Logs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredLogs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-[#787878]">No logs found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredLogs.map((log) => (
              <Card key={log.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{log.student}</CardTitle>
                      <p className="text-sm text-[#787878]">
                        {log.practitioner} • {log.serviceDate} at {log.serviceTime}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(log.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {selectedLog?.id === log.id ? "Hide" : "View"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Service Type:</span>
                      <p className="text-[#787878]">{log.serviceType}</p>
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>
                      <p className="text-[#787878]">{log.duration}</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-[#787878]">{log.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Billing Code:</span>
                      <p className="text-[#787878]">{log.billingCode} ({log.units} units)</p>
                    </div>
                  </div>

                  {selectedLog?.id === log.id && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div>
                        <span className="font-medium">Case Notes:</span>
                        <p className="text-[#787878] mt-1">{log.caseNotes}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Submitted:</span>
                          <p className="text-[#787878]">{log.submittedDate}</p>
                        </div>
                        {log.approvedDate && (
                          <div>
                            <span className="font-medium">Approved:</span>
                            <p className="text-[#787878]">{log.approvedDate}</p>
                          </div>
                        )}
                        {log.rejectedDate && (
                          <div>
                            <span className="font-medium">Rejected:</span>
                            <p className="text-[#787878]">{log.rejectedDate}</p>
                          </div>
                        )}
                        {log.rejectionReason && (
                          <div className="col-span-2">
                            <span className="font-medium">Rejection Reason:</span>
                            <p className="text-red-600 mt-1">{log.rejectionReason}</p>
                          </div>
                        )}
                      </div>

                      {log.status === "pending" && (
                        <div className="flex space-x-2 pt-2">
                          <Button
                            onClick={() => handleApprove(log.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(log.id)}
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
