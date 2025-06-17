"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, FileText, X, User, Users } from "lucide-react"

export default function AddStudentPage() {
  const [activeTab, setActiveTab] = useState("individual")
  const router = useRouter()

  // Individual Add State
  const [individualForm, setIndividualForm] = useState({
    firstName: "",
    lastName: "",
    ssid: "",
    localId: "",
    district: "",
    school: "",
    birthdate: "",
    contactNumber: ""
  })

  // Bulk Add State
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Individual Add Functions
  const handleIndividualFormChange = (field: string, value: string) => {
    setIndividualForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement individual student add
    console.log("Adding individual student:", individualForm)
    router.push("/manage-students")
  }

  const resetIndividualForm = () => {
    setIndividualForm({
      firstName: "",
      lastName: "",
      ssid: "",
      localId: "",
      district: "",
      school: "",
      birthdate: "",
      contactNumber: ""
    })
  }

  // Bulk Add Functions
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (isValidFileType(file)) {
        setUploadedFile(file)
      } else {
        alert("Please upload a .xls, .xlsx, or .csv file")
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (isValidFileType(file)) {
        setUploadedFile(file)
      } else {
        alert("Please upload a .xls, .xlsx, or .csv file")
      }
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]
    const validExtensions = ['.xls', '.xlsx', '.csv']
    
    return validTypes.includes(file.type) || 
           validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
  }

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      // TODO: Implement actual file upload and processing
      console.log("File uploaded:", uploadedFile.name)
      router.push("/manage-students")
    }, 2000)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const triggerFileInput = () => {
    document.getElementById('fileInput')?.click()
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
        <h1 className="text-2xl font-bold text-[#000000]">Add Students</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="individual" 
              className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Individual Add
            </TabsTrigger>
            <TabsTrigger 
              value="bulk" 
              className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Bulk Add
            </TabsTrigger>
          </TabsList>

          {/* Individual Add Tab */}
          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4286f4]" />
                  Add Individual Student
                </CardTitle>
                <CardDescription>
                  Enter student information to add a single student to the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleIndividualSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={individualForm.firstName}
                        onChange={(e) => handleIndividualFormChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={individualForm.lastName}
                        onChange={(e) => handleIndividualFormChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ssid">SSID *</Label>
                      <Input
                        id="ssid"
                        value={individualForm.ssid}
                        onChange={(e) => handleIndividualFormChange("ssid", e.target.value)}
                        placeholder="Enter SSID"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="localId">Local ID *</Label>
                      <Input
                        id="localId"
                        value={individualForm.localId}
                        onChange={(e) => handleIndividualFormChange("localId", e.target.value)}
                        placeholder="Enter local ID"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Select 
                        value={individualForm.district} 
                        onValueChange={(value) => handleIndividualFormChange("district", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fruitvale">Fruitvale</SelectItem>
                          <SelectItem value="oakland">Oakland</SelectItem>
                          <SelectItem value="berkeley">Berkeley</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school">School *</Label>
                      <Select 
                        value={individualForm.school} 
                        onValueChange={(value) => handleIndividualFormChange("school", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select school" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fruitvale">Fruitvale</SelectItem>
                          <SelectItem value="lincoln">Lincoln Elementary</SelectItem>
                          <SelectItem value="washington">Washington Middle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Birth Date *</Label>
                      <Input
                        id="birthdate"
                        type="date"
                        value={individualForm.birthdate}
                        onChange={(e) => handleIndividualFormChange("birthdate", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        value={individualForm.contactNumber}
                        onChange={(e) => handleIndividualFormChange("contactNumber", e.target.value)}
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetIndividualForm}
                    >
                      Reset
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#4286f4] hover:bg-[#3275e3]"
                    >
                      Add Student
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Add Tab */}
          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4286f4]" />
                  Bulk Add Students
                </CardTitle>
                <CardDescription>
                  Upload a file containing multiple student records to add them all at once.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div
                  className={`
                    relative border-2 border-dashed rounded-lg p-12 text-center transition-colors mb-6
                    ${dragActive 
                      ? "border-[#4286f4] bg-blue-50" 
                      : uploadedFile 
                        ? "border-green-400 bg-green-50" 
                        : "border-gray-300 bg-gray-50"
                    }
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept=".xls,.xlsx,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {!uploadedFile ? (
                    <>
                      <div className="mb-4">
                        <FileText className="w-16 h-16 mx-auto text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Upload your files</h3>
                      <p className="text-gray-600 mb-4">
                        Drag your file here or{" "}
                        <button 
                          onClick={triggerFileInput}
                          className="text-[#4286f4] hover:underline font-medium"
                        >
                          Browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500">
                        File should be .xls, .xlsx or .csv
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="flex items-center bg-white rounded-lg border p-4 shadow-sm">
                        <FileText className="w-8 h-8 text-green-600 mr-3" />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="ml-4 text-gray-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                {uploadedFile && (
                  <div className="text-center mb-6">
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="bg-[#4286f4] hover:bg-[#3275e3] px-8"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Instructions */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">File Format Requirements:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Supported formats: Excel (.xls, .xlsx) or CSV (.csv)</li>
                    <li>• Required columns: SSID, Local ID, First Name, Last Name, District, School, DOB</li>
                    <li>• Maximum file size: 10 MB</li>
                    <li>• First row should contain column headers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
