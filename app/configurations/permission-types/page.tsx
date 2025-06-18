
"use client"
//test
// test2
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

// Permission data structure based on the screenshot
// Permissions are read-only standard data
const permissionData = [
  {
    id: "claims",
    title: "Claims",
    icon: "📋",
    expanded: true,
    permissions: [
      { 
        id: "view-claims", 
        name: "View Claims", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: false 
      },
      { 
        id: "submit-claims", 
        name: "Submit Claims", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: false, 
        systemAdmin: false 
      }
    ]
  },
  {
    id: "admin-tools",
    title: "Admin Tools",
    icon: "🔧",
    expanded: true,
    permissions: [
      { 
        id: "view-license-types", 
        name: "View License Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      },
      { 
        id: "edit-license-types", 
        name: "Edit License Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: false, 
        systemAdmin: true 
      },
      { 
        id: "view-service-types", 
        name: "View Service Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      },
      { 
        id: "edit-service-types", 
        name: "Edit Service Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: false, 
        systemAdmin: true 
      },
      { 
        id: "view-billing-codes", 
        name: "View Billing Codes", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      },
      { 
        id: "edit-billing-codes", 
        name: "Edit Billing Codes", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: false, 
        systemAdmin: true 
      }
    ]
  },
  {
    id: "manage-users",
    title: "Manage Users",
    icon: "👥",
    expanded: true,
    permissions: [
      { 
        id: "view-license-types-users", 
        name: "View License Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      }
    ]
  },
  {
    id: "my-caseload",
    title: "My Caseload",
    icon: "📝",
    expanded: true,
    permissions: [
      { 
        id: "view-license-types-caseload", 
        name: "View License Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      }
    ]
  },
  {
    id: "schedule-services",
    title: "Schedule Services",
    icon: "📅",
    expanded: true,
    permissions: [
      { 
        id: "view-license-types-schedule", 
        name: "View License Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      }
    ]
  },
  {
    id: "reports",
    title: "Reports",
    icon: "📊",
    expanded: true,
    permissions: [
      { 
        id: "view-license-types-reports", 
        name: "View License Types", 
        practitioner: false, 
        supervisor: false, 
        districtAdmin: true, 
        systemAdmin: true 
      }
    ]
  }
]

export default function PermissionTypesPage() {
  const [sections, setSections] = useState(permissionData)

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    )
  }

  // Permissions are read-only standard data

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-[#000000]">Configurations</h1>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <div className="px-1 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            Qualifications
          </div>
          <div className="px-1 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            Billing Codes
          </div>
          <div className="px-1 py-2 text-[#4286f4] border-b-2 border-[#4286f4] font-medium">
            Permission Types
          </div>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg border">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 p-4 bg-[#e8f0fe] border-b text-sm font-medium text-gray-700">
          <div>Actions</div>
          <div className="text-center">Practitioner</div>
          <div className="text-center">Supervisor</div>
          <div className="text-center">District Administrator</div>
          <div className="text-center">System Admin</div>
          <div></div>
        </div>

        {/* Permission Sections */}
        {sections.map((section) => (
          <div key={section.id} className="border-b border-gray-100 last:border-b-0">
            {/* Section Header */}
            <div 
              className="flex items-center justify-between p-4 bg-[#f0f4ff] hover:bg-[#e8f0fe] cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              <div className="flex items-center space-x-4">
                {section.expanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            {/* Section Content */}
            {section.expanded && (
              <div>
                {section.permissions.map((permission) => (
                  <div key={permission.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 border-t border-gray-50">
                    <div className="text-sm text-gray-900 pl-8">
                      {permission.name}
                    </div>
                                         <div className="flex justify-center">
                       <Checkbox
                         checked={permission.practitioner}
                         disabled
                         className="data-[state=checked]:bg-[#4286f4] data-[state=checked]:border-[#4286f4] cursor-not-allowed"
                       />
                     </div>
                     <div className="flex justify-center">
                       <Checkbox
                         checked={permission.supervisor}
                         disabled
                         className="data-[state=checked]:bg-[#4286f4] data-[state=checked]:border-[#4286f4] cursor-not-allowed"
                       />
                     </div>
                     <div className="flex justify-center">
                       <Checkbox
                         checked={permission.districtAdmin}
                         disabled
                         className="data-[state=checked]:bg-[#4286f4] data-[state=checked]:border-[#4286f4] cursor-not-allowed"
                       />
                     </div>
                     <div className="flex justify-center">
                       <Checkbox
                         checked={permission.systemAdmin}
                         disabled
                         className="data-[state=checked]:bg-[#4286f4] data-[state=checked]:border-[#4286f4] cursor-not-allowed"
                       />
                     </div>
                    <div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
