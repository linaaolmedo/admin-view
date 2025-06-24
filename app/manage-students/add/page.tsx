"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, ArrowLeft, Upload, FileText, X, User, Users } from "lucide-react"

export default function AddStudentPage() {
  const [activeTab, setActiveTab] = useState("individual")
  const [showDetailForm, setShowDetailForm] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Individual Add State - Basic info for initial add
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

  // Detailed Student Information State
  const [detailedForm, setDetailedForm] = useState({
    // Student Information
    firstName: "",
    lastName: "",
    preferredName: "",
    birthdate: "",
    gender: "",
    ssid: "",
    localId: "",
    grade: "",
    district: "",
    school: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    primaryContact: "",
    contactNumber: "",
    transportationTeam: "",
    // Billing Information
    type: "",
    insuranceCarrier: "",
    groupNumber: "",
    policyNumber: "",
    effectiveDate: "",
    mediCalEligible: "",
    mediCalBenefitsId: "",
    // Medical Information
    practitioner: "",
    primaryDisability: "",
    parentalConsentOnFile: "",
    parentalConsentInBill: "",
    // Comments
    comments: ""
  })

  // Bulk Add State
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Handle pre-populated student data from search
  useEffect(() => {
    const studentParam = searchParams.get('student')
    if (studentParam) {
      try {
        const studentData = JSON.parse(decodeURIComponent(studentParam))
        // Parse name into first and last name
        const nameParts = studentData.name.split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        // Pre-populate detailed form with student data and show it directly
        setDetailedForm({
          firstName,
          lastName,
          preferredName: "",
          birthdate: studentData.dob || '',
          gender: "",
          ssid: studentData.ssid || '',
          localId: studentData.localId || '',
          grade: "",
          district: studentData.district || '',
          school: studentData.school || '',
          address: "",
          city: "",
          state: "",
          zipCode: "",
          primaryContact: "",
          contactNumber: "",
          transportationTeam: "",
          type: "",
          insuranceCarrier: "",
          groupNumber: "",
          policyNumber: "",
          effectiveDate: "",
          mediCalEligible: "",
          mediCalBenefitsId: "",
          practitioner: "",
          primaryDisability: "",
          parentalConsentOnFile: "",
          parentalConsentInBill: "",
          comments: ""
        })
        
        // Show detailed form directly
        setShowDetailForm(true)
      } catch (error) {
        console.error('Error parsing student data:', error)
      }
    }
  }, [searchParams])

  // Individual Add Functions
  const handleIndividualFormChange = (field: string, value: string) => {
    setIndividualForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDetailedFormChange = (field: string, value: string) => {
    setDetailedForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'birthdate', 'ssid', 'district']
    const missingFields = requiredFields.filter(field => !individualForm[field as keyof typeof individualForm])
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      return
    }

    // Pre-populate detailed form with basic info
    setDetailedForm(prev => ({
      ...prev,
      firstName: individualForm.firstName,
      lastName: individualForm.lastName,
      birthdate: individualForm.birthdate,
      ssid: individualForm.ssid,
      localId: individualForm.localId,
      district: individualForm.district,
      school: individualForm.school,
      contactNumber: individualForm.contactNumber
    }))

    // Show detailed form
    setShowDetailForm(true)
  }

  const handleDetailedSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: Implement detailed student save
    console.log("Saving detailed student information:", detailedForm)
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

  const resetDetailedForm = () => {
    // Navigate back to manage students instead of resetting form
    router.push("/manage-students")
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

  // If detailed form should be shown, render that instead
  if (showDetailForm) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/manage-students")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-[#000000]">Add Student</h1>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
          <form onSubmit={handleDetailedSubmit} className="p-6 space-y-8">
            {/* Student Information Section */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-teal-800">Student Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="detailed-firstName" className="text-sm font-medium">First Name</Label>
                  <Input
                    id="detailed-firstName"
                    value={detailedForm.firstName}
                    onChange={(e) => handleDetailedFormChange("firstName", e.target.value)}
                    placeholder="Nicole"
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="detailed-lastName" className="text-sm font-medium">Last Name</Label>
                  <Input
                    id="detailed-lastName"
                    value={detailedForm.lastName}
                    onChange={(e) => handleDetailedFormChange("lastName", e.target.value)}
                    placeholder="Walker"
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-preferredName" className="text-sm font-medium">Preferred Name</Label>
                  <Input
                    id="detailed-preferredName"
                    value={detailedForm.preferredName}
                    onChange={(e) => handleDetailedFormChange("preferredName", e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-birthdate" className="text-sm font-medium">Birthdate</Label>
                  <Input
                    id="detailed-birthdate"
                    type="date"
                    value={detailedForm.birthdate}
                    onChange={(e) => handleDetailedFormChange("birthdate", e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-gender" className="text-sm font-medium">Gender</Label>
                  <Select 
                    value={detailedForm.gender} 
                    onValueChange={(value) => handleDetailedFormChange("gender", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Female" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-multiVaried" className="text-sm font-medium">Multi/Varied/Indicated</Label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-ssid" className="text-sm font-medium">SSID</Label>
                  <Input
                    id="detailed-ssid"
                    value={detailedForm.ssid}
                    onChange={(e) => handleDetailedFormChange("ssid", e.target.value)}
                    placeholder="90318220"
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-localId" className="text-sm font-medium">Local ID</Label>
                  <Input
                    id="detailed-localId"
                    value={detailedForm.localId}
                    onChange={(e) => handleDetailedFormChange("localId", e.target.value)}
                    placeholder="41170608"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-grade" className="text-sm font-medium">Grade</Label>
                  <Input
                    id="detailed-grade"
                    value={detailedForm.grade}
                    onChange={(e) => handleDetailedFormChange("grade", e.target.value)}
                    placeholder="7"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-district" className="text-sm font-medium">District</Label>
                  <Select 
                    value={detailedForm.district} 
                    onValueChange={(value) => handleDetailedFormChange("district", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Fruitvale School District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruitvale">Fruitvale School District</SelectItem>
                      <SelectItem value="oakland">Oakland Unified</SelectItem>
                      <SelectItem value="berkeley">Berkeley Unified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-school" className="text-sm font-medium">School</Label>
                  <Select 
                    value={detailedForm.school} 
                    onValueChange={(value) => handleDetailedFormChange("school", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Fruitvale School" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruitvale">Fruitvale School</SelectItem>
                      <SelectItem value="lincoln">Lincoln Elementary</SelectItem>
                      <SelectItem value="washington">Washington Middle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-status" className="text-sm font-medium">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="detailed-address" className="text-sm font-medium">Address</Label>
                  <Input
                    id="detailed-address"
                    value={detailedForm.address}
                    onChange={(e) => handleDetailedFormChange("address", e.target.value)}
                    placeholder="149 Birch Roads Bakersfield"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-city" className="text-sm font-medium">City</Label>
                  <Input
                    id="detailed-city"
                    value={detailedForm.city}
                    onChange={(e) => handleDetailedFormChange("city", e.target.value)}
                    placeholder="CA"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-zipCode" className="text-sm font-medium">Zip Code</Label>
                  <Input
                    id="detailed-zipCode"
                    value={detailedForm.zipCode}
                    onChange={(e) => handleDetailedFormChange("zipCode", e.target.value)}
                    placeholder="93312"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-primaryContact" className="text-sm font-medium">Primary Contact</Label>
                  <Input
                    id="detailed-primaryContact"
                    value={detailedForm.primaryContact}
                    onChange={(e) => handleDetailedFormChange("primaryContact", e.target.value)}
                    placeholder="Jeffrey Walker"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-contactNumber" className="text-sm font-medium">Contact Number</Label>
                  <Input
                    id="detailed-contactNumber"
                    value={detailedForm.contactNumber}
                    onChange={(e) => handleDetailedFormChange("contactNumber", e.target.value)}
                    placeholder="661 864-9672"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailed-transportationTeam" className="text-sm font-medium">Transportation Team</Label>
                  <Select 
                    value={detailedForm.transportationTeam} 
                    onValueChange={(value) => handleDetailedFormChange("transportationTeam", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Billing Information Section */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-teal-800">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-type" className="text-sm font-medium">Type</Label>
                  <Select 
                    value={detailedForm.type} 
                    onValueChange={(value) => handleDetailedFormChange("type", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-insuranceCarrier" className="text-sm font-medium">Insurance Carrier</Label>
                  <Select 
                    value={detailedForm.insuranceCarrier} 
                    onValueChange={(value) => handleDetailedFormChange("insuranceCarrier", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medi-cal">Medi-Cal</SelectItem>
                      <SelectItem value="private">Private Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-groupNumber" className="text-sm font-medium">Group #</Label>
                  <Input
                    id="billing-groupNumber"
                    value={detailedForm.groupNumber}
                    onChange={(e) => handleDetailedFormChange("groupNumber", e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-policyNumber" className="text-sm font-medium">Policy #</Label>
                  <Input
                    id="billing-policyNumber"
                    value={detailedForm.policyNumber}
                    onChange={(e) => handleDetailedFormChange("policyNumber", e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-effectiveDate" className="text-sm font-medium">Effective Date</Label>
                  <Select 
                    value={detailedForm.effectiveDate} 
                    onValueChange={(value) => handleDetailedFormChange("effectiveDate", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-mediCalEligible" className="text-sm font-medium">Medi-Cal Eligible</Label>
                  <Select 
                    value={detailedForm.mediCalEligible} 
                    onValueChange={(value) => handleDetailedFormChange("mediCalEligible", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-mediCalBenefitsId" className="text-sm font-medium">Medi-Cal Benefits ID</Label>
                  <Input
                    id="billing-mediCalBenefitsId"
                    value={detailedForm.mediCalBenefitsId}
                    onChange={(e) => handleDetailedFormChange("mediCalBenefitsId", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-teal-800">Medical Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medical-practitioner" className="text-sm font-medium">Practitioner</Label>
                  <Select 
                    value={detailedForm.practitioner} 
                    onValueChange={(value) => handleDetailedFormChange("practitioner", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="No Practitioners" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="dr-jones">Dr. Jones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical-primaryDisability" className="text-sm font-medium">Primary Disability</Label>
                  <Select 
                    value={detailedForm.primaryDisability} 
                    onValueChange={(value) => handleDetailedFormChange("primaryDisability", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autism">Autism</SelectItem>
                      <SelectItem value="adhd">ADHD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical-parentalConsentFile" className="text-sm font-medium">Parental Consent on File</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white">
                      📅
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white">
                      📤
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical-parentalConsentBill" className="text-sm font-medium">Parental Consent in Bill</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white">
                      📅
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white">
                      📤
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-teal-800">Comments</h2>
              <Textarea
                value={detailedForm.comments}
                onChange={(e) => handleDetailedFormChange("comments", e.target.value)}
                placeholder="Add any additional comments..."
                className="bg-white min-h-[100px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetDetailedForm}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-teal-600 hover:bg-teal-700"
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/manage-students")}
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
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Individual Add
            </TabsTrigger>
            <TabsTrigger 
              value="bulk" 
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white flex items-center gap-2"
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
                  <User className="w-5 h-5 text-teal-600" />
                  Add Individual Student
                </CardTitle>
                <CardDescription>
                  Enter student information to add a single student to the system. Required fields: First Name, Last Name, Birthdate, SSID, and District.
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
                      <Label htmlFor="localId">Local ID</Label>
                      <Input
                        id="localId"
                        value={individualForm.localId}
                        onChange={(e) => handleIndividualFormChange("localId", e.target.value)}
                        placeholder="Enter local ID"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Select 
                        value={individualForm.district} 
                        onValueChange={(value) => handleIndividualFormChange("district", value)}
                        required
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
                      <Label htmlFor="school">School</Label>
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
                      className="bg-teal-600 hover:bg-teal-700"
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
                  <Users className="w-5 h-5 text-teal-600" />
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
                      ? "border-teal-600 bg-teal-50" 
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
                          className="text-teal-600 hover:underline font-medium"
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
                      className="bg-teal-600 hover:bg-teal-700 px-8"
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
                <div className="p-4 bg-teal-50 rounded-lg">
                  <h4 className="font-semibold text-teal-900 mb-2">File Format Requirements:</h4>
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
