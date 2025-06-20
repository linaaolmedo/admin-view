"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockStudents = [
  "Philip Shields - 96759512",
  "Georgia Fritsch - 98587232", 
  "Frank Abernathy - 87252120",
  "Sandy Bode - 42057888",
  "Marilyn Howe - 17012269"
]

const mockGroups = [
  "Group A - Monday Morning",
  "Group B - Tuesday Afternoon",
  "Group C - Wednesday Evening",
  "Group D - Thursday Morning"
]

const serviceTypes = [
  "Health behavior intervention",
  "Individual counseling",
  "Group therapy",
  "Assessment and evaluation",
  "Crisis intervention",
  "Family consultation"
]

const serviceLocations = [
  "01 - Home",
  "02 - Community",
  "03 - School", 
  "04 - Clinic",
  "05 - Hospital",
  "06 - Other"
]

export default function LogServicePage() {
  const [activeTab, setActiveTab] = useState("student")
  const [formData, setFormData] = useState({
    student: "",
    group: "",
    serviceDate: "",
    serviceTime: "",
    endTime: "",
    serviceType: "Health behavior intervention",
    location: "03 - School",
    caseNotes: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    console.log("Saving service log:", formData)
    // In a real app, this would save to the backend
    alert("Service logged successfully!")
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Log a Service</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-auto mb-6">
          <TabsTrigger 
            value="student" 
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Student
          </TabsTrigger>
          <TabsTrigger 
            value="group"
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Group
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="mt-0 space-y-6">
          {/* Student Information Section */}
          <div className="bg-white rounded-lg border">
            <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
              <h2 className="font-medium">Student Information</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <Label htmlFor="student" className="text-sm font-medium">
                  Student <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.student} onValueChange={(value) => handleInputChange("student", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map((student) => (
                      <SelectItem key={student} value={student}>
                        {student}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Service Information Section */}
          <div className="bg-white rounded-lg border">
            <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
              <h2 className="font-medium">Service Information</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* First Row - Date and Times */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceDate" className="text-sm font-medium">
                    Service date <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.serviceDate} onValueChange={(value) => handleInputChange("serviceDate", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-01-15">January 15, 2025</SelectItem>
                      <SelectItem value="2025-01-16">January 16, 2025</SelectItem>
                      <SelectItem value="2025-01-17">January 17, 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceTime" className="text-sm font-medium">
                    Service time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="serviceTime"
                    type="time"
                    value={formData.serviceTime}
                    onChange={(e) => handleInputChange("serviceTime", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm font-medium">
                    End time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Second Row - Service Type and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-sm font-medium">
                    Service Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location of service <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Case Notes */}
              <div className="space-y-2">
                <Label htmlFor="caseNotes" className="text-sm font-medium">
                  Case notes <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="caseNotes"
                  value={formData.caseNotes}
                  onChange={(e) => handleInputChange("caseNotes", e.target.value)}
                  className="min-h-32 resize-none"
                  placeholder="Enter case notes..."
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="group" className="mt-0 space-y-6">
          {/* Service Information Section */}
          <div className="bg-white rounded-lg border">
            <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
              <h2 className="font-medium">Service Information</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* First Row - Date and Times */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceDate" className="text-sm font-medium">
                    Service date <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.serviceDate} onValueChange={(value) => handleInputChange("serviceDate", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-01-15">January 15, 2025</SelectItem>
                      <SelectItem value="2025-01-16">January 16, 2025</SelectItem>
                      <SelectItem value="2025-01-17">January 17, 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceTime" className="text-sm font-medium">
                    Service time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="serviceTime"
                    type="time"
                    value={formData.serviceTime}
                    onChange={(e) => handleInputChange("serviceTime", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm font-medium">
                    End time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Second Row - Service Type and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-sm font-medium">
                    Service Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location of service <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Group Information Section */}
          <div className="bg-white rounded-lg border">
            <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
              <h2 className="font-medium">Group Information</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <Label htmlFor="group" className="text-sm font-medium">
                  Group <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.group} onValueChange={(value) => handleInputChange("group", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Save Button */}
        <div className="flex justify-center pt-6">
          <Button onClick={handleSave} className="px-8 py-2 bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </div>
      </Tabs>
    </div>
  )
}
