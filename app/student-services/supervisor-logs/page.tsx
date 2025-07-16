"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  FileText
} from "lucide-react"
import { useTableSorting } from "@/hooks/use-table-sorting"

// Mock data for practitioners and their students
const mockPractitionerData = [
  {
    id: 1,
    name: "Bradley Brown",
    email: "bbrown@district.edu",
    studentsCount: 13,
    students: [
      { id: 1, name: "Greenfield, Samantha", ssid: "1268946", dob: "1/2/1999" },
      { id: 2, name: "Johnson, Emma", ssid: "8765432", dob: "3/15/2000" },
      { id: 3, name: "Smith, Michael", ssid: "4567890", dob: "7/22/1999" },
    ]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sjohnson@district.edu", 
    studentsCount: 8,
    students: [
      { id: 4, name: "Davis, Alex", ssid: "2345678", dob: "5/10/2000" },
      { id: 5, name: "Wilson, Taylor", ssid: "3456789", dob: "9/3/1999" },
    ]
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "mdavis@district.edu",
    studentsCount: 12,
    students: [
      { id: 6, name: "Brown, Jordan", ssid: "4567891", dob: "11/18/1999" },
      { id: 7, name: "Garcia, Maria", ssid: "5678902", dob: "2/28/2000" },
      { id: 8, name: "Miller, Chris", ssid: "6789013", dob: "8/14/1999" },
    ]
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "ewilson@district.edu",
    studentsCount: 10,
    students: [
      { id: 9, name: "Anderson, Ashley", ssid: "7890124", dob: "4/7/2000" },
      { id: 10, name: "Thompson, Ryan", ssid: "8901235", dob: "12/1/1999" },
    ]
  },
  {
    id: 5,
    name: "Carlos Martinez",
    email: "cmartinez@district.edu",
    studentsCount: 9,
    students: [
      { id: 11, name: "Lee, Kevin", ssid: "9012346", dob: "6/25/1999" },
      { id: 12, name: "White, Jessica", ssid: "0123457", dob: "10/12/2000" },
    ]
  }
]

// Mock supervision logs data
const mockSupervisionLogs = [
  {
    id: 1,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "approved"
  },
  {
    id: 2,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "denied"
  },
  {
    id: 3,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "approved"
  },
  {
    id: 4,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "pending"
  },
  {
    id: 5,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "approved"
  },
  {
    id: 6,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "denied"
  },
  {
    id: 7,
    serviceDate: "5/15/2025",
    serviceType: "Licensed Speech & Lang Pathologist",
    startTime: "11:30am",
    duration: "30 min",
    comments: "Student Response: test test test test",
    status: "approved"
  }
]

export default function SupervisorLogsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedPractitioner, setSelectedPractitioner] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedLogs, setSelectedLogs] = useState<number[]>([])
  const [approvedDate, setApprovedDate] = useState("")
  const [comments, setComments] = useState("")

  // Check if we're in detail view
  const practitionerId = searchParams.get('practitioner')
  const studentId = searchParams.get('student')

  const filteredPractitioners = mockPractitionerData.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Flatten the data for sorting by practitioner-student pairs
  const practitionerStudentPairs = filteredPractitioners.flatMap(practitioner => 
    practitioner.students.map(student => ({
      ...student,
      practitionerName: practitioner.name,
      practitionerId: practitioner.id
    }))
  )
  
  const { sortedData: sortedPractitionerStudents, getSortIcon: getPractitionerSortIcon, getSortableHeaderProps: getPractitionerSortableHeaderProps } = useTableSorting(
    practitionerStudentPairs,
    "practitionerName",
    "asc"
  )
  
  const { sortedData: sortedSupervisionLogs, getSortIcon: getLogsSortIcon, getSortableHeaderProps: getLogsSortableHeaderProps } = useTableSorting(
    mockSupervisionLogs,
    "serviceDate",
    "desc"
  )

  const handlePractitionerClick = (practitioner: any, student: any) => {
    setSelectedPractitioner(practitioner)
    setSelectedStudent(student)
    router.push(`/student-services/supervisor-logs?practitioner=${practitioner.id}&student=${student.id}`)
  }

  const handleBackToList = () => {
    setSelectedPractitioner(null)
    setSelectedStudent(null)
    router.push('/student-services/supervisor-logs')
  }

  const handleLogSelect = (logId: number) => {
    setSelectedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    )
  }

  const handleSelectAll = () => {
    if (selectedLogs.length === mockSupervisionLogs.length) {
      setSelectedLogs([])
    } else {
      setSelectedLogs(mockSupervisionLogs.map(log => log.id))
    }
  }

  const handleSaveAndNext = () => {
    // Save current logs and move to next student
    console.log("Saving logs:", selectedLogs, "Approved date:", approvedDate, "Comments:", comments)
    // In a real app, this would save to API and navigate to next student
    alert("Logs saved! Moving to next student...")
  }

  const handleSaveAndReturn = () => {
    // Save current logs and return to list
    console.log("Saving logs:", selectedLogs, "Approved date:", approvedDate, "Comments:", comments)
    // In a real app, this would save to API
    alert("Logs saved!")
    handleBackToList()
  }

  // Detail view for supervision logs
  if (practitionerId && studentId) {
    const practitioner = mockPractitionerData.find(p => p.id === parseInt(practitionerId))
    const student = practitioner?.students.find(s => s.id === parseInt(studentId))

    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-teal-800">Supervision Logs</h1>
        </div>

        {/* Provider and Student Info */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Provider:</Label>
              <p className="font-semibold">{practitioner?.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Student:</Label>
              <p className="font-semibold">{student?.name}</p>
            </div>
          </div>
        </div>

        {/* Service Logs Table */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedLogs.length === mockSupervisionLogs.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-blue-100"
                    {...getLogsSortableHeaderProps("serviceDate")}
                  >
                    <div className="flex items-center gap-1">
                      Service Date
                      {(() => {
                        const { icon: Icon, className } = getLogsSortIcon("serviceDate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-blue-100"
                    {...getLogsSortableHeaderProps("serviceType")}
                  >
                    <div className="flex items-center gap-1">
                      Service Type
                      {(() => {
                        const { icon: Icon, className } = getLogsSortIcon("serviceType")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-blue-100"
                    {...getLogsSortableHeaderProps("startTime")}
                  >
                    <div className="flex items-center gap-1">
                      Start Time
                      {(() => {
                        const { icon: Icon, className } = getLogsSortIcon("startTime")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-blue-100"
                    {...getLogsSortableHeaderProps("duration")}
                  >
                    <div className="flex items-center gap-1">
                      Duration
                      {(() => {
                        const { icon: Icon, className } = getLogsSortIcon("duration")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-blue-100"
                    {...getLogsSortableHeaderProps("comments")}
                  >
                    <div className="flex items-center gap-1">
                      Comments
                      {(() => {
                        const { icon: Icon, className } = getLogsSortIcon("comments")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-blue-100"
                    {...getLogsSortableHeaderProps("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {(() => {
                        const { icon: Icon, className } = getLogsSortIcon("status")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSupervisionLogs.map((log) => (
                  <TableRow key={log.id} className={selectedLogs.includes(log.id) ? "bg-blue-50" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedLogs.includes(log.id)}
                        onCheckedChange={() => handleLogSelect(log.id)}
                      />
                    </TableCell>
                    <TableCell>{log.serviceDate}</TableCell>
                    <TableCell>{log.serviceType}</TableCell>
                    <TableCell>{log.startTime}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>{log.comments}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          log.status === "approved" ? "default" : 
                          log.status === "denied" ? "destructive" : 
                          "secondary"
                        }
                        className={
                          log.status === "approved" ? "bg-green-100 text-green-800 border-green-200" :
                          log.status === "denied" ? "bg-red-100 text-red-800 border-red-200" :
                          "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Approval Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="approvedDate" className="text-sm font-medium">
                  Approved Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="approvedDate"
                  type="date"
                  value={approvedDate}
                  onChange={(e) => setApprovedDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="comments" className="text-sm font-medium">
                  Comments <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="mt-1 min-h-[100px]"
                  placeholder="Enter supervision comments..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  onClick={handleSaveAndNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save and go to next student
                </Button>
                <Button 
                  onClick={handleSaveAndReturn}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Save and return to list
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main list view
  return (
    <div className="p-6">
      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4 mb-6">
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="fruitvale">Fruitvale</SelectItem>
            <SelectItem value="oakland">Oakland</SelectItem>
            <SelectItem value="san-jose">San Jose</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="flex items-center gap-2">
          <MoreHorizontal className="h-4 w-4" />
          Order by
        </Button>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Practitioners Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead 
                  className="cursor-pointer hover:bg-blue-100"
                  {...getPractitionerSortableHeaderProps("practitionerName")}
                >
                  <div className="flex items-center gap-1">
                    Practitioner
                    {(() => {
                      const { icon: Icon, className } = getPractitionerSortIcon("practitionerName")
                      return <Icon className={className} />
                    })()}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-blue-100"
                  {...getPractitionerSortableHeaderProps("name")}
                >
                  <div className="flex items-center gap-1">
                    Student
                    {(() => {
                      const { icon: Icon, className } = getPractitionerSortIcon("name")
                      return <Icon className={className} />
                    })()}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-blue-100"
                  {...getPractitionerSortableHeaderProps("ssid")}
                >
                  <div className="flex items-center gap-1">
                    SSID
                    {(() => {
                      const { icon: Icon, className } = getPractitionerSortIcon("ssid")
                      return <Icon className={className} />
                    })()}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-blue-100"
                  {...getPractitionerSortableHeaderProps("dob")}
                >
                  <div className="flex items-center gap-1">
                    DOB
                    {(() => {
                      const { icon: Icon, className } = getPractitionerSortIcon("dob")
                      return <Icon className={className} />
                    })()}
                  </div>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPractitionerStudents.map((studentData) => (
                <TableRow 
                  key={`${studentData.practitionerId}-${studentData.id}`}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    const practitioner = { id: studentData.practitionerId, name: studentData.practitionerName }
                    const student = { id: studentData.id, name: studentData.name }
                    handlePractitionerClick(practitioner, student)
                  }}
                >
                  <TableCell className="font-medium">
                    <Link 
                      href={`/student-services/supervisor-logs?practitioner=${studentData.practitionerId}&student=${studentData.id}`}
                      className="text-teal-600 hover:underline"
                    >
                      {studentData.practitionerName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`/manage-students/${studentData.id}`}
                      className="text-teal-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {studentData.name}
                    </Link>
                  </TableCell>
                  <TableCell>{studentData.ssid}</TableCell>
                  <TableCell>{studentData.dob}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("More options for", studentData.practitionerName, studentData.name)
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredPractitioners.reduce((acc, p) => acc + p.students.length, 0)} entries
      </div>
    </div>
  )
}
