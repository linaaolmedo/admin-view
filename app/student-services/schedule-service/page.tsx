"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

export default function ScheduleServicePage() {
  const [activeTab, setActiveTab] = useState("student")
  const [selectedDate, setSelectedDate] = useState(23) // April 23rd
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [duration, setDuration] = useState("30")
  const [appointmentNotes, setAppointmentNotes] = useState("")
  const [serviceType, setServiceType] = useState("health-behavior")
  const [serviceLocation, setServiceLocation] = useState("03-school")
  const router = useRouter()

  const timeSlots = [
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "12:00 PM", available: true },
    { time: "12:30 PM", available: true },
    { time: "1:00 PM", available: true },
    { time: "1:30 PM", available: false },
    { time: "2:00 PM", available: true },
  ]

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const weekDates = [21, 22, 23, 24, 25]

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving appointment:", {
      tab: activeTab,
      date: selectedDate,
      time: selectedTime,
      student: selectedStudent,
      duration,
      notes: appointmentNotes,
      serviceType,
      serviceLocation
    })
    router.push("/student-services/my-calendar")
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
        <h1 className="text-2xl font-bold text-[#000000]">Schedule Services</h1>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-auto mb-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <CardTitle className="text-lg">April 2025</CardTitle>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {weekDays.map((day, index) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {weekDates.map((date, index) => (
                      <Button
                        key={date}
                        variant={selectedDate === date ? "default" : "outline"}
                        className={`h-12 rounded-full ${
                          selectedDate === date 
                            ? "bg-teal-600 text-white hover:bg-teal-700" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        {date}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Slots */}
              <div className="space-y-3">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full h-12 justify-center ${
                      !slot.available 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        : selectedTime === slot.time
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gray-50"
                    }`}
                    disabled={!slot.available}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Appointment Form */}
            <div className="space-y-6">
              {/* Appointment Information */}
              <Card className="bg-teal-50">
                <CardHeader>
                  <CardTitle className="text-teal-600">Appointment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Start time</Label>
                      <div className="text-lg font-semibold">
                        {selectedTime || "--"}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Duration *</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="45">45 min</SelectItem>
                          <SelectItem value="60">60 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Appointment Notes</Label>
                    <Textarea
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      placeholder="Enter appointment notes..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Student Information */}
              <Card className="bg-teal-50">
                <CardHeader>
                  <CardTitle className="text-teal-600">Student Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label className="text-sm font-medium">Student *</Label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="samantha-greenfield">Samantha Greenfield</SelectItem>
                        <SelectItem value="linda-hermann">Linda Hermann</SelectItem>
                        <SelectItem value="jackie-hartmann">Jackie Hartmann</SelectItem>
                        <SelectItem value="silvia-mann">Silvia Mann</SelectItem>
                        <SelectItem value="zachary-gulgowski">Zachary Gulgowski</SelectItem>
                        <SelectItem value="billie-labadie">Billie Labadie</SelectItem>
                        <SelectItem value="angelica-conroy">Angelica Conroy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Service Information */}
              <Card className="bg-teal-50">
                <CardHeader>
                  <CardTitle className="text-teal-600">Service Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Service Type *</Label>
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="health-behavior">Health behavior intervention</SelectItem>
                          <SelectItem value="speech-therapy">Speech Therapy</SelectItem>
                          <SelectItem value="occupational-therapy">Occupational Therapy</SelectItem>
                          <SelectItem value="physical-therapy">Physical Therapy</SelectItem>
                          <SelectItem value="psychological-services">Psychological Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location of service *</Label>
                      <Select value={serviceLocation} onValueChange={setServiceLocation}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="03-school">03 - School</SelectItem>
                          <SelectItem value="01-home">01 - Home</SelectItem>
                          <SelectItem value="02-clinic">02 - Clinic</SelectItem>
                          <SelectItem value="04-community">04 - Community</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleSave}
                  className="w-full bg-gray-300 text-gray-600 hover:bg-gray-400"
                  disabled={!selectedTime || !selectedStudent}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
