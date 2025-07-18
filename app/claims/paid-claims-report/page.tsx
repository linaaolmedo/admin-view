"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useTableSorting } from "@/hooks/use-table-sorting"

// Mock paid claims data
const paidClaimsData = [
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "60016988",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "18454219",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "69033438",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "90417335",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "65385159",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "46549373",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "94242963",
    claimNumber: "24325645",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "43063894",
    claimNumber: "08829134",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "43063894",
    claimNumber: "97080429",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "43063894",
    claimNumber: "86824913",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "43063894",
    claimNumber: "65566078",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  },
  {
    status: "PAID",
    finalizedDate: "02/20/2023",
    serviceDate: "02/01/2023",
    batchNumber: "43063894",
    claimNumber: "19843799",
    practitioner: "Brown, Bradley",
    district: "Fruitvale",
    ssid: "43063894",
    studentName: "Greenfield, Samantha",
    billedAmount: "$120.00",
    paidAmount: "$120.00",
  }
]

export default function PaidClaimsReportPage() {
  const router = useRouter()
  
  const { sortedData, getSortIcon, getSortableHeaderProps } = useTableSorting(
    paidClaimsData,
    "finalizedDate",
    "desc"
  )

  const handleExport = () => {
    console.log("Exporting paid claims data...")
    alert("Export functionality would be implemented here")
  }

  const handleBack = () => {
    router.push("/reports")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-teal-800">Paid Claims Report</h1>
            <p className="text-sm text-gray-600">Paid claims with finalized payment information</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleExport} className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("status")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("finalizedDate")}
                >
                  <div className="flex items-center gap-1">
                    Finalized Date
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("finalizedDate")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("serviceDate")}
                >
                  <div className="flex items-center gap-1">
                    Service Date
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("serviceDate")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("batchNumber")}
                >
                  <div className="flex items-center gap-1">
                    Batch #
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("batchNumber")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("claimNumber")}
                >
                  <div className="flex items-center gap-1">
                    Claim #
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("claimNumber")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("practitioner")}
                >
                  <div className="flex items-center gap-1">
                    Practitioner
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("practitioner")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("district")}
                >
                  <div className="flex items-center gap-1">
                    District
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("district")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  {...getSortableHeaderProps("ssid")}
                >
                  <div className="flex items-center gap-1">
                    SSID
                    {(() => {
                      const { icon: Icon, className } = getSortIcon("ssid")
                      return <Icon className={className} />
                    })()}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((claim, index) => (
                <tr key={claim.claimNumber} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 text-sm">
                    <Badge className="bg-green-500 text-white px-3 py-1 rounded-full">
                      Paid
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="whitespace-nowrap">
                      {claim.finalizedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="whitespace-nowrap">
                      {claim.serviceDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="whitespace-nowrap">
                      {claim.batchNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="whitespace-nowrap">
                      {claim.claimNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="leading-5 whitespace-nowrap">
                      {claim.practitioner}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="leading-5 whitespace-nowrap">
                      {claim.district}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="whitespace-nowrap">
                      {claim.ssid}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 