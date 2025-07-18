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
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter()

  // Filter results based on search term
  const getFilteredResults = (term: string) => {
    if (!term.trim()) {
      return []
    }
    
    return mockSearchResults.filter(student => 
      student.name.toLowerCase().includes(term.toLowerCase()) ||
      student.ssid.includes(term) ||
      student.localId.includes(term) ||
      student.district.toLowerCase().includes(term.toLowerCase()) ||
      student.school.toLowerCase().includes(term.toLowerCase())
    )
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    
    // Update results in real-time as user types
    const filteredResults = getFilteredResults(newSearchTerm)
    setSearchResults(filteredResults)
  }

  const handleSearch = () => {
    // This function now just triggers the same filtering logic
    const filteredResults = getFilteredResults(searchTerm)
    setSearchResults(filteredResults)
  }

  const handleSelectStudent = (ssid: string) => {
    // Find the selected student
    const selectedStudent = searchResults.find(student => student.ssid === ssid)
    if (selectedStudent) {
      // Navigate to add student page with pre-populated data
      const studentData = encodeURIComponent(JSON.stringify(selectedStudent))
      router.push(`/manage-students/add?student=${studentData}`)
    }
  }

  // Function removed - no longer needed since we handle individual selection

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
        <h1 className="text-2xl font-bold text-teal-800">Search for student</h1>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Input
              placeholder="Search students by name, SSID, local ID, district, or school..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="pr-12"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700">
            Search
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => router.push("/manage-students/add")}
            className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
          >
            Can't find student? Add New Student
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchTerm.trim() && (
        <div className="bg-teal-50 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Search Results {searchResults.length > 0 ? `(${searchResults.length} found)` : '(No results found)'}
            </h2>
          </div>
          
          {searchResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-teal-100">
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
                  <TableRow key={index} className="hover:bg-teal-100">
                    <TableCell className="font-medium">{student.ssid}</TableCell>
                    <TableCell>{student.localId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>{student.school}</TableCell>
                    <TableCell>{student.dob}</TableCell>
                    <TableCell>
                                          <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelectStudent(student.ssid)}
                      className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                    >
                      Select
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No students found matching your search criteria.</p>
              <p className="text-sm text-gray-500 mt-2">Try searching with different keywords or check your spelling.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
