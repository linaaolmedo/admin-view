import {
  ArrowLeft,
  Edit,
  User,
  LogOut,
  FileText,
  Users,
  GraduationCap,
  ClipboardList,
  Briefcase,
  BarChart3,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation"
import { useTableSorting } from "@/hooks/use-table-sorting"

// Mock data for the homepage table
const mockCaseloadData = [
  { id: 1, ssid: "96759512", name: "Philip Shields", dob: "10/18/1998", district: "Fruitvale", dateOfLastService: "3/12/2025" },
  { id: 2, ssid: "98587232", name: "Georgia Fritsch", dob: "10/25/1999", district: "Fruitvale", dateOfLastService: "3/09/2025" },
  { id: 3, ssid: "76253606", name: "Marshall Weber", dob: "2/20/1999", district: "Di Giorgio", dateOfLastService: "3/03/2025" },
  { id: 4, ssid: "54102726", name: "Jodi Welch", dob: "3/17/1998", district: "Di Giorgio", dateOfLastService: "4/2/2025" },
]

export default function HomePage() {
  redirect("/dashboard")
  
  const { sortedData, getSortIcon, getSortableHeaderProps } = useTableSorting(
    mockCaseloadData,
    "dateOfLastService",
    "desc"
  )

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="bg-[#131837] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">KIDS</span>
          <span className="text-[#4286f4]">✗</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>Cassandra Beck</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-teal-700 text-white min-h-screen">
          <nav className="p-4 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <FileText className="w-5 h-5" />
              <span>Claims</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Manage Users</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <GraduationCap className="w-5 h-5" />
              <span>Manage Students</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <ClipboardList className="w-5 h-5" />
              <span>Log a Service</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <Briefcase className="w-5 h-5" />
              <span>Caseload</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <Users className="w-5 h-5" />
              <span>Student Services</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <BarChart3 className="w-5 h-5" />
              <span>Reports</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
              <Settings className="w-5 h-5" />
              <span>Configurations</span>
            </div>
          </nav>

          <div className="absolute bottom-4 left-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-white border-white hover:bg-white hover:text-[#2f3a83]"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-teal-800">Cassandra Beck</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Edit className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b">
            <button className="pb-2 px-1 text-[#4286f4] border-b-2 border-[#4286f4] font-medium">About</button>
            <button className="pb-2 px-1 text-[#787878] hover:text-[#4286f4]">Qualifications and Services</button>
            <button className="pb-2 px-1 text-[#787878] hover:text-[#4286f4]">Caseload Management</button>
          </div>

          {/* About Section */}
          <Card className="mb-6">
            <CardHeader className="bg-[#7a8dff] text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">About</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-[#787878]">Email</label>
                  <p className="text-[#000000]">cabeck@kern.org</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">Phone Number</label>
                  <p className="text-[#000000]">661-626-4177</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">Permission Type</label>
                  <p className="text-[#000000]">Normal User</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">Status</label>
                  <p className="text-[#000000]">Active</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-[#787878]">District</label>
                  <p className="text-[#000000]">Norris School District</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">NPI</label>
                  <p className="text-[#000000]">59261767</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">Carelon ID</label>
                  <p className="text-[#000000]">70045902</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-[#787878]">Supervisor</label>
                  <p className="text-[#000000]">Stacey Durgan</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">Federally Funded</label>
                  <p className="text-[#000000]">No</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#787878]">Effective Date</label>
                  <p className="text-[#000000]">8/5/2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Qualifications and Services Section */}
          <Card className="mb-6">
            <CardHeader className="bg-[#7a8dff] text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">Qualifications and Services</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-[#000000]">Qualifications</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-sm font-medium text-[#787878] border-b pb-2">
                      <span>Type</span>
                      <span className="col-span-2">Code</span>
                      <span>Start Date</span>
                      <span>End Date</span>
                      <span>Status</span>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <span className="text-[#000000]">License</span>
                      <span className="col-span-2 text-[#000000]">
                        RN - Registered Nurse, including Credentialed School Nurses
                      </span>
                      <span className="text-[#000000]">2/5/2025</span>
                      <span className="text-[#000000]">2/5/2026</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <span className="text-[#000000]">License</span>
                      <span className="col-span-2 text-[#000000]">
                        RN - Registered Nurse, including Credentialed School Nurses
                      </span>
                      <span className="text-[#000000]">2/5/2024</span>
                      <span className="text-[#000000]">2/5/2025</span>
                      <Badge className="bg-red-100 text-red-800">Expired</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-[#000000]">Services</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-[#000000]">Speech and pathology</div>
                    <div className="text-sm text-[#000000]">Speech and pathology</div>
                    <div className="text-sm text-[#000000]">Speech and pathology</div>
                    <div className="text-sm text-[#000000]">Speech and pathology</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Caseload Management Section */}
          <Card>
            <CardHeader className="bg-[#7a8dff] text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">Caseload Management</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th 
                        className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100"
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
                      <th 
                        className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100"
                        {...getSortableHeaderProps("name")}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {(() => {
                            const { icon: Icon, className } = getSortIcon("name")
                            return <Icon className={className} />
                          })()}
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100"
                        {...getSortableHeaderProps("dob")}
                      >
                        <div className="flex items-center gap-1">
                          DOB
                          {(() => {
                            const { icon: Icon, className } = getSortIcon("dob")
                            return <Icon className={className} />
                          })()}
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100"
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
                        className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100"
                        {...getSortableHeaderProps("dateOfLastService")}
                      >
                        <div className="flex items-center gap-1">
                          Date of Last Service
                          {(() => {
                            const { icon: Icon, className } = getSortIcon("dateOfLastService")
                            return <Icon className={className} />
                          })()}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item, index) => (
                      <tr key={item.id} className={index < sortedData.length - 1 ? "border-b" : ""}>
                        <td className="py-3 px-4 text-[#000000]">{item.ssid}</td>
                        <td className="py-3 px-4 text-[#000000]">{item.name}</td>
                        <td className="py-3 px-4 text-[#000000]">{item.dob}</td>
                        <td className="py-3 px-4 text-[#000000]">{item.district}</td>
                        <td className="py-3 px-4 text-[#000000]">{item.dateOfLastService}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
