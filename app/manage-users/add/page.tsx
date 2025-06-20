"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const roleOptions = [
  { value: "practitioner", label: "Practitioner" },
  { value: "supervisor", label: "Supervisor" },
  { value: "student-registration-support", label: "Student Registration Support" },
  { value: "billing-administrator", label: "Billing Administrator" },
  { value: "district-administrator", label: "District Administrator" },
  { value: "super-administrator", label: "Super Administrator" },
  { value: "system-administrator", label: "System Administrator" },
]

export default function AddUserPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const handleRoleChange = (value: string) => {
    setSelectedRole(value)
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
          <h1 className="text-2xl font-bold text-black">Add a new user</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Blue Question Section */}
          <div className="bg-teal-100 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-medium text-teal-900 mb-6">
              What type of user would you like to add?
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Role Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <Select value={selectedRole} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select" />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Sets
                </label>
                <div className="text-sm text-gray-600">
                  Permissions will be automatically assigned based on the selected role.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 px-6"
              disabled={!selectedRole}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 