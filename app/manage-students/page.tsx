"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Filter, ArrowUpDown, Plus, Upload, FileText, CheckCircle, XCircle, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTableSorting } from "@/hooks/use-table-sorting"

// Mock data for students
const mockStudents = [
  { id: 1, lastName: "Greenfield", firstName: "Samantha", ssid: "43063894", localId: "11539764", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "456-715-3852", status: "Active", modifiedDate: "5/1/2025" },
  { id: 2, lastName: "Hermann", firstName: "Linda", ssid: "89200548", localId: "09772730", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "808-696-4488", status: "Active", modifiedDate: "5/1/2025" },
  { id: 3, lastName: "Hartmann", firstName: "Jackie", ssid: "54916084", localId: "18067794", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "279-940-2099", status: "Active", modifiedDate: "5/1/2025" },
  { id: 4, lastName: "Mann", firstName: "Silvia", ssid: "31647458", localId: "12353366", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "871-271-5559", status: "Active", modifiedDate: "5/1/2025" },
  { id: 5, lastName: "Gulgowski", firstName: "Zachary", ssid: "41009025", localId: "33841572", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "654-290-5697", status: "Active", modifiedDate: "5/1/2025" },
  { id: 6, lastName: "Labadie", firstName: "Billie", ssid: "90900066", localId: "51157323", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "316-602-3549", status: "Active", modifiedDate: "5/1/2025" },
  { id: 7, lastName: "Conroy", firstName: "Angelica", ssid: "36601642", localId: "75820000", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "558-850-9231", status: "Active", modifiedDate: "5/1/2025" },
  { id: 8, lastName: "Reynolds", firstName: "Leonard", ssid: "53226014", localId: "18943019", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "817-289-8199", status: "Active", modifiedDate: "5/1/2025" },
  { id: 9, lastName: "Jacobi", firstName: "Rolando", ssid: "15706860", localId: "34529790", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "717-747-6452", status: "Active", modifiedDate: "5/1/2025" },
  { id: 10, lastName: "Wyman", firstName: "Matt", ssid: "64372805", localId: "84706572", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "316-844-7189", status: "Inactive", modifiedDate: "5/1/2025" },
  { id: 11, lastName: "Deckow", firstName: "Jody", ssid: "01258369", localId: "21537095", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "860-952-4302", status: "Inactive", modifiedDate: "5/1/2025" },
  { id: 12, lastName: "Koelpin", firstName: "Jason", ssid: "74640060", localId: "41676362", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "765-944-7904", status: "Inactive", modifiedDate: "5/1/2025" },
  { id: 13, lastName: "Marks", firstName: "Douglas", ssid: "26102631", localId: "29758053", district: "Fruitvale", school: "Fruitvale", birthdate: "10/25/1999", contactNumber: "936-551-5653", status: "Inactive", modifiedDate: "5/1/2025" },
]

// Mock data for upload history
const mockUploadHistory = [
  { id: 1, fileName: "students_batch_1.xlsx", uploadDate: "5/1/2025 10:30 AM", uploadedBy: "John Admin", recordsProcessed: 45, recordsSuccessful: 43, recordsFailed: 2, status: "Completed" },
  { id: 2, fileName: "fruitvale_students_may.csv", uploadDate: "4/28/2025 2:15 PM", uploadedBy: "Jane Smith", recordsProcessed: 78, recordsSuccessful: 78, recordsFailed: 0, status: "Completed" },
  { id: 3, fileName: "student_data_update.xlsx", uploadDate: "4/25/2025 9:45 AM", uploadedBy: "Mike Johnson", recordsProcessed: 23, recordsSuccessful: 20, recordsFailed: 3, status: "Completed" },
  { id: 4, fileName: "new_enrollments.csv", uploadDate: "4/24/2025 11:20 AM", uploadedBy: "Sarah Wilson", recordsProcessed: 12, recordsSuccessful: 0, recordsFailed: 12, status: "Failed" },
  { id: 5, fileName: "student_import_april.xlsx", uploadDate: "4/20/2025 3:00 PM", uploadedBy: "John Admin", recordsProcessed: 156, recordsSuccessful: 156, recordsFailed: 0, status: "Completed" },
]

export default function ManageStudentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.ssid.includes(searchTerm) ||
      student.localId.includes(searchTerm) ||
      student.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contactNumber.includes(searchTerm)

    const matchesTab = activeTab === "all" || student.status.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch && matchesTab
  })

  const { sortedData, getSortIcon, getSortableHeaderProps } = useTableSorting(
    filteredStudents,
    "lastName",
    "asc"
  )

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === "Active" ? "default" : "secondary"}
        className={status === "Active" ? "bg-teal-100 text-teal-800 hover:bg-teal-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
      >
        {status}
      </Badge>
    )
  }

  const getUploadStatusBadge = (status: string) => {
    const statusConfig = {
      "Completed": { 
        variant: "default" as const, 
        className: "bg-green-100 text-green-800 hover:bg-green-200",
        icon: <CheckCircle className="w-3 h-3 mr-1" />
      },
      "Failed": { 
        variant: "destructive" as const, 
        className: "bg-red-100 text-red-800 hover:bg-red-200",
        icon: <XCircle className="w-3 h-3 mr-1" />
      },
      "Processing": { 
        variant: "secondary" as const, 
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        icon: <Clock className="w-3 h-3 mr-1" />
      }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Processing
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.icon}
        {status}
      </Badge>
    )
  }

  const handleIndividualAdd = () => {
    router.push("/manage-students/search")
  }

  const handleBulkAdd = () => {
    router.push("/manage-students/bulk-add")
  }

  const handleStudentAction = (action: string, studentId: number) => {
    if (action === "view") {
      router.push(`/manage-students/${studentId}`)
    } else {
      // TODO: Implement other student actions
      console.log(`${action} student ${studentId}`)
    }
  }

  const handleStudentClick = (studentId: number) => {
    router.push(`/manage-students/${studentId}`)
  }

  // handleSort is now handled by the useTableSorting hook

  const getTabCount = (status: string) => {
    if (status === "all") return mockStudents.length
    if (status === "upload-history") return mockUploadHistory.length
    return mockStudents.filter(student => student.status.toLowerCase() === status.toLowerCase()).length
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-800">Manage Students</h1>
        <div className="flex gap-3">
          <Button onClick={handleIndividualAdd} variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
            Individually Add
          </Button>
          <Button onClick={handleBulkAdd} className="bg-teal-600 hover:bg-teal-700">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Add
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs and Controls Row */}
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">
              All Students ({getTabCount("all")})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({getTabCount("active")})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({getTabCount("inactive")})
            </TabsTrigger>
            <TabsTrigger value="upload-history">
              Upload History ({getTabCount("upload-history")})
            </TabsTrigger>
          </TabsList>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        {/* Students Table Content */}
        <TabsContent value="all" className="mt-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("lastName")}
                  >
                    <div className="flex items-center gap-1">
                      Last Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("lastName")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("firstName")}
                  >
                    <div className="flex items-center gap-1">
                      First Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("firstName")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("ssid")}
                  >
                    <div className="flex items-center gap-1">
                      SSID
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("ssid")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("localId")}
                  >
                    <div className="flex items-center gap-1">
                      Local ID
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("localId")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("district")}
                  >
                    <div className="flex items-center gap-1">
                      District
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("district")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("school")}
                  >
                    <div className="flex items-center gap-1">
                      School
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("school")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("birthdate")}
                  >
                    <div className="flex items-center gap-1">
                      Birthdate
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("birthdate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("contactNumber")}
                  >
                    <div className="flex items-center gap-1">
                      Contact Number
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("contactNumber")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("status")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("modifiedDate")}
                  >
                    <div className="flex items-center gap-1">
                      Modified Date
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("modifiedDate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <button 
                        onClick={() => handleStudentClick(student.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {student.lastName}
                      </button>
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleStudentClick(student.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {student.firstName}
                      </button>
                    </TableCell>
                    <TableCell>{student.ssid}</TableCell>
                    <TableCell>{student.localId}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>{student.school}</TableCell>
                    <TableCell>{student.birthdate}</TableCell>
                    <TableCell>{student.contactNumber}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.modifiedDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStudentAction("view", student.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentAction("edit", student.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentAction("deactivate", student.id)}>
                            {student.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("lastName")}
                  >
                    <div className="flex items-center gap-1">
                      Last Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("lastName")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("firstName")}
                  >
                    <div className="flex items-center gap-1">
                      First Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("firstName")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("ssid")}
                  >
                    <div className="flex items-center gap-1">
                      SSID
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("ssid")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("localId")}
                  >
                    <div className="flex items-center gap-1">
                      Local ID
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("localId")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("district")}
                  >
                    <div className="flex items-center gap-1">
                      District
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("district")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("school")}
                  >
                    <div className="flex items-center gap-1">
                      School
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("school")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("birthdate")}
                  >
                    <div className="flex items-center gap-1">
                      Birthdate
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("birthdate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("contactNumber")}
                  >
                    <div className="flex items-center gap-1">
                      Contact Number
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("contactNumber")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("status")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("modifiedDate")}
                  >
                    <div className="flex items-center gap-1">
                      Modified Date
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("modifiedDate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.filter((student: any) => student.status === "Active").map((student: any) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <button 
                        onClick={() => handleStudentClick(student.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {student.lastName}
                      </button>
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleStudentClick(student.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {student.firstName}
                      </button>
                    </TableCell>
                    <TableCell>{student.ssid}</TableCell>
                    <TableCell>{student.localId}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>{student.school}</TableCell>
                    <TableCell>{student.birthdate}</TableCell>
                    <TableCell>{student.contactNumber}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.modifiedDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStudentAction("view", student.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentAction("edit", student.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentAction("deactivate", student.id)}>
                            {student.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("lastName")}
                  >
                    <div className="flex items-center gap-1">
                      Last Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("lastName")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("firstName")}
                  >
                    <div className="flex items-center gap-1">
                      First Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("firstName")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("ssid")}
                  >
                    <div className="flex items-center gap-1">
                      SSID
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("ssid")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("localId")}
                  >
                    <div className="flex items-center gap-1">
                      Local ID
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("localId")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("district")}
                  >
                    <div className="flex items-center gap-1">
                      District
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("district")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("school")}
                  >
                    <div className="flex items-center gap-1">
                      School
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("school")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("birthdate")}
                  >
                    <div className="flex items-center gap-1">
                      Birthdate
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("birthdate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("contactNumber")}
                  >
                    <div className="flex items-center gap-1">
                      Contact Number
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("contactNumber")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("status")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("modifiedDate")}
                  >
                    <div className="flex items-center gap-1">
                      Modified Date
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("modifiedDate")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.filter((student: any) => student.status === "Inactive").map((student: any) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <button 
                        onClick={() => handleStudentClick(student.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {student.lastName}
                      </button>
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleStudentClick(student.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {student.firstName}
                      </button>
                    </TableCell>
                    <TableCell>{student.ssid}</TableCell>
                    <TableCell>{student.localId}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>{student.school}</TableCell>
                    <TableCell>{student.birthdate}</TableCell>
                    <TableCell>{student.contactNumber}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.modifiedDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStudentAction("view", student.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentAction("edit", student.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStudentAction("deactivate", student.id)}>
                            {student.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        {/* Upload History Tab Content */}
        <TabsContent value="upload-history" className="mt-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">File Name</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUploadHistory.map((upload) => (
                  <TableRow key={upload.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-500" />
                        {upload.fileName}
                      </div>
                    </TableCell>
                    <TableCell>{upload.uploadDate}</TableCell>
                    <TableCell>{upload.uploadedBy}</TableCell>
                    <TableCell>{getUploadStatusBadge(upload.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Download Report
                          </DropdownMenuItem>
                          {upload.recordsFailed > 0 && (
                            <DropdownMenuItem>
                              View Errors
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {mockUploadHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No upload history found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
