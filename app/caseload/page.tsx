"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Users, 
  Calendar, 
  UserPlus,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  X
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for caseload students
const mockCaseloadStudents = [
  { id: 1, ssid: "43063894", lastName: "Greenfield", firstName: "Samantha", practitioner: "Bradley Brown", district: "Fruitvale", birthdate: "10/25/1999", gender: "Female", status: "Active" },
  { id: 2, ssid: "89200548", lastName: "Hermann", firstName: "Linda", practitioner: "Luis Hayes", district: "Fruitvale", birthdate: "10/25/1999", gender: "Female", status: "Active" },
  { id: 3, ssid: "54916084", lastName: "Hartmann", firstName: "Jackie", practitioner: "Luis Hayes", district: "Fruitvale", birthdate: "10/25/1999", gender: "Female", status: "Active" },
  { id: 4, ssid: "31647458", lastName: "Mann", firstName: "Silvia", practitioner: "Luis Hayes", district: "Fruitvale", birthdate: "10/25/1999", gender: "Female", status: "Active" },
  { id: 5, ssid: "41009025", lastName: "Gulgowski", firstName: "Zachary", practitioner: "Bradley Brown", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Active" },
  { id: 6, ssid: "90900066", lastName: "Labadie", firstName: "Billie", practitioner: "Bradley Brown", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Active" },
  { id: 7, ssid: "36601642", lastName: "Conroy", firstName: "Angelica", practitioner: "Bradley Brown", district: "Fruitvale", birthdate: "10/25/1999", gender: "Female", status: "Active" },
  { id: 8, ssid: "53226014", lastName: "Reynolds", firstName: "Leonard", practitioner: "Teri Lakin", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Active" },
  { id: 9, ssid: "15706860", lastName: "Jacobi", firstName: "Rolando", practitioner: "Teri Lakin", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Active" },
  { id: 10, ssid: "64372805", lastName: "Wyman", firstName: "Matt", practitioner: "Bradley Brown", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Inactive" },
  { id: 11, ssid: "01258369", lastName: "Deckow", firstName: "Jody", practitioner: "Teri Lakin", district: "Fruitvale", birthdate: "10/25/1999", gender: "Female", status: "Inactive" },
  { id: 12, ssid: "74640060", lastName: "Koelpin", firstName: "Jason", practitioner: "Teri Lakin", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Inactive" },
  { id: 13, ssid: "26102631", lastName: "Marks", firstName: "Douglas", practitioner: "Bradley Brown", district: "Fruitvale", birthdate: "10/25/1999", gender: "Male", status: "Inactive" },
]

// Mock data for groups
const mockGroups = [
  {
    id: 1,
    name: "Monday AM",
    students: [
      { ssid: "96759512", name: "Philip Shields", district: "Fruitvale" },
      { ssid: "98587232", name: "Georgia Fritsch", district: "Fruitvale" }
    ]
  },
  {
    id: 2,
    name: "Tuesday PM",
    students: [
      { ssid: "43063894", name: "Samantha Greenfield", district: "Fruitvale" },
      { ssid: "84434944", name: "Nicole Walker", district: "Fruitvale" },
      { ssid: "87252120", name: "Frank Abernathy", district: "Arvin" }
    ]
  }
]

// Mock data for available students to add to caseload
const mockAvailableStudents = [
  { ssid: "60318220", localId: "84434944", name: "Nicole Walker", district: "Fruitvale", school: "Fruitvale", dob: "1/2/1999" },
  { ssid: "65309041", localId: "54256076", name: "Jamie Barton", district: "Fruitvale", school: "Fruitvale", dob: "2/3/1999" },
  { ssid: "66233084", localId: "45949189", name: "Betsy Satterfield", district: "Arvin", school: "Fruitvale", dob: "2/6/2000" },
  { ssid: "04793824", localId: "48001679", name: "Roberto Hyatt", district: "Lamont", school: "Fruitvale", dob: "3/5/2000" },
  { ssid: "60200556", localId: "63731224", name: "Cecilia Corkery", district: "Lamont", school: "Fruitvale", dob: "6/2/1998" },
  { ssid: "50549712", localId: "83157301", name: "Joann Lubowitz", district: "Kernville", school: "Fruitvale", dob: "6/15/2000" },
  { ssid: "76253606", localId: "43007583", name: "Marshall Weber", district: "Di Giorgio", school: "Fruitvale", dob: "6/8/1999" },
  { ssid: "54102726", localId: "19879267", name: "Jodi Welch", district: "Di Giorgio", school: "Fruitvale", dob: "5/5/1999" },
]

export default function CaseloadPage() {
  const [activeTab, setActiveTab] = useState("caseload")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [expandedGroups, setExpandedGroups] = useState<number[]>([1, 2])
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isAddToCaseloadOpen, setIsAddToCaseloadOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [groupParticipants, setGroupParticipants] = useState<string[]>([])
  const [availableStudentsForGroup, setAvailableStudentsForGroup] = useState(mockAvailableStudents)
  const [caseloadStudents, setCaseloadStudents] = useState<string[]>([])
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [actualCaseload, setActualCaseload] = useState<typeof mockCaseloadStudents>(mockCaseloadStudents)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["caseload", "groups"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const filteredStudents = actualCaseload.filter((student) => {
    const matchesSearch = 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.ssid.includes(searchTerm) ||
      student.practitioner.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDistrict = selectedDistrict === "all" || student.district.toLowerCase() === selectedDistrict.toLowerCase()

    return matchesSearch && matchesDistrict
  })

  const dismissNotification = () => {
    setShowSuccessNotification(false)
  }

  const handleStudentSelect = (ssid: string) => {
    setSelectedStudents(prev => 
      prev.includes(ssid) 
        ? prev.filter(id => id !== ssid)
        : [...prev, ssid]
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(student => student.ssid))
    } else {
      setSelectedStudents([])
    }
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === "Active" ? "default" : "secondary"}
        className={status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
      >
        {status}
      </Badge>
    )
  }

  const handleCreateGroup = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student to create a group")
      return
    }
    setIsCreateGroupOpen(true)
  }

  const handleScheduleService = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student to schedule a service")
      return
    }
    router.push("/caseload/schedule-service")
  }

  const handleAddToCaseload = () => {
    setIsAddToCaseloadOpen(true)
  }

  const toggleGroupExpansion = (groupId: number) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const handleAddToGroup = (ssid: string) => {
    if (groupParticipants.includes(ssid)) {
      setGroupParticipants(prev => prev.filter(id => id !== ssid))
    } else {
      setGroupParticipants(prev => [...prev, ssid])
    }
  }

  const handleAddToCaseloadStudent = (ssid: string) => {
    if (caseloadStudents.includes(ssid)) {
      setCaseloadStudents(prev => prev.filter(id => id !== ssid))
    } else {
      setCaseloadStudents(prev => [...prev, ssid])
    }
  }

  const createGroup = () => {
    if (!newGroupName.trim()) {
      alert("Please enter a group name")
      return
    }
    // TODO: Implement group creation
    console.log("Creating group:", newGroupName, "with participants:", groupParticipants)
    setIsCreateGroupOpen(false)
    setNewGroupName("")
    setGroupParticipants([])
  }

  const addStudentsToCaseload = () => {
    if (caseloadStudents.length === 0) {
      alert("Please select at least one student to add to caseload")
      return
    }
    
    // Add selected students to the actual caseload
    const studentsToAdd = mockAvailableStudents.filter(student => 
      caseloadStudents.includes(student.ssid)
    )
    
    const newCaseloadEntries = studentsToAdd.map((student, index) => ({
      id: actualCaseload.length + index + 1,
      ssid: student.ssid,
      lastName: student.name.split(' ').slice(-1)[0],
      firstName: student.name.split(' ').slice(0, -1).join(' '),
      practitioner: "Bradley Brown", // Default practitioner
      district: student.district,
      birthdate: student.dob,
      gender: "Unknown", // Would need to be determined
      status: "Active"
    }))
    
    // Update the actual caseload
    setActualCaseload(prev => [...prev, ...newCaseloadEntries])
    
    // Show success notification
    const studentCount = caseloadStudents.length
    const message = studentCount === 1 
      ? `1 student successfully added to caseload!`
      : `${studentCount} students successfully added to caseload!`
    
    setNotificationMessage(message)
    setShowSuccessNotification(true)
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowSuccessNotification(false)
    }, 5000)
    
    // Close dialog and reset state
    setIsAddToCaseloadOpen(false)
    setCaseloadStudents([])
  }

  return (
    <div className="p-6">
      {/* Success Notification Banner */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-green-800 font-medium">{notificationMessage}</p>
          </div>
          <button 
            onClick={dismissNotification}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold text-[#000000] mb-6">Caseload</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-2 w-auto">
            <TabsTrigger value="caseload" className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white">
              Caseload
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white">
              Groups
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <Button 
              onClick={handleCreateGroup}
              variant="outline" 
              className="border-[#4286f4] text-[#4286f4] hover:bg-[#4286f4] hover:text-white"
              disabled={activeTab === "caseload" && selectedStudents.length === 0}
            >
              <Users className="w-4 h-4 mr-2" />
              Create a group
            </Button>
            <Button 
              onClick={handleScheduleService}
              variant="outline" 
              className="border-[#4286f4] text-[#4286f4] hover:bg-[#4286f4] hover:text-white"
              disabled={activeTab === "caseload" && selectedStudents.length === 0}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule service
            </Button>
            <Button 
              onClick={handleAddToCaseload}
              className="bg-[#4286f4] hover:bg-[#3275e3]"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add to caseload
            </Button>
          </div>
        </div>

        <TabsContent value="caseload" className="mt-0">
          {/* Filters and Search */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="fruitvale">Fruitvale</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Order by
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Students Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">SSID</TableHead>
                  <TableHead className="font-semibold">Last Name</TableHead>
                  <TableHead className="font-semibold">First Name</TableHead>
                  <TableHead className="font-semibold">Practitioner</TableHead>
                  <TableHead className="font-semibold">District</TableHead>
                  <TableHead className="font-semibold">Birthdate</TableHead>
                  <TableHead className="font-semibold">Gender</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(student.ssid)}
                        onCheckedChange={() => handleStudentSelect(student.ssid)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{student.ssid}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.practitioner}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>{student.birthdate}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Service</DropdownMenuItem>
                          <DropdownMenuItem>Remove from Caseload</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="mt-0">
          <div className="space-y-4">
            {mockGroups.map((group) => (
              <Card key={group.id} className="border">
                <CardHeader 
                  className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
                  onClick={() => toggleGroupExpansion(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
                    {expandedGroups.includes(group.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </CardHeader>
                {expandedGroups.includes(group.id) && (
                  <CardContent className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-100">
                          <TableHead className="font-semibold">SSID</TableHead>
                          <TableHead className="font-semibold">Student Name</TableHead>
                          <TableHead className="font-semibold">District</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.students.map((student, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{student.ssid}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.district}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Group Dialog */}
      <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create group</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="groupName">Group Name *</Label>
              <Input
                id="groupName"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Caseload</h3>
                <div className="border rounded-lg bg-blue-50 max-h-64 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-100">
                        <TableHead className="font-semibold">SSID</TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">District</TableHead>
                        <TableHead className="w-16"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableStudentsForGroup.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{student.ssid}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.district}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAddToGroup(student.ssid)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Group Participants</h3>
                <div className="border rounded-lg bg-blue-50 max-h-64 overflow-y-auto">
                  {groupParticipants.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No Participants
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-100">
                          <TableHead className="font-semibold">SSID</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">District</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupParticipants.map((ssid) => {
                          const student = availableStudentsForGroup.find(s => s.ssid === ssid)
                          return student ? (
                            <TableRow key={ssid}>
                              <TableCell className="font-medium">{student.ssid}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.district}</TableCell>
                            </TableRow>
                          ) : null
                        })}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={createGroup} className="bg-[#4286f4] hover:bg-[#3275e3]">
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add to Caseload Dialog */}
      <Dialog open={isAddToCaseloadOpen} onOpenChange={setIsAddToCaseloadOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add to Caseload</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Search for student</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Select defaultValue="district">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="district">District</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="ssid">SSID</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex-1 relative">
                      <Input placeholder="Search" className="pr-12" />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    <Button className="bg-[#4286f4] hover:bg-[#3275e3]">Search</Button>
                  </div>
                  
                  <div className="border rounded-lg max-h-64 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">SSID</TableHead>
                          <TableHead className="font-semibold">Local ID</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">District</TableHead>
                          <TableHead className="font-semibold">School</TableHead>
                          <TableHead className="font-semibold">DOB</TableHead>
                          <TableHead className="w-16"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAvailableStudents.map((student, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{student.ssid}</TableCell>
                            <TableCell>{student.localId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.district}</TableCell>
                            <TableCell>{student.school}</TableCell>
                            <TableCell>{student.dob}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAddToCaseloadStudent(student.ssid)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Add
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Current Caseload</h3>
                <div className="border rounded-lg max-h-64 overflow-y-auto">
                  {caseloadStudents.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No students selected
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">SSID</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">District</TableHead>
                          <TableHead className="w-16"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {caseloadStudents.map((ssid) => {
                          const student = mockAvailableStudents.find(s => s.ssid === ssid)
                          return student ? (
                            <TableRow key={ssid}>
                              <TableCell className="font-medium">{student.ssid}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.district}</TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAddToCaseloadStudent(student.ssid)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ) : null
                        })}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <Button 
                onClick={addStudentsToCaseload} 
                className="bg-[#4286f4] hover:bg-[#3275e3]"
                disabled={caseloadStudents.length === 0}
              >
                Save ({caseloadStudents.length} student{caseloadStudents.length !== 1 ? 's' : ''})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
