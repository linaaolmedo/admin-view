"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Search, X } from "lucide-react"

// Mock data for available students to search
const mockAvailableStudents = [
  { ssid: "60318220", localId: "84434944", name: "Nicole Walker", district: "Fruitvale", school: "Fruitvale", dob: "1/2/1999" },
  { ssid: "65309041", localId: "54256076", name: "Jamie Barton", district: "Fruitvale", school: "Fruitvale", dob: "2/3/1999" },
  { ssid: "66233084", localId: "45949189", name: "Betsy Satterfield", district: "Arvin", school: "Arvin Elementary", dob: "2/6/2000" },
  { ssid: "04793824", localId: "48001679", name: "Roberto Hyatt", district: "Lamont", school: "Lamont Elementary", dob: "3/5/2000" },
  { ssid: "60200556", localId: "63731224", name: "Cecilia Corkery", district: "Lamont", school: "Lamont Elementary", dob: "6/2/1998" },
  { ssid: "50549712", localId: "83157301", name: "Joann Lubowitz", district: "Kernville", school: "Kernville Elementary", dob: "6/15/2000" },
  { ssid: "76253606", localId: "43007583", name: "Marshall Weber", district: "Di Giorgio", school: "Di Giorgio Elementary", dob: "6/8/1999" },
  { ssid: "54102726", localId: "19879267", name: "Jodi Welch", district: "Di Giorgio", school: "Di Giorgio Elementary", dob: "5/5/1999" },
]

// Mock data for current caseload
const mockCurrentCaseload = [
  { ssid: "96759512", name: "Philip Shields", district: "Fruitvale" },
  { ssid: "98587232", name: "Georgia Fritsch", district: "Fruitvale" },
  { ssid: "87252120", name: "Frank Abernathy", district: "Arvin" },
  { ssid: "42057888", name: "Sandy Bode", district: "Lamont" },
  { ssid: "17012269", name: "Marilyn Howe", district: "Lamont" },
  { ssid: "18660261", name: "Jacob Adams", district: "Kernville" },
  { ssid: "76253606", name: "Marshall Weber", district: "Di Giorgio" },
  { ssid: "54102726", name: "Jodi Welch", district: "Di Giorgio" },
]

const districts = ["All Districts", "Fruitvale", "Arvin", "Lamont", "Kernville", "Di Giorgio"]

export default function EduclaimDatabasePage() {
  const router = useRouter()
  const [selectedDistrict, setSelectedDistrict] = useState("District")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<typeof mockAvailableStudents[0] | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [currentCaseload, setCurrentCaseload] = useState(mockCurrentCaseload)

  const filteredStudents = mockAvailableStudents.filter(student => {
    const matchesDistrict = selectedDistrict === "District" || selectedDistrict === "All Districts" || student.district === selectedDistrict
    const matchesSearch = searchTerm === "" || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.ssid.includes(searchTerm)
    
    return matchesDistrict && matchesSearch
  })

  const handleBackClick = () => {
    router.push('/caseload')
  }

  const handleAddClick = (student: typeof mockAvailableStudents[0]) => {
    setSelectedStudent(student)
    setIsAddModalOpen(true)
  }

  const handleAddToCaseload = () => {
    if (selectedStudent) {
      // Add to current caseload
      const newCaseloadStudent = {
        ssid: selectedStudent.ssid,
        name: selectedStudent.name,
        district: selectedStudent.district
      }
      setCurrentCaseload(prev => [...prev, newCaseloadStudent])
      
      // Close modal
      setIsAddModalOpen(false)
      setSelectedStudent(null)
      
      // Redirect back to caseload page
      router.push('/caseload')
    }
  }

  const handleSearch = () => {
    // Search functionality - the filtering is already handled by the filteredStudents
    console.log("Search triggered")
  }

  return (
    <div className="p-6 h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mr-4 p-0 hover:bg-transparent"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Caseload</h1>
      </div>

      <div className="flex gap-6 h-full">
        {/* Left Section - Search for student */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Search for student</h2>
          
          {/* Search Controls */}
          <div className="flex gap-2 mb-6">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            
            <Button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Search
            </Button>
          </div>

          {/* Search Results */}
          <div className="space-y-2">
            <div className="flex font-semibold text-sm text-gray-600 border-b pb-2">
              <div className="w-24">SSID</div>
              <div className="flex-1">Local ID</div>
              <div className="w-20"></div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filteredStudents.map((student, index) => (
                <div key={`${student.ssid}-${index}`} className="flex items-center py-2 hover:bg-gray-50">
                  <div className="w-24 text-sm">{student.ssid}</div>
                  <div className="flex-1 text-sm">{student.localId}</div>
                  <Button
                    variant="link"
                    onClick={() => handleAddClick(student)}
                    className="text-red-500 hover:text-red-700 p-0 h-auto font-normal"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Current Caseload */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Current Caseload</h2>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">SSID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">District</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCaseload.map((student, index) => (
                <TableRow key={`${student.ssid}-${index}`}>
                  <TableCell className="font-medium">{student.ssid}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.district}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Student Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Add this student to your caseload?</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddModalOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">SSID</div>
                  <div className="text-sm">{selectedStudent.ssid}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Name</div>
                  <div className="text-sm">{selectedStudent.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">District</div>
                  <div className="text-sm">{selectedStudent.district}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">School</div>
                  <div className="text-sm">{selectedStudent.school}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">DOB</div>
                  <div className="text-sm">{selectedStudent.dob}</div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleAddToCaseload}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 