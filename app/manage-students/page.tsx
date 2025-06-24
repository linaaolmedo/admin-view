"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Filter, ArrowUpDown, Plus, Upload } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export default function ManageStudentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("lastName")
  const [sortOrder, setSortOrder] = useState("asc")
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
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]
    
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

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

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const getTabCount = (status: string) => {
    if (status === "all") return mockStudents.length
    return mockStudents.filter(student => student.status.toLowerCase() === status.toLowerCase()).length
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
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
        <TabsList className="grid grid-cols-3 w-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            All Students ({getTabCount("all")})
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Active ({getTabCount("active")})
          </TabsTrigger>
          <TabsTrigger value="inactive" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Inactive ({getTabCount("inactive")})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {/* Filters and Search */}
          <div className="flex justify-end items-center gap-4 mb-4">
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

          {/* Students Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("lastName")}
                  >
                    <div className="flex items-center">
                      Last Name
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("firstName")}
                  >
                    <div className="flex items-center">
                      First Name
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">SSID</TableHead>
                  <TableHead className="font-semibold">Local ID</TableHead>
                  <TableHead className="font-semibold">District</TableHead>
                  <TableHead className="font-semibold">School</TableHead>
                  <TableHead className="font-semibold">Birthdate</TableHead>
                  <TableHead className="font-semibold">Contact Number</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Modified Date</TableHead>
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
      </Tabs>
    </div>
  )
}
