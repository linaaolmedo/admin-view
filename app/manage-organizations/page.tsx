"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for qualifications matching the screenshot
const qualificationsData = [
  {
    id: 1,
    type: "License",
    code: "AMFT",
    description: "Registered Associate Marriage and Family Therapists",
    status: "Active"
  },
  {
    id: 2,
    type: "Credential",
    code: "AOD",
    description: "Alcohol and Other Drug Counselors",
    status: "Active"
  },
  {
    id: 3,
    type: "Credential",
    code: "APCC",
    description: "Registered Associate Professional Clinical Counselors",
    status: "Active"
  },
  {
    id: 4,
    type: "License",
    code: "ASW",
    description: "Registered Associate Social Workers",
    status: "Active"
  },
  {
    id: 5,
    type: "License",
    code: "CHW",
    description: "Community Health Workers",
    status: "Archived"
  },
  {
    id: 6,
    type: "Credential",
    code: "LCSW",
    description: "Community Health Workers",
    status: "Active"
  },
  {
    id: 7,
    type: "License",
    code: "LMFT",
    description: "Licensed Marriage and Family Therapists",
    status: "Active"
  },
  {
    id: 8,
    type: "License",
    code: "LPCC",
    description: "Licensed Professional Clinical Counselors",
    status: "Active"
  },
  {
    id: 9,
    type: "Certificate",
    code: "MD",
    description: "Licensed Physicians, including DOs and Psychiatrists",
    status: "Archived"
  },
  {
    id: 10,
    type: "Certificate",
    code: "NP",
    description: "Licensed Nurse Practitioners",
    status: "Active"
  },
  {
    id: 11,
    type: "License",
    code: "PA",
    description: "Licensed Physician Assistants",
    status: "Archived"
  },
  {
    id: 12,
    type: "License",
    code: "PPS",
    description: "Pupil Personnel Services Credentialed",
    status: "Archived"
  },
  {
    id: 13,
    type: "License",
    code: "PSYCH",
    description: "Licensed Psychologist, included Licensed Educational Psychologists",
    status: "Active"
  },
  {
    id: 14,
    type: "Certificate",
    code: "PSY ASSOC",
    description: "Registered Psychology Associates",
    status: "Active"
  },
  {
    id: 15,
    type: "License",
    code: "RN",
    description: "Registered Nurse, including Credentialed School Nurses",
    status: "Active"
  }
]

// Mock data for other tabs (placeholder)
const billingCodesData = [
  {
    id: 1,
    type: "Treatment",
    code: "H2027",
    description: "Individual - Health behavior intervention",
    status: "Active"
  }
]

const permissionTypesData = [
  {
    id: 1,
    type: "System",
    code: "ADMIN",
    description: "System Administrator permissions",
    status: "Active"
  }
]

const carelonMediCalData = [
  {
    id: 1,
    type: "Payer",
    code: "MEDI_CAL",
    description: "Medi-Cal billing configuration",
    status: "Active"
  }
]

export default function ManageOrganizationsPage() {
  const [activeTab, setActiveTab] = useState("qualifications")
  const router = useRouter()

  const getCurrentData = () => {
    switch (activeTab) {
      case "qualifications":
        return qualificationsData
      case "billing-codes":
        return billingCodesData
      case "permission-types":
        return permissionTypesData
      case "carelon-medi-cal":
        return carelonMediCalData
      default:
        return qualificationsData
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "font-medium"
    switch (status) {
      case "Active":
        return `${baseClasses} bg-green-100 text-green-800`
      case "Archived":
        return `${baseClasses} bg-gray-100 text-gray-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const handleAddClick = () => {
    // Add functionality based on active tab
    console.log(`Add ${activeTab} clicked`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-teal-800">Manage Organization</h1>
          <Badge className="bg-teal-100 text-teal-800 border-teal-200 font-medium">
            Carelon/Fee Schedule
          </Badge>
        </div>
        <Button 
          onClick={handleAddClick}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Add
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-white border-b border-gray-200 w-full justify-start p-0 h-auto">
            <TabsTrigger 
              value="qualifications"
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              Qualifications
            </TabsTrigger>
            <TabsTrigger 
              value="billing-codes"
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              Billing Codes
            </TabsTrigger>
            <TabsTrigger 
              value="permission-types"
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              Permission Types
            </TabsTrigger>
            <TabsTrigger 
              value="carelon-medi-cal"
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              Carelon/Medi-cal
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="ml-4">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Type</TableHead>
                  <TableHead className="font-semibold text-gray-900">Code</TableHead>
                  <TableHead className="font-semibold text-gray-900">Description</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentData().map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell className="max-w-md">{item.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {item.status === "Active" ? "Archive" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 