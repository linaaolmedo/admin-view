"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const roleOptions = [
  { 
    value: "practitioner", 
    label: "Practitioner",
    permissions: ["Service Delivery", "Student Management"]
  },
  { 
    value: "supervisor", 
    label: "Supervisor",
    permissions: ["Supervision", "Reports", "Service Management"]
  },
  { 
    value: "student-registration-support", 
    label: "Student Registration Support",
    permissions: ["Student Registration", "Data Entry"]
  },
  { 
    value: "billing-administrator", 
    label: "Billing Administrator",
    permissions: ["Billing", "Reports"]
  },
  { 
    value: "district-administrator", 
    label: "District Administrator",
    permissions: ["District Management", "User Management", "Reports"]
  },
  { 
    value: "super-administrator", 
    label: "Super Administrator",
    permissions: ["System Administration", "All Permissions"]
  },
  { 
    value: "system-administrator", 
    label: "System Administrator",
    permissions: ["System Configuration", "User Management", "Reports"]
  },
]

const districtOptions = [
  { value: "fruitvale", label: "Fruitvale Elementary School District" },
  { value: "oakland", label: "Oakland Unified School District" },
  { value: "san-jose", label: "San Jose Unified School District" },
  { value: "fremont", label: "Fremont Unified School District" },
]

const supervisorOptions = [
  { value: "sarah-johnson", label: "Sarah Johnson" },
  { value: "michael-davis", label: "Michael Davis" },
  { value: "emma-wilson", label: "Emma Wilson" },
  { value: "carlos-martinez", label: "Carlos Martinez" },
]

export default function AddUserPage() {
  const [selectedRole, setSelectedRole] = useState("billing-administrator")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userType, setUserType] = useState(false) // false = Embedded, true = Affiliated
  const [npi, setNpi] = useState("")
  const [selectedSupervisor, setSelectedSupervisor] = useState("")
  const [qualifications, setQualifications] = useState<string[]>([])
  
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value)
  }

  const getPermissionsForRole = (roleValue: string) => {
    const role = roleOptions.find(r => r.value === roleValue)
    return role?.permissions || []
  }

  const handleAddQualification = () => {
    // This would open a modal or expand a form to add qualifications
    console.log("Add qualification clicked")
  }

  const handleSubmit = () => {
    // Handle form submission
    const userData = {
      role: selectedRole,
      district: selectedDistrict,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType: userType ? "affiliated" : "embedded",
      npi,
      supervisor: selectedSupervisor,
      qualifications
    }
    console.log("User data:", userData)
    // In a real app, this would submit to API and redirect
    alert("User added successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-teal-800">Add a new user</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* What type of user section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-teal-600 px-6 py-4">
              <h2 className="text-white font-medium">
                What type of user would you like to add?
              </h2>
            </div>
            <div className="p-6 bg-teal-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role Section */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedRole} onValueChange={handleRoleChange}>
                    <SelectTrigger className="mt-2 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Permission Sets Section */}
                <div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Permission Sets
                    </Label>
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="mt-2 text-sm text-gray-800">
                    {getPermissionsForRole(selectedRole).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-teal-600 px-6 py-4">
              <h2 className="text-white font-medium">Locations</h2>
            </div>
            <div className="p-6 bg-teal-50">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  District <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {districtOptions.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* User Information section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-teal-600 px-6 py-4">
              <h2 className="text-white font-medium">User Information</h2>
            </div>
            <div className="p-6 bg-teal-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Type
                  </Label>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-sm ${!userType ? 'font-medium' : 'text-gray-500'}`}>
                      Embedded
                    </span>
                    <Switch 
                      checked={userType} 
                      onCheckedChange={setUserType}
                    />
                    <span className={`text-sm ${userType ? 'font-medium' : 'text-gray-500'}`}>
                      Affiliated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-teal-600 px-6 py-4">
              <h2 className="text-white font-medium">Qualifications</h2>
            </div>
            <div className="p-6 bg-teal-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    National Provider Identifier
                  </Label>
                  <Input 
                    value={npi}
                    onChange={(e) => setNpi(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Supervisor
                  </Label>
                  <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                    <SelectTrigger className="mt-2 bg-white">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {supervisorOptions.map((supervisor) => (
                        <SelectItem key={supervisor.value} value={supervisor.value}>
                          {supervisor.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={handleAddQualification}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 hover:bg-teal-100"
              >
                <Plus className="h-4 w-4" />
                Add a qualification
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="px-8 py-2 border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-teal-600 hover:bg-teal-700 px-8 py-2 text-white"
              disabled={!selectedRole || !selectedDistrict || !firstName || !lastName || !email}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 