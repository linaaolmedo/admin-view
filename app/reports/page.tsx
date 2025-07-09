"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  FileText, 
  Download, 
  Play, 
  BarChart3,
  Users,
  ClipboardList,
  TrendingUp,
  PieChart,
  Calendar as CalendarIcon,
  DollarSign,
  Activity,
  BookOpen,
  Clock,
  Building,
  UserCheck,
  Eye,
  Save,
  Filter,
  Settings,
  Plus,
  X
} from "lucide-react"
import { format } from "date-fns"

// Canned reports data
const cannedReports = [
  {
    id: "claims-report",
    title: "Paid Claims Report",
    lastGenerated: "2024-03-12",
    format: ["PDF", "Excel"],
    previewUrl: "/claims/paid-claims-report"
  },
  {
    id: "qualifications-report",
    title: "Qualifications Report",
    lastGenerated: "2024-03-10",
    format: ["PDF", "Excel"],
    previewUrl: "/reports/qualifications"
  },
  {
    id: "user-history-report",
    title: "User History Report",
    lastGenerated: "2024-03-11",
    format: ["PDF", "Excel"],
    previewUrl: "/reports/user-history"
  }
]



export default function ReportsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("canned")
  
  // Report Builder state
  const [reportType, setReportType] = useState("")
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined })
  const [filters, setFilters] = useState<Array<{ field: string; operator: string; value: string }>>([])
  const [reportName, setReportName] = useState("")

  const handleGenerateReport = (reportId: string) => {
    // Mock report generation
    console.log(`Generating report: ${reportId}`)
    alert("Report generated successfully! (This would normally generate and download the report)")
  }

  const handlePreviewReport = (previewUrl: string) => {
    router.push(previewUrl)
  }

  // Report Builder functions
  const reportTypes = [
    { value: "claims", label: "Claims Report", icon: FileText },
    { value: "services", label: "Services Report", icon: ClipboardList },
    { value: "practitioners", label: "Practitioners Report", icon: Users },
    { value: "students", label: "Students Report", icon: Users },
    { value: "qualifications", label: "Qualifications Report", icon: TrendingUp },
    { value: "billing", label: "Billing Report", icon: PieChart },
  ]

  const availableFields = {
    claims: [
      "Claim ID", "Student Name", "Practitioner", "Service Date", "Service Type", 
      "Billing Code", "Amount", "Status", "Submission Date", "District"
    ],
    services: [
      "Service ID", "Student Name", "Practitioner", "Service Date", "Service Type",
      "Duration", "Location", "Status", "Notes", "Billing Status"
    ],
    practitioners: [
      "Practitioner Name", "Email", "NPI", "Qualifications", "Districts", 
      "Active Status", "Hire Date", "Total Services", "Specializations"
    ],
    students: [
      "Student Name", "Student ID", "Grade", "District", "School", "IEP Status",
      "Services Received", "Last Service Date", "Active Status"
    ],
    qualifications: [
      "Practitioner", "Qualification Type", "Certification Number", "Issue Date",
      "Expiration Date", "Status", "Renewal Required", "District"
    ],
    billing: [
      "Billing Period", "Total Amount", "Submitted Claims", "Paid Claims", 
      "Pending Claims", "Rejected Claims", "District", "Service Type"
    ]
  }

  const handleFieldToggle = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    )
  }

  const addFilter = () => {
    setFilters(prev => [...prev, { field: "", operator: "equals", value: "" }])
  }

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index))
  }

  const updateFilter = (index: number, key: string, value: string) => {
    setFilters(prev => prev.map((filter, i) => 
      i === index ? { ...filter, [key]: value } : filter
    ))
  }

  const generateCustomReport = () => {
    // Mock report generation
    console.log("Generating report with:", {
      reportType,
      selectedFields,
      dateRange,
      filters,
      reportName
    })
    alert("Report generated successfully! (This would normally generate and download the report)")
  }

  const saveReportTemplate = () => {
    // Mock save functionality
    console.log("Saving report template:", { reportName, reportType, selectedFields, filters })
    alert("Report template saved successfully!")
  }



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-teal-800">Reports Dashboard</h1>
          <p className="text-slate-600 mt-1">Access standardized reports and build custom analytics</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="canned">
            <FileText className="w-4 h-4 mr-2" />
            Canned Reports
          </TabsTrigger>
          <TabsTrigger value="builder">
            <BarChart3 className="w-4 h-4 mr-2" />
            Report Builder
          </TabsTrigger>
        </TabsList>

        {/* Canned Reports Tab */}
        <TabsContent value="canned" className="mt-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Pre-Built Reports</h2>
              <p className="text-sm text-gray-600 mt-1">Standardized reports ready for immediate use</p>
            </div>

            {/* Reports Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Formats</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cannedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        <span className="font-semibold">{report.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {report.format.map((fmt) => (
                            <Badge key={fmt} variant="outline" className="text-xs">
                              {fmt}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePreviewReport(report.previewUrl)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleGenerateReport(report.id)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Report Builder Tab */}
        <TabsContent value="builder" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Custom Report Builder</h2>
                <p className="text-sm text-gray-600 mt-1">Create custom reports with advanced filtering and data selection</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={saveReportTemplate} disabled={!reportName || !reportType}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Template
                </Button>
                <Button onClick={generateCustomReport} disabled={!reportType || selectedFields.length === 0}>
                  <Play className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Report Builder Interface */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Configuration */}
                <div className="space-y-6">
                  {/* Report Type Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Report Type</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {reportTypes.map((type) => {
                          const IconComponent = type.icon
                          return (
                            <div
                              key={type.value}
                              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                reportType === type.value 
                                  ? "border-teal-500 bg-teal-50" 
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => {
                                setReportType(type.value)
                                setSelectedFields([])
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                <IconComponent className="w-5 h-5 text-teal-600" />
                                <span className="font-medium text-sm">{type.label}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Report Name */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Report Name</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        placeholder="Enter report name..."
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                      />
                    </CardContent>
                  </Card>

                  {/* Date Range */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Date Range</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label>From Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRange.from}
                                onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex-1">
                          <Label>To Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRange.to}
                                onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Fields and Filters */}
                <div className="space-y-6">
                  {/* Field Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Select Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {reportType ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {availableFields[reportType as keyof typeof availableFields]?.map((field) => (
                            <div key={field} className="flex items-center space-x-2">
                              <Checkbox
                                id={field}
                                checked={selectedFields.includes(field)}
                                onCheckedChange={() => handleFieldToggle(field)}
                              />
                              <Label htmlFor={field} className="text-sm font-normal cursor-pointer">
                                {field}
                              </Label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">Select a report type to choose fields</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Filters */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Filters</CardTitle>
                      <Button variant="outline" size="sm" onClick={addFilter}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Filter
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {filters.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No filters applied</p>
                      ) : (
                        <div className="space-y-3">
                          {filters.map((filter, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <Select 
                                value={filter.field} 
                                onValueChange={(value) => updateFilter(index, 'field', value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Field" />
                                </SelectTrigger>
                                <SelectContent>
                                  {reportType && availableFields[reportType as keyof typeof availableFields]?.map((field) => (
                                    <SelectItem key={field} value={field}>{field}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select 
                                value={filter.operator} 
                                onValueChange={(value) => updateFilter(index, 'operator', value)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equals">Equals</SelectItem>
                                  <SelectItem value="contains">Contains</SelectItem>
                                  <SelectItem value="greater">Greater than</SelectItem>
                                  <SelectItem value="less">Less than</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                placeholder="Value"
                                value={filter.value}
                                onChange={(e) => updateFilter(index, 'value', e.target.value)}
                                className="flex-1"
                              />
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeFilter(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Preview Section */}
              {reportType && selectedFields.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {selectedFields.map((field) => (
                          <Badge key={field} variant="secondary" className="bg-teal-100 text-teal-800">
                            {field}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-4">
                        Report will include {selectedFields.length} fields
                        {filters.length > 0 && ` with ${filters.length} filter(s) applied`}
                        {dateRange.from && dateRange.to && ` for the period ${format(dateRange.from, "PPP")} to ${format(dateRange.to, "PPP")}`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Report History Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report History</CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-[#787878] mb-4">No report history found.</p>
                  <p className="text-sm text-gray-500">Generated reports will appear here for easy access and re-download.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>




      </Tabs>
    </div>
  )
}
