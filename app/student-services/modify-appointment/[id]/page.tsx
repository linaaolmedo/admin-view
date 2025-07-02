"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

// Mock data - in a real app, this would come from an API based on the service ID
const getServiceDetails = (id: string) => {
  const services = {
    "1": {
      id: "1",
      status: "INCOMPLETE",
      serviceDate: "4/21/2025",
      serviceTime: "11:30am",
      endTime: "12:00pm",
      duration: "30 min",
      serviceType: "Individual - Health behavior intervention",
      location: "03 - School",
      caseNotes: "",
      appointmentNotes: "",
      student: {
        ssid: "43063894",
        name: "Samantha Greenfield",
        dob: "1/2/1999",
        district: "Fruitvale School District",
        school: "Fruitvale"
      }
    },
    "2": {
      id: "2",
      status: "UPCOMING",
      serviceDate: "4/25/2025",
      serviceTime: "2:00pm",
      endTime: "2:45pm",
      duration: "45 min",
      serviceType: "Speech Therapy - Individual",
      location: "02 - Clinic",
      caseNotes: "",
      appointmentNotes: "",
      student: {
        ssid: "43063894",
        name: "Samantha Greenfield",
        dob: "1/2/1999",
        district: "Fruitvale School District",
        school: "Fruitvale"
      }
    }
  }
  
  return services[id as keyof typeof services] || services["1"]
}

const statusOptions = [
  { value: "UPCOMING", label: "UPCOMING" },
  { value: "INCOMPLETE", label: "INCOMPLETE" },
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" }
]

const serviceTypeOptions = [
  { value: "Individual - Health behavior intervention", label: "Individual - Health behavior intervention" },
  { value: "Speech Therapy - Individual", label: "Speech Therapy - Individual" },
  { value: "Occupational Therapy - Individual", label: "Occupational Therapy - Individual" },
  { value: "Physical Therapy - Individual", label: "Physical Therapy - Individual" },
  { value: "Psychological Services - Individual", label: "Psychological Services - Individual" }
]

const locationOptions = [
  { value: "03 - School", label: "03 - School" },
  { value: "01 - Home", label: "01 - Home" },
  { value: "02 - Clinic", label: "02 - Clinic" },
  { value: "04 - Community", label: "04 - Community" }
]

const durationOptions = [
  { value: "15 min", label: "15 min" },
  { value: "30 min", label: "30 min" },
  { value: "45 min", label: "45 min" },
  { value: "60 min", label: "60 min" },
  { value: "90 min", label: "90 min" }
]

export default function ModifyAppointmentPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  
  const service = getServiceDetails(serviceId)
  
  const [formData, setFormData] = useState({
    status: service.status,
    serviceDate: service.serviceDate,
    serviceTime: service.serviceTime,
    endTime: service.endTime,
    duration: service.duration,
    serviceType: service.serviceType,
    location: service.location,
    caseNotes: service.caseNotes,
    appointmentNotes: service.appointmentNotes
  })

  const handleBack = () => {
    router.back()
  }

  const handleSave = () => {
    console.log("Saving modified appointment:", formData)
    // In a real app, this would save to the backend
    // Then redirect back to the service details page
    router.push(`/student-services/service-details/${serviceId}`)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Orange Header Bar */}
      <div className="bg-orange-400 text-white px-6 py-3">
        <h1 className="text-lg font-medium text-center">Modify Appointment</h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold text-teal-800">Service Log Details</h2>
        </div>

        <div className="space-y-6">
          {/* Appointment Information */}
          <div className="bg-white rounded-lg border">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
              <h3 className="text-lg font-medium">Appointment Information</h3>
            </div>
            <div className="p-6 bg-blue-50">
              {/* First Row */}
              <div className="grid grid-cols-5 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Service date <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.serviceDate} onValueChange={(value) => handleInputChange("serviceDate", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4/21/2025">4/21/2025</SelectItem>
                      <SelectItem value="4/22/2025">4/22/2025</SelectItem>
                      <SelectItem value="4/23/2025">4/23/2025</SelectItem>
                      <SelectItem value="4/24/2025">4/24/2025</SelectItem>
                      <SelectItem value="4/25/2025">4/25/2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Service time <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.serviceTime} onValueChange={(value) => handleInputChange("serviceTime", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00am">9:00am</SelectItem>
                      <SelectItem value="10:00am">10:00am</SelectItem>
                      <SelectItem value="11:00am">11:00am</SelectItem>
                      <SelectItem value="11:30am">11:30am</SelectItem>
                      <SelectItem value="12:00pm">12:00pm</SelectItem>
                      <SelectItem value="1:00pm">1:00pm</SelectItem>
                      <SelectItem value="2:00pm">2:00pm</SelectItem>
                      <SelectItem value="3:00pm">3:00pm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    End time <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.endTime} onValueChange={(value) => handleInputChange("endTime", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00am">10:00am</SelectItem>
                      <SelectItem value="11:00am">11:00am</SelectItem>
                      <SelectItem value="12:00pm">12:00pm</SelectItem>
                      <SelectItem value="1:00pm">1:00pm</SelectItem>
                      <SelectItem value="2:00pm">2:00pm</SelectItem>
                      <SelectItem value="3:00pm">3:00pm</SelectItem>
                      <SelectItem value="4:00pm">4:00pm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Appointment Notes */}
              <div>
                <label className="text-sm font-medium text-gray-700">Appointment notes</label>
                <Textarea
                  value={formData.appointmentNotes}
                  onChange={(e) => handleInputChange("appointmentNotes", e.target.value)}
                  className="mt-1 bg-white"
                  rows={3}
                  placeholder="Enter appointment notes..."
                />
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="bg-white rounded-lg border">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
              <h3 className="text-lg font-medium">Service Information</h3>
            </div>
            <div className="p-6 bg-blue-50">
              {/* Service Type and Location */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location of service <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Case Notes */}
              <div>
                <label className="text-sm font-medium text-gray-700">Case notes</label>
                <Textarea
                  value={formData.caseNotes}
                  onChange={(e) => handleInputChange("caseNotes", e.target.value)}
                  className="mt-1 bg-white"
                  rows={3}
                  placeholder="Enter case notes..."
                />
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="bg-white rounded-lg border">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
              <h3 className="text-lg font-medium">Student Information</h3>
            </div>
            <div className="p-6 bg-blue-50">
              <div className="grid grid-cols-5 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">SSID</label>
                  <div className="text-sm text-gray-900 mt-1">{service.student.ssid}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Student</label>
                  <div className="text-sm text-gray-900 mt-1">{service.student.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">DOB</label>
                  <div className="text-sm text-gray-900 mt-1">{service.student.dob}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">District</label>
                  <div className="text-sm text-gray-900 mt-1">{service.student.district}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">School</label>
                  <div className="text-sm text-gray-900 mt-1">{service.student.school}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleSave}
              className="px-8 py-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 