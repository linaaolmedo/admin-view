"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

// Mock data - in a real app, this would come from an API based on the service ID
const getServiceDetails = (id: string) => {
  const services = {
    "1": {
      id: "1",
      status: "UPCOMING",
      serviceDate: "4/21/2025",
      serviceTime: "11:30pm",
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
      },
      pastServices: [
        {
          date: "4/12/2025",
          serviceType: "Individual - Health behavior intervention"
        }
      ]
    },
    "2": {
      id: "2",
      status: "INCOMPLETE",
      serviceDate: "4/18/2025",
      serviceTime: "2:00pm",
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
      },
      pastServices: [
        {
          date: "4/10/2025",
          serviceType: "Speech Therapy - Individual"
        },
        {
          date: "4/3/2025",
          serviceType: "Speech Therapy - Individual"
        }
      ]
    }
  }
  
  return services[id as keyof typeof services] || services["1"]
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "INCOMPLETE":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200"
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge className={`${getStatusStyles(status)} border`}>
      {status}
    </Badge>
  )
}

export default function ServiceDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  
  const service = getServiceDetails(serviceId)
  const [caseNotes, setCaseNotes] = useState(service.caseNotes)
  const [appointmentNotes, setAppointmentNotes] = useState(service.appointmentNotes)

  const handleBack = () => {
    router.back()
  }

  const handleModifyAppointment = () => {
    router.push(`/student-services/modify-appointment/${serviceId}`)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-teal-800">Service Log Details</h1>
        </div>
        <Button 
          variant="outline" 
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
          onClick={handleModifyAppointment}
        >
          Modify appointment
        </Button>
      </div>

      <div className="space-y-6">
        {/* Service Information */}
        <div className="bg-white rounded-lg border">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-lg font-medium">Service Information</h2>
          </div>
          <div className="p-6 bg-blue-50">
            {/* First Row */}
            <div className="grid grid-cols-5 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <StatusBadge status={service.status} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Service date</label>
                <div className="text-sm text-gray-900 mt-1">{service.serviceDate}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Service time</label>
                <div className="text-sm text-gray-900 mt-1">{service.serviceTime}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Duration</label>
                <div className="text-sm text-gray-900 mt-1">{service.duration}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Service Type</label>
                <div className="text-sm text-gray-900 mt-1">{service.serviceType}</div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Location of service</label>
              <div className="text-sm text-gray-900 mt-1">{service.location}</div>
            </div>

            {/* Case Notes */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Case notes</label>
              <Textarea
                value={caseNotes}
                onChange={(e) => setCaseNotes(e.target.value)}
                className="mt-1 bg-white"
                rows={3}
                placeholder="Enter case notes..."
              />
            </div>

            {/* Appointment Notes */}
            <div>
              <label className="text-sm font-medium text-gray-700">Appointment notes</label>
              <Textarea
                value={appointmentNotes}
                onChange={(e) => setAppointmentNotes(e.target.value)}
                className="mt-1 bg-white"
                rows={3}
                placeholder="Enter appointment notes..."
              />
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-lg border">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-lg font-medium">Student Information</h2>
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

        {/* Past Service History */}
        <div className="bg-white rounded-lg border">
          <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-lg font-medium">Past Service History</h2>
          </div>
          <div className="bg-blue-50">
            <div className="p-6">
              <div className="bg-white rounded border">
                <div className="grid grid-cols-2 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                  <div>Date</div>
                  <div>Service Type</div>
                </div>
                {service.pastServices.map((pastService, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-4 border-b last:border-b-0 text-sm">
                    <div>{pastService.date}</div>
                    <div>{pastService.serviceType}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 