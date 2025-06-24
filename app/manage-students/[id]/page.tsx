"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Edit, Calendar } from "lucide-react"

// Mock student data - in a real app, this would come from an API
const mockStudentData = {
  1: {
    id: 1,
    firstName: "Samantha",
    lastName: "Greenfield",
    ssid: "43063894",
    localId: "11539764",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Junior High",
      grade: "8",
      address: "4371 Morningstar Drive, Belmont, CA 90311",
      contactName: "Jonathan Greenfield",
      contactNumber: "456-715-3852",
      relationship: "Parent",
      status: "Active"
    },
    billing: {
      primary: "Medi-Cal",
      insuranceCarrier: "Medi-Cal", 
      groupId: "7850244",
      policyId: "4469350",
      effectiveDate: "1/1/2024",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5889234",
      copayId: "35888273"
    },
    medical: {
      primaryDisability: "Speech",
      practitioner: "Bradley Brown",
      parentalConsentToTreat: {
        consented: true,
        date: "4/8/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "4/8/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "30 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      },
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/15/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "11/3/2024",
        end: "5/30/2025",
        district: "Fruitvale School District",
        school: "Fruitvale Junior High"
      },
      {
        year: "2024-2025",
        begin: "8/6/2024",
        end: "11/2/2024",
        district: "Fruitvale School District",
        school: "Discovery Elementary"
      },
      {
        year: "2023-2024",
        begin: "8/15/2023",
        end: "5/25/2024",
        district: "Arvin School District",
        school: "Sierra Vista Elementary"
      }
    ]
  },
  2: {
    id: 2,
    firstName: "Linda",
    lastName: "Hermann",
    ssid: "89200548",
    localId: "09772730",
    demographic: {
      birthdate: "03/15/2000",
      district: "Fruitvale School District",
      school: "Fruitvale High School",
      grade: "9",
      address: "1234 Oak Street, Fruitvale, CA 90123",
      contactName: "Maria Hermann",
      contactNumber: "808-696-4488",
      relationship: "Mother",
      status: "Active"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "Blue Cross",
      groupId: "1234567",
      policyId: "ABC123",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "Learning Disability",
      practitioner: "Sarah Johnson",
      parentalConsentToTreat: {
        consented: true,
        date: "3/10/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "3/10/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Sarah Johnson",
        serviceDate: "4/10/2025",
        service: "Educational Therapy",
        serviceType: "Individual Education Support",
        duration: "60 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale High School"
      }
    ]
  },
  3: {
    id: 3,
    firstName: "Jackie",
    lastName: "Hartmann",
    ssid: "54916084",
    localId: "18067794",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Elementary",
      grade: "5",
      address: "789 Pine Street, Fruitvale, CA 90123",
      contactName: "Robert Hartmann",
      contactNumber: "279-940-2099",
      relationship: "Father",
      status: "Active"
    },
    billing: {
      primary: "Medi-Cal",
      insuranceCarrier: "Medi-Cal",
      groupId: "7850245",
      policyId: "4469351",
      effectiveDate: "1/1/2024",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5889235",
      copayId: "35888274"
    },
    medical: {
      primaryDisability: "Learning Disability",
      practitioner: "Sarah Johnson",
      parentalConsentToTreat: {
        consented: true,
        date: "3/15/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "3/15/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Sarah Johnson",
        serviceDate: "4/12/2025",
        service: "Educational Therapy",
        serviceType: "Individual Education Support",
        duration: "45 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale Elementary"
      }
    ]
  },
  4: {
    id: 4,
    firstName: "Silvia",
    lastName: "Mann",
    ssid: "31647458",
    localId: "12353366",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Middle School",
      grade: "7",
      address: "456 Elm Avenue, Fruitvale, CA 90123",
      contactName: "Patricia Mann",
      contactNumber: "871-271-5559",
      relationship: "Mother",
      status: "Active"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "Aetna",
      groupId: "9876543",
      policyId: "XYZ789",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "Speech",
      practitioner: "Bradley Brown",
      parentalConsentToTreat: {
        consented: true,
        date: "2/20/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "2/20/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/11/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "30 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale Middle School"
      }
    ]
  },
  5: {
    id: 5,
    firstName: "Zachary",
    lastName: "Gulgowski",
    ssid: "41009025",
    localId: "33841572",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale High School",
      grade: "10",
      address: "123 Maple Drive, Fruitvale, CA 90123",
      contactName: "Jennifer Gulgowski",
      contactNumber: "654-290-5697",
      relationship: "Mother",
      status: "Active"
    },
    billing: {
      primary: "Medi-Cal",
      insuranceCarrier: "Medi-Cal",
      groupId: "7850246",
      policyId: "4469352",
      effectiveDate: "1/1/2024",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5889236",
      copayId: "35888275"
    },
    medical: {
      primaryDisability: "Autism",
      practitioner: "Dr. Emily Chen",
      parentalConsentToTreat: {
        consented: true,
        date: "1/10/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "1/10/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Dr. Emily Chen",
        serviceDate: "4/14/2025",
        service: "Behavioral Therapy",
        serviceType: "Individual Behavioral Support",
        duration: "60 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale High School"
      }
    ]
  },
  6: {
    id: 6,
    firstName: "Billie",
    lastName: "Labadie",
    ssid: "90900066",
    localId: "51157323",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Elementary",
      grade: "4",
      address: "987 Oak Lane, Fruitvale, CA 90123",
      contactName: "Michael Labadie",
      contactNumber: "316-602-3549",
      relationship: "Father",
      status: "Active"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "Kaiser Permanente",
      groupId: "5432167",
      policyId: "DEF456",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "Physical",
      practitioner: "Dr. Maria Rodriguez",
      parentalConsentToTreat: {
        consented: true,
        date: "3/25/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "3/25/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Dr. Maria Rodriguez",
        serviceDate: "4/13/2025",
        service: "Physical Therapy",
        serviceType: "Individual Physical Therapy",
        duration: "45 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale Elementary"
      }
    ]
  },
  7: {
    id: 7,
    firstName: "Angelica",
    lastName: "Conroy",
    ssid: "36601642",
    localId: "75820000",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Middle School",
      grade: "6",
      address: "654 Cedar Street, Fruitvale, CA 90123",
      contactName: "David Conroy",
      contactNumber: "558-850-9231",
      relationship: "Father",
      status: "Active"
    },
    billing: {
      primary: "Medi-Cal",
      insuranceCarrier: "Medi-Cal",
      groupId: "7850247",
      policyId: "4469353",
      effectiveDate: "1/1/2024",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5889237",
      copayId: "35888276"
    },
    medical: {
      primaryDisability: "Speech",
      practitioner: "Bradley Brown",
      parentalConsentToTreat: {
        consented: true,
        date: "2/14/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "2/14/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Bradley Brown",
        serviceDate: "4/16/2025",
        service: "Speech & Language Pathologist",
        serviceType: "92507 - SLP Individual Speech Therapy",
        duration: "45 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale Middle School"
      }
    ]
  },
  8: {
    id: 8,
    firstName: "Leonard",
    lastName: "Reynolds",
    ssid: "53226014",
    localId: "18943019",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale High School",
      grade: "11",
      address: "321 Birch Avenue, Fruitvale, CA 90123",
      contactName: "Sandra Reynolds",
      contactNumber: "817-289-8199",
      relationship: "Mother",
      status: "Active"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "United Healthcare",
      groupId: "1928374",
      policyId: "GHI789",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "Learning Disability",
      practitioner: "Sarah Johnson",
      parentalConsentToTreat: {
        consented: true,
        date: "1/30/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "1/30/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Sarah Johnson",
        serviceDate: "4/17/2025",
        service: "Educational Therapy",
        serviceType: "Individual Education Support",
        duration: "60 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale High School"
      }
    ]
  },
  9: {
    id: 9,
    firstName: "Rolando",
    lastName: "Jacobi",
    ssid: "15706860",
    localId: "34529790",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Elementary",
      grade: "3",
      address: "159 Willow Road, Fruitvale, CA 90123",
      contactName: "Carmen Jacobi",
      contactNumber: "717-747-6452",
      relationship: "Mother",
      status: "Active"
    },
    billing: {
      primary: "Medi-Cal",
      insuranceCarrier: "Medi-Cal",
      groupId: "7850248",
      policyId: "4469354",
      effectiveDate: "1/1/2024",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5889238",
      copayId: "35888277"
    },
    medical: {
      primaryDisability: "Developmental Delay",
      practitioner: "Dr. Emily Chen",
      parentalConsentToTreat: {
        consented: true,
        date: "2/28/2025"
      },
      parentalConsentToBill: {
        consented: true,
        date: "2/28/2025"
      }
    },
    serviceLogHistory: [
      {
        practitioner: "Dr. Emily Chen",
        serviceDate: "4/18/2025",
        service: "Developmental Therapy",
        serviceType: "Individual Developmental Support",
        duration: "45 minutes",
        location: "School"
      }
    ],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "6/15/2025",
        district: "Fruitvale School District",
        school: "Fruitvale Elementary"
      }
    ]
  },
  10: {
    id: 10,
    firstName: "Matt",
    lastName: "Wyman",
    ssid: "64372805",
    localId: "84706572",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Middle School",
      grade: "8",
      address: "753 Spruce Street, Fruitvale, CA 90123",
      contactName: "Lisa Wyman",
      contactNumber: "316-844-7189",
      relationship: "Mother",
      status: "Inactive"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "Cigna",
      groupId: "6547893",
      policyId: "JKL012",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "ADHD",
      practitioner: "Dr. James Wilson",
      parentalConsentToTreat: {
        consented: false,
        date: "N/A"
      },
      parentalConsentToBill: {
        consented: false,
        date: "N/A"
      }
    },
    serviceLogHistory: [],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "12/15/2024",
        district: "Fruitvale School District",
        school: "Fruitvale Middle School"
      }
    ]
  },
  11: {
    id: 11,
    firstName: "Jody",
    lastName: "Deckow",
    ssid: "01258369",
    localId: "21537095",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale High School",
      grade: "12",
      address: "852 Poplar Avenue, Fruitvale, CA 90123",
      contactName: "Kevin Deckow",
      contactNumber: "860-952-4302",
      relationship: "Father",
      status: "Inactive"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "Anthem",
      groupId: "3698521",
      policyId: "MNO345",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "Emotional Disturbance",
      practitioner: "Dr. Rachel Thompson",
      parentalConsentToTreat: {
        consented: false,
        date: "N/A"
      },
      parentalConsentToBill: {
        consented: false,
        date: "N/A"
      }
    },
    serviceLogHistory: [],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "11/30/2024",
        district: "Fruitvale School District",
        school: "Fruitvale High School"
      }
    ]
  },
  12: {
    id: 12,
    firstName: "Jason",
    lastName: "Koelpin",
    ssid: "74640060",
    localId: "41676362",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Elementary",
      grade: "2",
      address: "741 Chestnut Lane, Fruitvale, CA 90123",
      contactName: "Angela Koelpin",
      contactNumber: "765-944-7904",
      relationship: "Mother",
      status: "Inactive"
    },
    billing: {
      primary: "Medi-Cal",
      insuranceCarrier: "Medi-Cal",
      groupId: "7850249",
      policyId: "4469355",
      effectiveDate: "1/1/2024",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5889239",
      copayId: "35888278"
    },
    medical: {
      primaryDisability: "Speech",
      practitioner: "Bradley Brown",
      parentalConsentToTreat: {
        consented: false,
        date: "N/A"
      },
      parentalConsentToBill: {
        consented: false,
        date: "N/A"
      }
    },
    serviceLogHistory: [],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "10/31/2024",
        district: "Fruitvale School District",
        school: "Fruitvale Elementary"
      }
    ]
  },
  13: {
    id: 13,
    firstName: "Douglas",
    lastName: "Marks",
    ssid: "26102631",
    localId: "29758053",
    demographic: {
      birthdate: "10/25/1999",
      district: "Fruitvale School District",
      school: "Fruitvale Middle School",
      grade: "7",
      address: "963 Walnut Street, Fruitvale, CA 90123",
      contactName: "Susan Marks",
      contactNumber: "936-551-5653",
      relationship: "Mother",
      status: "Inactive"
    },
    billing: {
      primary: "Insurance",
      insuranceCarrier: "Humana",
      groupId: "7410852",
      policyId: "PQR678",
      effectiveDate: "1/1/2024",
      medicaidEligible: "No",
      medicaidBenefitsId: "N/A",
      copayId: "N/A"
    },
    medical: {
      primaryDisability: "Multiple Disabilities",
      practitioner: "Dr. Maria Rodriguez",
      parentalConsentToTreat: {
        consented: false,
        date: "N/A"
      },
      parentalConsentToBill: {
        consented: false,
        date: "N/A"
      }
    },
    serviceLogHistory: [],
    enrollmentHistory: [
      {
        year: "2024-2025",
        begin: "8/15/2024",
        end: "9/15/2024",
        district: "Fruitvale School District",
        school: "Fruitvale Middle School"
      }
    ]
  }
}

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("demographic")
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string
  
  // In a real app, you'd fetch this data based on the ID
  const student = mockStudentData[parseInt(studentId) as keyof typeof mockStudentData]
  
  if (!student) {
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
          <h1 className="text-2xl font-bold text-[#000000]">Student Not Found</h1>
        </div>
      </div>
    )
  }

  const handleScheduleService = () => {
    // Navigate to schedule service page with student pre-selected
    router.push(`/caseload/schedule-service?studentId=${studentId}`)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-[#000000]">Student Profile</h1>
        </div>
        <Button 
          onClick={handleScheduleService}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule service
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mr-4">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#000000]">
          {student.firstName} {student.lastName}
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-auto mb-8">
          <TabsTrigger 
            value="demographic" 
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Demographic
          </TabsTrigger>
          <TabsTrigger 
            value="medical" 
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Medical
          </TabsTrigger>
          <TabsTrigger 
            value="service-log" 
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Service Log History
          </TabsTrigger>
          <TabsTrigger 
            value="enrollment" 
            className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            Enrollment History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="demographic" className="space-y-6">
          <Card className="bg-teal-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Demographic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm opacity-80">Local ID</div>
                  <div className="font-semibold">{student.localId}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">District</div>
                  <div className="font-semibold">{student.demographic.district}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">School</div>
                  <div className="font-semibold">{student.demographic.school}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Grade</div>
                  <div className="font-semibold">{student.demographic.grade}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm opacity-80">Birthdate</div>
                  <div className="font-semibold">{student.demographic.birthdate}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Sex</div>
                  <div className="font-semibold">Female</div>
                </div>
              </div>
              <div>
                <div className="text-sm opacity-80">Address</div>
                <div className="font-semibold">{student.demographic.address}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm opacity-80">Primary Contact</div>
                  <div className="font-semibold">{student.demographic.contactName}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Contact Number</div>
                  <div className="font-semibold">{student.demographic.contactNumber}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Relationship</div>
                  <div className="font-semibold">{student.demographic.relationship}</div>
                </div>
              </div>
              <div>
                <div className="text-sm opacity-80">Status</div>
                <Badge 
                  variant="secondary"
                  className="bg-white text-teal-600 hover:bg-gray-100"
                >
                  {student.demographic.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-teal-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Billing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm opacity-80">Primary</div>
                  <div className="font-semibold">{student.billing.primary}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Insurance Carrier</div>
                  <div className="font-semibold">{student.billing.insuranceCarrier}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Group ID</div>
                  <div className="font-semibold">{student.billing.groupId}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Policy ID</div>
                  <div className="font-semibold">{student.billing.policyId}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Effective Date</div>
                  <div className="font-semibold">{student.billing.effectiveDate}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm opacity-80">Medicaid Eligible</div>
                  <div className="font-semibold">{student.billing.medicaidEligible}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Medicaid Benefits ID</div>
                  <div className="font-semibold">{student.billing.medicaidBenefitsId}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Copay ID</div>
                  <div className="font-semibold">{student.billing.copayId}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6">
          <Card className="bg-teal-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Medical</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm opacity-80">Primary Disability</div>
                  <div className="font-semibold">{student.medical.primaryDisability}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Practitioner (s)</div>
                  <div className="font-semibold">{student.medical.practitioner}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm opacity-80">Parental Consent to Treat</div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className="bg-white text-teal-600 hover:bg-gray-100"
                    >
                      Consented
                    </Badge>
                    <span className="font-semibold">{student.medical.parentalConsentToTreat.date}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Parental Consent to Bill</div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className="bg-white text-teal-600 hover:bg-gray-100"
                    >
                      Consented
                    </Badge>
                    <span className="font-semibold">{student.medical.parentalConsentToBill.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service-log" className="space-y-6">
          <Card className="bg-teal-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Service Log History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Practitioner</TableHead>
                      <TableHead className="font-semibold text-gray-900">Service Date</TableHead>
                      <TableHead className="font-semibold text-gray-900">Service</TableHead>
                      <TableHead className="font-semibold text-gray-900">Service Type</TableHead>
                      <TableHead className="font-semibold text-gray-900">Duration</TableHead>
                      <TableHead className="font-semibold text-gray-900">Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.serviceLogHistory.map((log, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-gray-900">{log.practitioner}</TableCell>
                        <TableCell className="text-gray-900">{log.serviceDate}</TableCell>
                        <TableCell className="text-gray-900">{log.service}</TableCell>
                        <TableCell className="text-gray-900">{log.serviceType}</TableCell>
                        <TableCell className="text-gray-900">{log.duration}</TableCell>
                        <TableCell className="text-gray-900">{log.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-6">
          <Card className="bg-teal-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Enrollment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Year</TableHead>
                      <TableHead className="font-semibold text-gray-900">Begin</TableHead>
                      <TableHead className="font-semibold text-gray-900">End</TableHead>
                      <TableHead className="font-semibold text-gray-900">District</TableHead>
                      <TableHead className="font-semibold text-gray-900">School</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.enrollmentHistory.map((enrollment, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-gray-900">{enrollment.year}</TableCell>
                        <TableCell className="text-gray-900">{enrollment.begin}</TableCell>
                        <TableCell className="text-gray-900">{enrollment.end}</TableCell>
                        <TableCell className="text-gray-900">{enrollment.district}</TableCell>
                        <TableCell className="text-gray-900">{enrollment.school}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 