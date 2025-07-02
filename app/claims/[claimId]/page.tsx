"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

// Mock detailed claim data - in a real app, this would come from an API
const getClaimDetails = (claimId: string) => {
  return {
    claimNumber: claimId,
    status: "SUBMITTED",
    batchNumber: "987654321",
    billedAmount: "$90.00",
    frequencyType: "Admit through Discharge",
    referringProvider: "Jeffrey Coggan",
    referringProviderNPI: "1569632487",
    renderingProvider: "Bradley Brown",
    renderingProviderNPI: "458963258",
    serviceDate: "3/15/2025",
    location: "03 - School",
    serviceCode: "H2027",
    serviceDescription: "Individual - Health behavior intervention",
    quantity: "3",
    quantityType: "UN - Unit",
    studentInfo: {
      ssid: "45896355",
      name: "Greenfield, Samantha",
      dob: "1/2/1999",
      parentalConsentToTreat: "Yes",
      parentalConsentToBill: "Yes",
      insuranceType: "Primary",
      insuranceCarrier: "Medi-cal",
      groupNumber: "7856244",
      policyNumber: "4469350",
      medicaidEligible: "Yes",
      medicaidBenefitsId: "5689234",
      carelonId: "35888273",
      diagnosisCode: "??????"
    },
    claimActivity: [
      {
        date: "4/2/2025",
        status: "NEEDS APPROVAL",
        action: "Created",
        comment: "System marked this as needs approval."
      },
      {
        date: "4/5/2025", 
        status: "APPROVED",
        action: "Marked as Approved",
        comment: "Cassandra Beck marked this as approved."
      },
      {
        date: "4/5/2025",
        status: "SUBMITTED", 
        action: "Submitted for billing",
        comment: "Cassandra Beck submitted this for billing."
      }
    ]
  }
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200"
      case "NEEDS APPROVAL":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200"
      case "PAID":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge className={`${getStatusStyles(status)} border px-3 py-1`}>
      {status}
    </Badge>
  )
}

export default function ClaimStatusPage() {
  const params = useParams()
  const router = useRouter()
  const claimId = params.claimId as string
  
  const claimDetails = getClaimDetails(claimId)

  return (
    <div className="p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Claim Status</h1>
          <StatusBadge status={claimDetails.status} />
        </div>
      </div>

      {/* Claim Information Section */}
      <div className="mb-6">
        <div className="bg-blue-100 rounded-t-lg px-4 py-3">
          <h2 className="text-lg font-semibold text-blue-900">Claim Information</h2>
        </div>
        <div className="bg-gray-50 rounded-b-lg p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Claim #</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.claimNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Batch #</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.batchNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Billed Amount</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.billedAmount}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Frequency Type</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.frequencyType}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Referring Provider / ORP</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.referringProvider}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Referring Provider / ORP NPI</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.referringProviderNPI}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Rendering Provider</label>
              <p className="text-sm font-semibold text-gray-900">
                <Link href={`/manage-users/1`} className="text-teal-600 hover:underline">
                  {claimDetails.renderingProvider}
                </Link>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Rendering Provider NPI</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.renderingProviderNPI}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Information Section */}
      <div className="mb-6">
        <div className="bg-blue-100 rounded-t-lg px-4 py-3">
          <h2 className="text-lg font-semibold text-blue-900">Service Information</h2>
        </div>
        <div className="bg-gray-50 rounded-b-lg p-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Date of Service</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.serviceDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Location</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.location}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Service Code</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.serviceCode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Service Description</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.serviceDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Quantity</label>
                <p className="text-sm font-semibold text-gray-900">{claimDetails.quantity}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Quantity Type</label>
                <p className="text-sm font-semibold text-gray-900">{claimDetails.quantityType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Information Section */}
      <div className="mb-6">
        <div className="bg-blue-100 rounded-t-lg px-4 py-3">
          <h2 className="text-lg font-semibold text-blue-900">Student Information</h2>
        </div>
        <div className="bg-gray-50 rounded-b-lg p-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">SSID</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.ssid}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-sm font-semibold text-gray-900">
                <Link href={`/manage-students/1`} className="text-teal-600 hover:underline">
                  {claimDetails.studentInfo.name}
                </Link>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">DOB</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.dob}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Parental Consent to Treat</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.parentalConsentToTreat}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Parental Consent to Bill</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.parentalConsentToBill}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Insurance Type</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.insuranceType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Insurance Carrier</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.insuranceCarrier}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Group #</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.groupNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Policy #</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.policyNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Medicaid Eligible</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.medicaidEligible}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Medicaid Benefits ID</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.medicaidBenefitsId}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Carelon ID</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.carelonId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Diagnosis Code</label>
              <p className="text-sm font-semibold text-gray-900">{claimDetails.studentInfo.diagnosisCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Activity Section */}
      <div className="mb-6">
        <div className="bg-blue-100 rounded-t-lg px-4 py-3">
          <h2 className="text-lg font-semibold text-blue-900">Claim Activity</h2>
        </div>
        <div className="bg-gray-50 rounded-b-lg p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 font-medium text-gray-600">Action</th>
                  <th className="text-left py-3 font-medium text-gray-600">Comment</th>
                </tr>
              </thead>
              <tbody>
                {claimDetails.claimActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 text-sm text-gray-900">{activity.date}</td>
                    <td className="py-3">
                      <StatusBadge status={activity.status} />
                    </td>
                    <td className="py-3 text-sm text-gray-900">{activity.action}</td>
                    <td className="py-3 text-sm text-gray-900">{activity.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 