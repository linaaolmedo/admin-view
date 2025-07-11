"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Eye, Upload, FileText, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type OrganizationType = "fee-schedule" | "lea-bop"

// Mock data for Fee Schedule organization
const feeScheduleQualifications = [
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
    description: "Licensed Clinical Social Workers",
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

// Mock data for LEA-BOP organization
const leaBopQualifications = [
  {
    id: 1,
    type: "License",
    code: "BCBA",
    description: "Board Certified Behavior Analyst",
    status: "Active"
  },
  {
    id: 2,
    type: "Certificate",
    code: "BCaBA",
    description: "Board Certified Assistant Behavior Analyst",
    status: "Active"
  },
  {
    id: 3,
    type: "License",
    code: "SLP",
    description: "Speech-Language Pathologist",
    status: "Active"
  },
  {
    id: 4,
    type: "License",
    code: "OT",
    description: "Occupational Therapist",
    status: "Active"
  },
  {
    id: 5,
    type: "License",
    code: "PT",
    description: "Physical Therapist",
    status: "Active"
  },
  {
    id: 6,
    type: "Certificate",
    code: "COTA",
    description: "Certified Occupational Therapy Assistant",
    status: "Active"
  },
  {
    id: 7,
    type: "Certificate",
    code: "PTA",
    description: "Physical Therapist Assistant",
    status: "Active"
  },
  {
    id: 8,
    type: "License",
    code: "PSYCH",
    description: "Licensed Educational Psychologist",
    status: "Active"
  },
  {
    id: 9,
    type: "Certificate",
    code: "SLPA",
    description: "Speech-Language Pathology Assistant",
    status: "Active"
  },
  {
    id: 10,
    type: "License",
    code: "APE",
    description: "Adapted Physical Education Specialist",
    status: "Active"
  }
]

// Mock data for billing codes (organization-specific)
const feeScheduleBillingCodes = [
  {
    id: 1,
    code: "H2027",
    type: "Treatment",
    description: "Individual - Health behavior intervention",
    unit: "15 minutes",
    rate: "$20.11",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 2,
    code: "H2027",
    type: "Assessment",
    description: "Group - Health behavior intervention",
    unit: "15 minutes",
    rate: "$8.04",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 3,
    code: "98960",
    type: "Treatment",
    description: "Individual - Education and training for patient self-management",
    unit: "30 minutes",
    rate: "$26.66",
    eligiblePractitioners: "CHW",
    status: "Active"
  },
  {
    id: 4,
    code: "98961",
    type: "Treatment",
    description: "2-4 patients - Education and training for patient self-management",
    unit: "30 minutes",
    rate: "$12.66",
    eligiblePractitioners: "CHW",
    status: "Active"
  },
  {
    id: 5,
    code: "98962",
    type: "Treatment",
    description: "5-8 patients - Education and training for patient self-management",
    unit: "30 minutes",
    rate: "$9.46",
    eligiblePractitioners: "CHW",
    status: "Archived"
  },
  {
    id: 6,
    code: "H2014",
    type: "Treatment",
    description: "Individual - Skills Training and Development",
    unit: "15 minutes",
    rate: "$20.11",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 7,
    code: "G0442",
    type: "Treatment",
    description: "Screening for Annual Alcohol Misuse",
    unit: "15 minutes",
    rate: "$17.14",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 8,
    code: "G9919",
    type: "Treatment",
    description: "Screening for ACES/Trauma (High Risk)",
    unit: "30 minutes",
    rate: "$29.00",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 9,
    code: "G9920",
    type: "Treatment",
    description: "Screening for ACES/Trauma (Low Risk)",
    unit: "30 minutes",
    rate: "$29.00",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 10,
    code: "G9431",
    type: "Treatment",
    description: "Screening for depression (positive)",
    unit: "30 minutes",
    rate: "$37.25",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 11,
    code: "G9510",
    type: "Treatment",
    description: "Screening for depression (negative)",
    unit: "30 minutes",
    rate: "$17.14",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 12,
    code: "99408",
    type: "Treatment",
    description: "Alcohol and/or substance abuse structured screening, and brief intervention (SBI) services",
    unit: "15-30 minutes",
    rate: "$31.24",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Archived"
  },
  {
    id: 13,
    code: "99409",
    type: "Treatment",
    description: "Alcohol and/or substance abuse structured screening, and brief intervention (SBI) services",
    unit: "30 or more minutes",
    rate: "$59.61",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 14,
    code: "96156",
    type: "Treatment",
    description: "Psychosocial Status Assessment",
    unit: "30 minutes",
    rate: "$85.40",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW, PSYCH",
    status: "Active"
  },
  {
    id: 15,
    code: "96130",
    type: "Treatment",
    description: "Psychological Testing and Evaluation",
    unit: "initial 60 minutes",
    rate: "$107.69",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS School Psychologist",
    status: "Active"
  },
  {
    id: 16,
    code: "96132",
    type: "Treatment",
    description: "Neuropsychological Testing and Evaluation",
    unit: "initial 60 minutes",
    rate: "$116.97",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS School Psychologist",
    status: "Archived"
  },
  {
    id: 17,
    code: "96136",
    type: "Treatment",
    description: "Psychological or neuropsychological testing and evaluation",
    unit: "initial 60 minutes",
    rate: "$41.90",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS School Psychologist",
    status: "Active"
  }
]

const leaBopBillingCodes = [
  {
    id: 1,
    code: "97155",
    type: "Treatment",
    description: "Adaptive behavior treatment with protocol modification",
    unit: "15 minutes",
    rate: "$28.50",
    eligiblePractitioners: "BCBA, BCaBA",
    status: "Active"
  },
  {
    id: 2,
    code: "97156",
    type: "Treatment",
    description: "Family adaptive behavior treatment guidance",
    unit: "15 minutes",
    rate: "$32.75",
    eligiblePractitioners: "BCBA, BCaBA",
    status: "Active"
  },
  {
    id: 3,
    code: "92507",
    type: "Treatment",
    description: "Speech/hearing therapy",
    unit: "15 minutes",
    rate: "$45.80",
    eligiblePractitioners: "SLP, SLPA",
    status: "Active"
  },
  {
    id: 4,
    code: "97530",
    type: "Treatment",
    description: "Therapeutic activities, direct (one-on-one) patient contact",
    unit: "15 minutes",
    rate: "$42.15",
    eligiblePractitioners: "OT, COTA, PT, PTA",
    status: "Active"
  },
  {
    id: 5,
    code: "97110",
    type: "Treatment",
    description: "Therapeutic procedure, 1 or more areas",
    unit: "15 minutes",
    rate: "$38.90",
    eligiblePractitioners: "PT, PTA",
    status: "Archived"
  },
  {
    id: 6,
    code: "97112",
    type: "Treatment",
    description: "Neuromuscular reeducation",
    unit: "15 minutes",
    rate: "$41.25",
    eligiblePractitioners: "PT, PTA",
    status: "Active"
  },
  {
    id: 7,
    code: "97535",
    type: "Treatment",
    description: "Self-care/home management training",
    unit: "15 minutes",
    rate: "$44.60",
    eligiblePractitioners: "OT, COTA",
    status: "Active"
  },
  {
    id: 8,
    code: "96116",
    type: "Assessment",
    description: "Neurobehavioral status exam",
    unit: "30 minutes",
    rate: "$89.75",
    eligiblePractitioners: "PSYCH",
    status: "Active"
  },
  {
    id: 9,
    code: "96130",
    type: "Assessment",
    description: "Psychological testing evaluation services",
    unit: "60 minutes",
    rate: "$115.80",
    eligiblePractitioners: "PSYCH",
    status: "Active"
  },
  {
    id: 10,
    code: "92521",
    type: "Assessment",
    description: "Evaluation of speech fluency",
    unit: "30 minutes",
    rate: "$52.35",
    eligiblePractitioners: "SLP",
    status: "Active"
  },
  {
    id: 11,
    code: "92523",
    type: "Assessment",
    description: "Evaluation of speech sound production",
    unit: "30 minutes",
    rate: "$48.90",
    eligiblePractitioners: "SLP",
    status: "Archived"
  },
  {
    id: 12,
    code: "97165",
    type: "Assessment",
    description: "Occupational therapy evaluation, low complexity",
    unit: "30 minutes",
    rate: "$67.45",
    eligiblePractitioners: "OT",
    status: "Active"
  },
  {
    id: 13,
    code: "97166",
    type: "Assessment",
    description: "Occupational therapy evaluation, moderate complexity",
    unit: "45 minutes",
    rate: "$89.20",
    eligiblePractitioners: "OT",
    status: "Active"
  },
  {
    id: 14,
    code: "97167",
    type: "Assessment",
    description: "Occupational therapy evaluation, high complexity",
    unit: "60 minutes",
    rate: "$115.75",
    eligiblePractitioners: "OT",
    status: "Active"
  },
  {
    id: 15,
    code: "97161",
    type: "Assessment",
    description: "Physical therapy evaluation, low complexity",
    unit: "30 minutes",
    rate: "$63.85",
    eligiblePractitioners: "PT",
    status: "Active"
  }
]

// Mock data for service types (organization-specific)
const feeScheduleServiceTypes = [
  {
    id: 1,
    code: "MHS-01",
    type: "Mental Health",
    description: "Individual Mental Health Services",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW",
    status: "Active"
  },
  {
    id: 2,
    code: "MHS-02",
    type: "Mental Health",
    description: "Group Mental Health Services",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS, AMFT, ASW",
    status: "Active"
  },
  {
    id: 3,
    code: "BHS-01",
    type: "Behavioral Health",
    description: "Behavioral Health Intervention Services",
    eligiblePractitioners: "CHW, LCSW, LMFT, LPSS",
    status: "Active"
  },
  {
    id: 4,
    code: "AS-01",
    type: "Assessment",
    description: "Comprehensive Assessment Services",
    eligiblePractitioners: "MD, NP, PA, PSYCH, PSY ASSOC, PPS",
    status: "Active"
  },
  {
    id: 5,
    code: "CS-01",
    type: "Crisis",
    description: "Crisis Intervention Services",
    eligiblePractitioners: "MD, PA, NP, RN, PSYCH, LCSW, LMFT, LPSS",
    status: "Active"
  },
  {
    id: 6,
    code: "PS-01",
    type: "Prevention",
    description: "Prevention and Early Intervention Services",
    eligiblePractitioners: "CHW, LCSW, LMFT, LPSS, AMFT, ASW",
    status: "Archived"
  }
]

const leaBopServiceTypes = [
  {
    id: 1,
    code: "ABA-01",
    type: "ABA",
    description: "Applied Behavior Analysis Services",
    eligiblePractitioners: "BCBA, BCaBA",
    status: "Active"
  },
  {
    id: 2,
    code: "ST-01",
    type: "Speech Therapy",
    description: "Speech and Language Therapy Services",
    eligiblePractitioners: "SLP, SLPA",
    status: "Active"
  },
  {
    id: 3,
    code: "OT-01",
    type: "Occupational Therapy",
    description: "Occupational Therapy Services",
    eligiblePractitioners: "OT, COTA",
    status: "Active"
  },
  {
    id: 4,
    code: "PT-01",
    type: "Physical Therapy",
    description: "Physical Therapy Services",
    eligiblePractitioners: "PT, PTA",
    status: "Active"
  },
  {
    id: 5,
    code: "APE-01",
    type: "Adapted PE",
    description: "Adapted Physical Education Services",
    eligiblePractitioners: "APE",
    status: "Active"
  },
  {
    id: 6,
    code: "PSYC-01",
    type: "Psychology",
    description: "Educational Psychology Services",
    eligiblePractitioners: "PSYCH",
    status: "Active"
  }
]

// Mock data for permission types (same for both organizations)
const permissionTypesData = [
  {
    id: 1,
    type: "System",
    code: "ADMIN",
    description: "System Administrator permissions",
    status: "Active"
  },
  {
    id: 2,
    type: "System",
    code: "SUPERVISOR",
    description: "Supervisor permissions",
    status: "Active"
  },
  {
    id: 3,
    type: "System",
    code: "PRACTITIONER",
    description: "Practitioner permissions",
    status: "Active"
  }
]

// Mock data for payer info (organization-specific)
const feeSchedulePayerData = {
  organizationName: "Fee Schedule Organization",
  orpName: "Carelon Behavioral Health",
  orpNpiNumber: "1234567890",
  payerType: "Fee Schedule",
  status: "Active",
  effectiveDate: "2024-01-01",
  contactEmail: "admin@carelon.com"
}

const leaBopPayerData = {
  organizationName: "LEA-BOP Organization", 
  orpName: "Medi-Cal LEA-BOP",
  orpNpiNumber: "0987654321",
  payerType: "LEA-BOP",
  status: "Active",
  effectiveDate: "2024-01-01",
  contactEmail: "admin@medi-cal.ca.gov"
}

// Mock data for SPI files
const spiSentFiles = [
  {
    id: 1,
    fileName: "SPI_Claims_2024_01_15.xml",
    date: "2024-01-15",
    status: "Submitted",
    type: "sent"
  },
  {
    id: 2,
    fileName: "SPI_Claims_2024_01_08.xml",
    date: "2024-01-08",
    status: "Processed",
    type: "sent"
  },
  {
    id: 3,
    fileName: "SPI_Claims_2024_01_01.xml",
    date: "2024-01-01",
    status: "Processed",
    type: "sent"
  }
]

const spiReceivedFiles = [
  {
    id: 1,
    fileName: "SPI_Response_2024_01_15.xml",
    date: "2024-01-16",
    status: "Received",
    type: "received"
  },
  {
    id: 2,
    fileName: "SPI_Response_2024_01_08.xml",
    date: "2024-01-09",
    status: "Received",
    type: "received"
  }
]

// Mock data for Member batch files
const memberBatchSentFiles = [
  {
    id: 1,
    fileName: "Member_Batch_2024_01_15.csv",
    date: "2024-01-15",
    status: "Submitted",
    type: "sent"
  },
  {
    id: 2,
    fileName: "Member_Batch_2024_01_08.csv",
    date: "2024-01-08",
    status: "Processed",
    type: "sent"
  }
]

const memberBatchReceivedFiles = [
  {
    id: 1,
    fileName: "Member_Response_2024_01_15.csv",
    date: "2024-01-16",
    status: "Received",
    type: "received"
  }
]

export default function ManageOrganizationsPage() {
  const [activeTab, setActiveTab] = useState("payer-type-info")
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationType>("fee-schedule")
  const router = useRouter()

  // Get selected organization from localStorage
  useEffect(() => {
    const storedOrganization = localStorage.getItem("selectedOrganization") as OrganizationType
    setSelectedOrganization(storedOrganization || "fee-schedule")
  }, [])

  // Handle URL-based tab selection and organization-specific tab mapping
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get('tab')
    const urlTab = window.location.pathname.split('/').pop()
    
    // Priority: URL parameter > path-based tab
    const targetTab = tabParam || urlTab
    
    if (targetTab === "payer-config") {
      // Map payer-config to the organization-specific tab
      const mappedTab = selectedOrganization === "fee-schedule" ? "carelon" : "medi-cal"
      setActiveTab(mappedTab)
    } else if (targetTab && ["payer-type-info", "qualifications", "billing-codes", "permission-types", "carelon", "medi-cal"].includes(targetTab)) {
      setActiveTab(targetTab)
    }
  }, [selectedOrganization])

  const getCurrentData = () => {
    switch (activeTab) {
      case "qualifications":
        return selectedOrganization === "fee-schedule" ? feeScheduleQualifications : leaBopQualifications
      case "billing-codes":
        return selectedOrganization === "fee-schedule" ? feeScheduleBillingCodes : leaBopBillingCodes
      case "permission-types":
        return permissionTypesData
      default:
        return []
    }
  }

  const getCurrentPayerData = () => {
    return selectedOrganization === "fee-schedule" ? feeSchedulePayerData : leaBopPayerData
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "font-medium"
    switch (status) {
      case "Active":
        return `${baseClasses} bg-green-100 text-green-800`
      case "Archived":
        return `${baseClasses} bg-gray-100 text-gray-800`
      case "Submitted":
        return `${baseClasses} bg-blue-100 text-blue-800`
      case "Processed":
        return `${baseClasses} bg-green-100 text-green-800`
      case "Received":
        return `${baseClasses} bg-purple-100 text-purple-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getOrganizationLabel = (organization: OrganizationType) => {
    switch (organization) {
      case "fee-schedule":
        return "Fee Schedule"
      case "lea-bop":
        return "LEA-BOP"
      default:
        return "Fee Schedule"
    }
  }



  const handlePreview = (fileName: string) => {
    console.log(`Preview file: ${fileName}`)
  }

  const renderFileTable = (files: any[], title: string) => (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900">File Name</TableHead>
              <TableHead className="font-semibold text-gray-900">Date</TableHead>
              <TableHead className="font-semibold text-gray-900">Status</TableHead>
              <TableHead className="font-semibold text-gray-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{file.fileName}</TableCell>
                <TableCell>{file.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusBadge(file.status)}>
                    {file.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePreview(file.fileName)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  const renderPayerTypeInfo = () => {
    const payerData = getCurrentPayerData()
    
    return (
      <div className="space-y-6">
        <Card className="border-teal-200">
          <CardHeader className="bg-teal-50">
            <CardTitle className="text-teal-800">Organization Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Organization Name</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{payerData.organizationName}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">ORP Name</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{payerData.orpName}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">ORP NPI Number</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{payerData.orpNpiNumber}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Payer Type</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{payerData.payerType}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <Badge variant="secondary" className={getStatusBadge(payerData.status)}>
                    {payerData.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Effective Date</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{payerData.effectiveDate}</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Contact Email</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  <span className="text-gray-900">{payerData.contactEmail}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500 italic">
              Organization information is managed by your administrator and cannot be changed here.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCarelonFileManagement = () => (
    <div className="space-y-6">
      {/* Two cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SPI Files Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              SPI Files
            </CardTitle>
            <CardDescription>
              Manage Service Provider Interface files for claims submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-4">
              <Upload className="w-4 h-4 mr-2" />
              Upload SPI File
            </Button>
            
            {renderFileTable(spiSentFiles, "Sent Files")}
            {renderFileTable(spiReceivedFiles, "Received Files")}
          </CardContent>
        </Card>

        {/* Member Batch Files Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Member Batch Files
            </CardTitle>
            <CardDescription>
              Manage member batch files for enrollment and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-4">
              <Upload className="w-4 h-4 mr-2" />
              Upload Batch File
            </Button>
            
            {renderFileTable(memberBatchSentFiles, "Sent Files")}
            {renderFileTable(memberBatchReceivedFiles, "Received Files")}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-teal-800">Manage Organization</h1>
        <Badge className="bg-teal-100 text-teal-800 border-teal-200 font-medium">
          {getOrganizationLabel(selectedOrganization)}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-6">
          <TabsList className="bg-white border-b border-gray-200 w-full justify-start p-0 h-auto">
            <TabsTrigger 
              value="payer-type-info"
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              Payer Type Info
            </TabsTrigger>
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
              value="service-types"
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              Service Types
            </TabsTrigger>
            <TabsTrigger 
              value={selectedOrganization === "fee-schedule" ? "carelon" : "medi-cal"}
              className="data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent py-3 px-4"
            >
              {selectedOrganization === "fee-schedule" ? "Carelon" : "Medi-Cal"}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {activeTab === "payer-type-info" ? (
            renderPayerTypeInfo()
          ) : activeTab === "carelon" ? (
            renderCarelonFileManagement()
          ) : activeTab === "medi-cal" ? (
            renderPayerTypeInfo()
          ) : activeTab === "billing-codes" ? (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Add Billing Code
                </Button>
              </div>
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
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(selectedOrganization === "fee-schedule" ? feeScheduleBillingCodes : leaBopBillingCodes).map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.code}</TableCell>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell className="max-w-md">{item.description}</TableCell>
                      <TableCell className="font-medium">{item.unit}</TableCell>
                      <TableCell className="font-medium text-green-600">{item.rate}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {item.eligiblePractitioners}
                        </div>
                      </TableCell>
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
            </div>
          ) : activeTab === "service-types" ? (
            <div className="bg-white rounded-lg border">
                <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Code</TableHead>
                    <TableHead className="font-semibold text-gray-900">Type</TableHead>
                    <TableHead className="font-semibold text-gray-900">Description</TableHead>
                    <TableHead className="font-semibold text-gray-900">Eligible Practitioners</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(selectedOrganization === "fee-schedule" ? feeScheduleServiceTypes : leaBopServiceTypes).map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.code}</TableCell>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell className="max-w-md">{item.description}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {item.eligiblePractitioners}
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem className="text-teal-600">
                              {item.status === "Active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTab === "qualifications" && (
                <div className="flex justify-end">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Add Qualification
                  </Button>
                </div>
              )}
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
                  {(activeTab === "qualifications" 
                    ? (selectedOrganization === "fee-schedule" ? feeScheduleQualifications : leaBopQualifications)
                    : activeTab === "permission-types" 
                    ? permissionTypesData
                    : []
                  ).map((item) => (
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
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 