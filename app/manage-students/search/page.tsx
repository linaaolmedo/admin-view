"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search } from "lucide-react"

// Mock data for student search results
const mockSearchResults = [
  { ssid: "60318220", localId: "41117698", name: "Nicole Walker", district: "Fruitvale", school: "Fruitvale", dob: "1/2/1999" },
  { ssid: "65309041", localId: "76578584", name: "Jamie Barton", district: "Fruitvale", school: "Fruitvale", dob: "2/3/1999" },
  { ssid: "66233084", localId: "21867725", name: "Betsy Satterfield", district: "Fruitvale", school: "Fruitvale", dob: "2/6/2000" },
  { ssid: "04793824", localId: "48093660", name: "Roberto Hyatt", district: "Fruitvale", school: "Fruitvale", dob: "3/5/2000" },
  { ssid: "60200556", localId: "99585915", name: "Cecilia Corkery", district: "Fruitvale", school: "Fruitvale", dob: "6/2/1998" },
  { ssid: "50549712", localId: "92584325", name: "Joann Lubowitz", district: "Fruitvale", school: "Fruitvale", dob: "6/15/2000" },
  { ssid: "76253606", localId: "06044726", name: "Marshall Weber", district: "Fruitvale", school: "Fruitvale", dob: "6/8/1999" },
  { ssid: "54102726", localId: "22433708", name: "Jodi Welch", district: "Fruitvale", school: "Fruitvale", dob: "5/5/1999" },
]

export default function SearchStudentsPage() {
  const [searchBy, setSearchBy] = useState("all")
  const [searchTerm, setSearchTerm] = useState("Fruitvale")
  const [searchResults, setSearchResults] = useState(mockSearchResults)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const router = useRouter()

  const handleSearch = () => {
    // In a real app, this would make an API call
    // For now, we'll just show the mock results
    setSearchResults(mockSearchResults)
  }

  const handleSelectStudent = (ssid: string) => {
    if (selectedStudents.includes(ssid)) {
      setSelectedStudents(selectedStudents.filter(id => id !== ssid))
    } else {
      setSelectedStudents([...selectedStudents, ssid])
    }
  }

  const handleAddSelectedStudents = () => {
    // TODO: Implement adding selected students to caseload
    console.log("Adding students:", selectedStudents)
    router.push("/manage-students")
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-[#000000]">Search for student</h1>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Select value={searchBy} onValueChange={setSearchBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="ssid">SSID</SelectItem>
              <SelectItem value="localId">Local ID</SelectItem>
              <SelectItem value="district">District</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <Button onClick={handleSearch} className="bg-[#4286f4] hover:bg-[#3275e3]">
            Search
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Search Results</h2>
            {selectedStudents.length > 0 && (
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddSelectedStudents}
                  className="bg-[#4286f4] hover:bg-[#3275e3]"
                >
                  Add Selected Students ({selectedStudents.length})
                </Button>
              </div>
            )}
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="font-semibold">SSID</TableHead>
                <TableHead className="font-semibold">Local ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">District</TableHead>
                <TableHead className="font-semibold">School</TableHead>
                <TableHead className="font-semibold">DOB</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((student, index) => (
                <TableRow key={index} className="hover:bg-blue-100">
                  <TableCell className="font-medium">{student.ssid}</TableCell>
                  <TableCell>{student.localId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.district}</TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={selectedStudents.includes(student.ssid) ? "default" : "outline"}
                      onClick={() => handleSelectStudent(student.ssid)}
                      className={selectedStudents.includes(student.ssid) 
                        ? "bg-[#4286f4] hover:bg-[#3275e3] text-white" 
                        : "border-[#4286f4] text-[#4286f4] hover:bg-[#4286f4] hover:text-white"
                      }
                    >
                      {selectedStudents.includes(student.ssid) ? "Selected" : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
