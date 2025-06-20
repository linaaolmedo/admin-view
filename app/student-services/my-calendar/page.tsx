"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type Appointment = {
  id: number
  date: string
  time: string
  title: string
  type: 'group' | 'individual'
  color: string
  status: 'incomplete' | 'complete' | 'cancelled' | 'upcoming'
  duration: string
  serviceType: string
  location: string
  caseNotes?: string
  actualEndTime?: string
  groupName?: string
  students?: { ssid: string; name: string; status: string }[]
  pastServices?: { date: string; serviceType: string }[]
}

// Mock appointment data
const mockAppointments: Appointment[] = [
  { 
    id: 1, 
    date: '2025-04-07', 
    time: '10:00', 
    title: 'Group: Monday AM', 
    type: 'group', 
    color: 'bg-green-200 text-green-800',
    status: 'complete', // This will be determined by the function
    duration: '60 min',
    serviceType: 'Group - Health behavior intervention',
    location: '03 - School',
    caseNotes: 'Group session completed successfully. All students participated well in behavioral intervention activities.',
    actualEndTime: '11:00',
    groupName: 'Monday AM',
    students: [
      { ssid: '96759512', name: 'Phillip Shields', status: 'COMPLETED' },
      { ssid: '98587232', name: 'Georgia Fritsch', status: 'COMPLETED' },
      { ssid: '46465141', name: 'Samantha Greenfield', status: 'COMPLETED' }
    ],
    pastServices: [
      { date: '4/12/2025', serviceType: 'Individual - Health behavior intervention' }
    ]
  },
  { 
    id: 2, 
    date: '2025-04-14', 
    time: '10:00', 
    title: 'Group: Monday AM', 
    type: 'group', 
    color: 'bg-yellow-200 text-yellow-800', // Changed to yellow since incomplete
    status: 'incomplete', // Missing case notes
    duration: '60 min',
    serviceType: 'Group - Health behavior intervention',
    location: '03 - School',
    actualEndTime: '11:00', // Has end time but no notes
    groupName: 'Monday AM',
    students: [
      { ssid: '96759512', name: 'Phillip Shields', status: 'NOT STARTED' },
      { ssid: '98587232', name: 'Georgia Fritsch', status: 'NOT STARTED' },
      { ssid: '46465141', name: 'Samantha Greenfield', status: 'NOT STARTED' }
    ]
  },
  { 
    id: 3, 
    date: '2025-04-14', 
    time: '11:30', 
    title: 'Greenfield, Samantha', 
    type: 'individual', 
    color: 'bg-yellow-200 text-yellow-800', // Changed to yellow since incomplete
    status: 'incomplete', // Has notes but no end time
    duration: '30 min',
    serviceType: 'Individual - Health behavior intervention',
    location: '03 - School',
    caseNotes: 'Student showed good progress in behavioral goals but session ran over time.'
    // Missing actualEndTime
  },
  { 
    id: 4, 
    date: '2025-04-15', 
    time: '11:30', 
    title: 'Greenfield, Samantha', 
    type: 'individual', 
    color: 'bg-red-200 text-red-800',
    status: 'cancelled',
    duration: '30 min',
    serviceType: 'Individual - Health behavior intervention',
    location: '03 - School'
  },
  { 
    id: 5, 
    date: '2025-04-21', 
    time: '10:00', 
    title: 'Group: Monday AM', 
    type: 'group', 
    color: 'bg-yellow-200 text-yellow-800', // Changed to yellow since incomplete
    status: 'incomplete', // Missing both notes and end time
    duration: '60 min',
    serviceType: 'Group - Health behavior intervention',
    location: '03 - School',
    groupName: 'Monday AM',
    students: [
      { ssid: '96759512', name: 'Phillip Shields', status: 'NOT STARTED' },
      { ssid: '98587232', name: 'Georgia Fritsch', status: 'NOT STARTED' },
      { ssid: '46465141', name: 'Samantha Greenfield', status: 'NOT STARTED' }
    ]
  },
  { 
    id: 6, 
    date: '2025-04-21', 
    time: '11:30', 
    title: 'Greenfield, Samantha', 
    type: 'individual', 
    color: 'bg-green-200 text-green-800', // Complete since has both notes and end time
    status: 'complete',
    duration: '30 min',
    serviceType: 'Individual - Health behavior intervention',
    location: '03 - School',
    caseNotes: 'Excellent session. Student met all behavioral objectives and showed significant improvement.',
    actualEndTime: '12:00',
    pastServices: [
      { date: '4/12/2025', serviceType: 'Individual - Health behavior intervention' }
    ]
  },
  { 
    id: 7, 
    date: '2025-04-23', 
    time: '11:30', 
    title: 'Greenfield, Samantha', 
    type: 'individual', 
    color: 'bg-teal-200 text-teal-800',
    status: 'upcoming',
    duration: '30 min',
    serviceType: 'Individual - Health behavior intervention',
    location: '03 - School'
  },
]

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Function to determine actual appointment status based on business rules
const getActualAppointmentStatus = (appointment: Appointment): 'incomplete' | 'complete' | 'cancelled' | 'upcoming' => {
  // If it's cancelled or upcoming, return as-is
  if (appointment.status === 'cancelled' || appointment.status === 'upcoming') {
    return appointment.status
  }
  
  // For past appointments, check if they have both case notes and actual end time
  const hasNotes = appointment.caseNotes && appointment.caseNotes.trim().length > 0
  const hasEndTime = appointment.actualEndTime && appointment.actualEndTime.trim().length > 0
  
  // Only mark as complete if both case notes and end time exist
  if (hasNotes && hasEndTime) {
    return 'complete'
  }
  
  // Otherwise, it's incomplete
  return 'incomplete'
}

// Service Log Details Component
function ServiceLogDetails({ appointment, onClose }: { appointment: Appointment; onClose: () => void }) {
  const [notes, setNotes] = useState(appointment.caseNotes || '')

  const getStatusDisplay = (status: string) => {
    const statusConfig = {
      incomplete: { label: 'INCOMPLETE', className: 'bg-yellow-100 text-yellow-800 border border-yellow-300' },
      complete: { label: 'COMPLETE', className: 'bg-green-100 text-green-800 border border-green-300' },
      cancelled: { label: 'CANCELLED', className: 'bg-red-100 text-red-800 border border-red-300' },
      upcoming: { label: 'UPCOMING', className: 'bg-teal-100 text-teal-800 border border-teal-300' }
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.incomplete
  }

  // Get the actual status based on business rules
  const actualStatus = getActualAppointmentStatus(appointment)
  const statusDisplay = getStatusDisplay(actualStatus)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Service Log Details</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">
              Mark as cancelled
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Modify appointment
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Appointment Information */}
          <div className="bg-teal-50 rounded-lg p-4">
            <div className="bg-teal-100 text-teal-900 font-medium px-3 py-1 rounded mb-4 inline-block">
              Appointment Information
            </div>
            
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${statusDisplay.className}`}>
                  {statusDisplay.label}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Service date</label>
                <div className="text-sm text-gray-900 mt-1">{appointment.date}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Service time</label>
                <div className="text-sm text-gray-900 mt-1">{appointment.time}</div>
              </div>
                             <div>
                 <label className="text-sm font-medium text-gray-700">End time</label>
                 <div className="text-sm mt-1">
                   {appointment.actualEndTime ? (
                     <span className="text-gray-900">{appointment.actualEndTime}</span>
                   ) : (
                     <span className="text-red-600 italic">Not recorded</span>
                   )}
                 </div>
               </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Duration</label>
                <div className="text-sm text-gray-900 mt-1">{appointment.duration}</div>
              </div>
            </div>

                         <div>
               <label className="text-sm font-medium text-gray-700">
                 Appointment notes
                 {actualStatus === 'incomplete' && !appointment.caseNotes && (
                   <span className="text-red-600 text-xs ml-2">(Required for completion)</span>
                 )}
               </label>
               <textarea
                 value={notes}
                 onChange={(e) => setNotes(e.target.value)}
                 className={`w-full mt-1 p-2 border rounded-md resize-none ${
                   actualStatus === 'incomplete' && !appointment.caseNotes
                     ? 'border-red-300 bg-red-50'
                     : 'border-gray-300'
                 }`}
                 rows={3}
                 placeholder="Enter appointment notes..."
               />
               {actualStatus === 'incomplete' && (
                 <div className="mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
                   <strong>Status: Incomplete</strong>
                   <ul className="mt-1 text-xs list-disc list-inside">
                     {!appointment.caseNotes && <li>Case notes are required</li>}
                     {!appointment.actualEndTime && <li>Actual end time must be recorded</li>}
                   </ul>
                 </div>
               )}
             </div>
          </div>

          {/* Service Information */}
          <div className="bg-teal-50 rounded-lg p-4">
            <div className="bg-teal-100 text-teal-900 font-medium px-3 py-1 rounded mb-4 inline-block">
              Service Information
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Service Type</label>
                <div className="text-sm text-gray-900 mt-1">{appointment.serviceType}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location of service</label>
                <div className="text-sm text-gray-900 mt-1">{appointment.location}</div>
              </div>
            </div>
          </div>

          {/* Group Information (only for group appointments) */}
          {appointment.type === 'group' && appointment.groupName && (
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="bg-teal-100 text-teal-900 font-medium px-3 py-1 rounded mb-4 inline-block">
                Group Information
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">Group Name</label>
                <div className="text-sm text-gray-900 mt-1">{appointment.groupName}</div>
              </div>

              {appointment.students && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Service Log Status</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SSID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointment.students.map((student, index) => (
                        <tr key={index} className="bg-white">
                          <td className="px-4 py-2">
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {student.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">{student.ssid}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{student.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Past Service History */}
          {appointment.pastServices && appointment.pastServices.length > 0 && (
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="bg-teal-100 text-teal-900 font-medium px-3 py-1 rounded mb-4 inline-block">
                Past Service History
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Service Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointment.pastServices.map((service, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-2 text-sm text-gray-900">{service.date}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{service.serviceType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MyCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 22)) // April 2025, 22nd selected
  const [selectedDate, setSelectedDate] = useState(22)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getAppointmentsForDate = (day: number): Appointment[] => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return mockAppointments.filter(apt => apt.date === dateString).map(apt => ({
      ...apt,
      // Update color based on actual status
      color: (() => {
        const status = getActualAppointmentStatus(apt)
        switch (status) {
          case 'complete': return 'bg-green-200 text-green-800'
          case 'incomplete': return 'bg-yellow-200 text-yellow-800'
          case 'cancelled': return 'bg-red-200 text-red-800'
          case 'upcoming': return 'bg-teal-200 text-teal-800'
          default: return 'bg-gray-200 text-gray-800'
        }
      })()
    }))
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
  }

  const renderCalendarDays = () => {
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 0).getDate() - startingDayOfWeek + i + 1
      days.push(
        <div key={`prev-${i}`} className="h-32 p-1 text-gray-400 border-r border-b bg-gray-50">
          <div className="text-sm">{prevMonthDay}</div>
        </div>
      )
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const appointments = getAppointmentsForDate(day)
      const isSelected = day === selectedDate
      const isToday = day === 22 // Mock today as 22nd

      days.push(
        <div 
          key={day} 
          className={`h-32 p-1 border-r border-b cursor-pointer hover:bg-gray-50 ${
            isSelected ? 'bg-teal-50' : 'bg-white'
          }`}
          onClick={() => setSelectedDate(day)}
        >
          <div className={`text-sm font-medium mb-1 ${
            isSelected ? 'text-teal-600' : isToday ? 'font-bold' : 'text-gray-900'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className={`text-xs px-1 py-0.5 rounded text-center truncate cursor-pointer hover:opacity-80 ${apt.color}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleAppointmentClick(apt)
                }}
              >
                <div className="font-medium">{apt.title}</div>
                <div>{apt.time}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Fill remaining cells if needed
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (startingDayOfWeek + daysInMonth)
    
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="h-32 p-1 text-gray-400 border-r border-b bg-gray-50">
          <div className="text-sm">{i}</div>
        </div>
      )
    }

    return days
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Calendar</h1>
      </div>

      <div className="space-y-4">
        {/* Color indicators */}
      <div className="bg-white border rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-200 border border-yellow-300"></div>
            <span className="text-sm text-gray-700">Past appointment - needs notes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-teal-200 border border-teal-300"></div>
            <span className="text-sm text-gray-700">Upcoming appointment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-200 border border-green-300"></div>
            <span className="text-sm text-gray-700">Past appointment - completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-200 border border-red-300"></div>
            <span className="text-sm text-gray-700">Past appointment - cancelled</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="border rounded-lg bg-white">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <CalendarIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">
              {monthNames[month]} {year}
            </h2>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center font-medium text-gray-600 border-b bg-gray-50">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {renderCalendarDays()}
        </div>
      </div>

        {/* Service Log Details Modal */}
        {selectedAppointment && (
          <ServiceLogDetails 
            appointment={selectedAppointment} 
            onClose={() => setSelectedAppointment(null)} 
          />
        )}
      </div>
    </div>
  )
}
