"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data based on the screenshot
const billingCodes = [
  {
    code: "H2027",
    type: "Treatment",
    description: "Individual - Health behavior intervention",
    unit: "15 minutes",
    rate: "$20.11",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "H2027",
    type: "Assessment", 
    description: "Group - Health behavior intervention",
    unit: "15 minutes",
    rate: "$8.04",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "98960",
    type: "Treatment",
    description: "Individual - Education and training for patient self-management",
    unit: "30 minutes", 
    rate: "$26.66",
    eligiblePractitioners: "CHW"
  },
  {
    code: "98961",
    type: "Treatment",
    description: "2-4 patients - Education and training for patient self-management",
    unit: "30 minutes",
    rate: "$12.66", 
    eligiblePractitioners: "CHW"
  },
  {
    code: "98962",
    type: "Treatment",
    description: "5-8 patients - Education and training for patient self-management",
    unit: "30 minutes",
    rate: "$9.46",
    eligiblePractitioners: "CHW"
  },
  {
    code: "H2014",
    type: "Treatment",
    description: "Individual - Skills Training and Development",
    unit: "15 minutes",
    rate: "$20.11",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "G0442",
    type: "Treatment", 
    description: "Screening for Annual Alcohol Misuse",
    unit: "15 minutes",
    rate: "$17.14",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "G9919",
    type: "Treatment",
    description: "Screening for ACES/Trauma (High Risk)",
    unit: "30 minutes",
    rate: "$29.00",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "G9920",
    type: "Treatment",
    description: "Screening for ACES/Trauma (Low Risk)",
    unit: "30 minutes",
    rate: "$29.00", 
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "G8431",
    type: "Treatment",
    description: "Screening for depression (positive)",
    unit: "30 minutes",
    rate: "$37.25",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "G8510",
    type: "Treatment",
    description: "Screening for depression (negative)",
    unit: "30 minutes",
    rate: "$17.14",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "99408",
    type: "Treatment",
    description: "Alcohol and/or substance abuse structured screening, and brief intervention (SBI) services",
    unit: "15 - 30 minutes",
    rate: "$31.24",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "99409",
    type: "Treatment",
    description: "Alcohol and/or substance abuse structured screening, and brief intervention (SBI) services",
    unit: "30 or more minutes",
    rate: "$59.61",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "96156",
    type: "Treatment",
    description: "Psychosocial Status Assessment", 
    unit: "30 minutes",
    rate: "$85.40",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH"
  },
  {
    code: "96130",
    type: "Treatment",
    description: "Psychological Testing and Evaluation",
    unit: "Initial 60 minutes",
    rate: "$107.69",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS School Psychologist"
  },
  {
    code: "96132",
    type: "Treatment",
    description: "Neuropsychological Testing and Evaluation",
    unit: "Initial 60 minutes", 
    rate: "$116.97",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS School Psychologist"
  },
  {
    code: "96136",
    type: "Treatment",
    description: "Psychological or neuropsychological testing and evaluation",
    unit: "Initial 60 minutes",
    rate: "$41.88",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS School Psychologist"
  }
]

export default function BillingCodesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "treatment":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "assessment":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const filteredCodes = billingCodes.filter(code =>
    code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900">Code</TableHead>
              <TableHead className="font-semibold text-gray-900">Type</TableHead>
              <TableHead className="font-semibold text-gray-900">Description</TableHead>
              <TableHead className="font-semibold text-gray-900">Unit</TableHead>
              <TableHead className="font-semibold text-gray-900">Rate</TableHead>
              <TableHead className="font-semibold text-gray-900">Eligible Practitioners</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCodes.map((code, index) => (
              <TableRow key={`${code.code}-${index}`} className="hover:bg-gray-50">
                <TableCell className="font-medium">{code.code}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getTypeColor(code.type)}>
                    {code.type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">{code.description}</TableCell>
                <TableCell>{code.unit}</TableCell>
                <TableCell className="font-medium">{code.rate}</TableCell>
                <TableCell className="max-w-xs">
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {code.eligiblePractitioners}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
