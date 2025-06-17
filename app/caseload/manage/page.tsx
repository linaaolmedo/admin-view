"use client"

import { useState } from "react"
import { ChevronLeft, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for demonstration - in a real app, this would come from an API
const mockStudents = [
  { ssid: "60318220", localId: "84434944", name: "Nicole Walker", district: "Fruitvale", school: "Fruitvale", dob: "1/2/1999" },
  { ssid: "65309041", localId: "54256076", name: "Jamie Barton", district: "Fruitvale", school: "Fruitvale", dob: "2/3/1999" },
  { ssid: "66233084", localId: "45949189", name: "Betsy Satterfield", district: "Arvin", school: "Fruitvale", dob: "2/6/2000" },
  { ssid: "04793824", localId: "48001679", name: "Roberto Hyatt", district: "Lamont", school: "Fruitvale", dob: "3/5/2000" },
  { ssid: "60200556", localId: "63731224", name: "Cecilia Corkery", district: "Lamont", school: "Fruitvale", dob: "6/2/1998" },
  { ssid: "50549712", localId: "83157301", name: "Joann Lubowitz", district: "Kernville", school: "Fruitvale", dob: "6/15/2000" },
  { ssid: "76253606", localId: "43007583", name: "Marshall Weber", district: "Di Giorgio", school: "Fruitvale", dob: "6/8/1999" },
  { ssid: "54102726", localId: "19879267", name: "Jodi Welch", district: "Di Giorgio", school: "Fruitvale", dob: "5/5/1999" },
]

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

type Student = {
  ssid: string
  localId: string
  name: string
  district: string
  school: string
  dob: string
}

type CaseloadStudent = {
  ssid: string
  name: string
  district: string
}

export default function CaseloadManagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [currentCaseload, setCurrentCaseload] = useState<CaseloadStudent[]>(mockCurrentCaseload)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const districts = ["Fruitvale", "Arvin", "Lamont", "Kernville", "Di Giorgio"]

  const handleSearch = () => {
    let results = mockStudents
    
    if (selectedDistrict) {
      results = results.filter(student => student.district === selectedDistrict)
    }
    
    if (searchTerm) {
      results = results.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.ssid.includes(searchTerm) ||
        student.localId.includes(searchTerm)
      )
    }
    
    setSearchResults(results)
  }

  const handleAddStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsAddDialogOpen(true)
  }

  const confirmAddStudent = () => {
    if (selectedStudent) {
      const newCaseloadStudent: CaseloadStudent = {
        ssid: selectedStudent.ssid,
        name: selectedStudent.name,
        district: selectedStudent.district
      }
      
      // Check if student is already in caseload
      if (!currentCaseload.find(s => s.ssid === selectedStudent.ssid)) {
        setCurrentCaseload([...currentCaseload, newCaseloadStudent])
      }
    }
    setIsAddDialogOpen(false)
    setSelectedStudent(null)
  }

  const handleRemoveStudent = (ssid: string) => {
    setCurrentCaseload(currentCaseload.filter(student => student.ssid !== ssid))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ChevronLeft className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Caseload</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search for student section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search for student</h2>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDistrict && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDistrict("")}
                  className="px-2"
                >
                  Clear
                </Button>
              )}
            </div>
            
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Search Results Table */}
          {searchResults.length > 0 && (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SSID</TableHead>
                    <TableHead>Local ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((student) => (
                    <TableRow key={student.ssid}>
                      <TableCell>{student.ssid}</TableCell>
                      <TableCell>{student.localId}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.district}</TableCell>
                      <TableCell>{student.school}</TableCell>
                      <TableCell>{student.dob}</TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="text-red-500 hover:text-red-700 p-0"
                          onClick={() => handleAddStudent(student)}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Current Caseload section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Caseload</h2>
          
          <div className="border rounded-lg bg-slate-100/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SSID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCaseload.map((student) => (
                  <TableRow key={student.ssid}>
                    <TableCell>{student.ssid}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="text-red-500 hover:text-red-700 p-0"
                        onClick={() => handleRemoveStudent(student.ssid)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add this student to your caseload?</DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">SSID</label>
                  <div className="border-b pb-1">{selectedStudent.ssid}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <div className="border-b pb-1">{selectedStudent.name}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">District</label>
                  <div className="border-b pb-1">{selectedStudent.district}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">School</label>
                  <div className="border-b pb-1">{selectedStudent.school}</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">DOB</label>
                <div className="border-b pb-1">{selectedStudent.dob}</div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button onClick={confirmAddStudent} className="px-8">
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
