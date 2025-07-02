"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
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
  const [expandedGroups, setExpandedGroups] = useState<number[]>([1, 2])
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [groupParticipants, setGroupParticipants] = useState<string[]>([])
  const [availableStudentsForGroup, setAvailableStudentsForGroup] = useState(mockAvailableStudents)
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

    return matchesSearch
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
        className={status === "Active" ? "bg-teal-100 text-teal-800 hover:bg-teal-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
      >
        {status}
      </Badge>
    )
  }

  const handleCreateGroup = () => {
    // Pre-populate with currently selected students if any
    setGroupParticipants(selectedStudents)
    setIsCreateGroupOpen(true)
  }

  const handleScheduleService = () => {
    router.push("/caseload/schedule-service")
  }

  const handleAddToCaseload = () => {
    router.push("/educlaim-database")
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



  const createGroup = () => {
    if (!newGroupName.trim()) {
      alert("Please enter a group name")
      return
    }
    if (groupParticipants.length === 0) {
      alert("Please select at least one student for the group")
      return
    }

    // Create the group (in a real app, this would call an API)
    console.log("Creating group:", { name: newGroupName, participants: groupParticipants })
    
    // Reset form
    setNewGroupName("")
    setGroupParticipants([])
    setIsCreateGroupOpen(false)
    
    // Show success notification
    setNotificationMessage(`Group "${newGroupName}" created successfully!`)
    setShowSuccessNotification(true)
  }



  return (
    <div className="p-6">
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>{notificationMessage}</span>
              <button
                onClick={dismissNotification}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-teal-800 mb-6">Caseload</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="caseload">
              Caseload
            </TabsTrigger>
            <TabsTrigger value="groups">
              Groups
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            {/* Search and Filter - only show for caseload tab */}
            {activeTab === "caseload" && (
              <>
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
                
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
              </>
            )}
            
            <Button 
              onClick={handleCreateGroup}
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Create a group
            </Button>
            <Button 
              onClick={handleScheduleService}
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule service
            </Button>
            <Button 
              onClick={handleAddToCaseload}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add to caseload
            </Button>
          </div>
        </div>
        
        <TabsContent value="caseload" className="mt-0">

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
                    <TableCell>
                      <Link href={`/manage-students/${student.id}`} className="text-teal-600 hover:underline">
                        {student.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/manage-students/${student.id}`} className="text-teal-600 hover:underline">
                        {student.firstName}
                      </Link>
                    </TableCell>
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
              <Card key={group.id} className="border border-teal-200">
                <CardHeader 
                  className="cursor-pointer bg-teal-50 hover:bg-teal-100 transition-colors"
                  onClick={() => toggleGroupExpansion(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-teal-800">{group.name}</CardTitle>
                    {expandedGroups.includes(group.id) ? (
                      <ChevronUp className="w-5 h-5 text-teal-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-teal-600" />
                    )}
                  </div>
                </CardHeader>
                {expandedGroups.includes(group.id) && (
                  <CardContent className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-teal-50">
                          <TableHead className="font-semibold text-teal-800">SSID</TableHead>
                          <TableHead className="font-semibold text-teal-800">Student Name</TableHead>
                          <TableHead className="font-semibold text-teal-800">District</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.students.map((student, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{student.ssid}</TableCell>
                            <TableCell>
                              <Link href={`/manage-students/1`} className="text-teal-600 hover:underline">
                                {student.name}
                              </Link>
                            </TableCell>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Add Students to Group</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const allCaseloadSSIDs = actualCaseload.map(student => student.ssid)
                    setGroupParticipants(allCaseloadSSIDs)
                  }}
                  className="text-teal-600 border-teal-300 hover:bg-teal-50"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Add Current Caseload
                </Button>
              </div>
              <div className="mt-2 max-h-60 overflow-y-auto border rounded p-2">
                {availableStudentsForGroup.map((student) => (
                  <div key={student.ssid} className="flex items-center space-x-2 p-2 hover:bg-gray-50">
                    <Checkbox
                      checked={groupParticipants.includes(student.ssid)}
                      onCheckedChange={() => handleAddToGroup(student.ssid)}
                    />
                    <div className="flex-1">
                      <span className="font-medium">{student.name}</span>
                      <span className="text-sm text-gray-500 ml-2">SSID: {student.ssid}</span>
                    </div>
                    <Badge variant="outline">{student.district}</Badge>
                  </div>
                ))}
                {/* Add current caseload students */}
                {actualCaseload.map((student) => (
                  <div key={student.ssid} className="flex items-center space-x-2 p-2 hover:bg-gray-50">
                    <Checkbox
                      checked={groupParticipants.includes(student.ssid)}
                      onCheckedChange={() => handleAddToGroup(student.ssid)}
                    />
                    <div className="flex-1">
                      <span className="font-medium">{student.firstName} {student.lastName}</span>
                      <span className="text-sm text-gray-500 ml-2">SSID: {student.ssid}</span>
                    </div>
                    <Badge variant="outline">{student.district}</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createGroup} className="bg-teal-600 hover:bg-teal-700">
                Create Group
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  )
}
