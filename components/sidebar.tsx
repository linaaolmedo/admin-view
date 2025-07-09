"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LogOut,
  FileText,
  Users2,
  Clipboard,
  Briefcase,
  Download,
  ChevronUp,
  ChevronDown,
  PanelLeft,
  Building2,
  Calendar,
  UserCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const claimsSubItems = [
  { href: "/claims/not-paid", label: "Not paid" },
  { href: "/claims/paid", label: "Paid" },
  { href: "/claims/ready-to-submit", label: "Ready to submit" },
  { href: "/claims/incomplete", label: "Incomplete" },
]

const manageUsersSubItems = [
  { href: "/manage-users/all", label: "All" },
  { href: "/manage-users/practitioners", label: "Practitioners" },
  { href: "/manage-users/supervisors", label: "Supervisors" },
  { href: "/manage-users/administrators", label: "Administrators" },
]

const manageStudentsSubItems = [
  { href: "/manage-students/search", label: "Search" },
  { href: "/manage-students/add", label: "Add" },
]

const getManageOrganizationsSubItems = (selectedOrganization: string) => [
  { href: "/manage-organizations/payer-type-info", label: "Payer Type Info" },
  { href: "/manage-organizations/qualifications", label: "Qualifications" },
  { href: "/manage-organizations/billing-codes", label: "Billing Codes" },
  { href: "/manage-organizations/permission-types", label: "Permission Types" },
  { 
    href: selectedOrganization === "fee-schedule" ? "/manage-organizations/carelon" : "/manage-organizations/medi-cal", 
    label: selectedOrganization === "fee-schedule" ? "Carelon" : "Medi-Cal"
  },
]

const caseloadSubItems = [
  { href: "/caseload/view", label: "View" },
  { href: "/caseload/groups", label: "Groups" },
  { href: "/caseload/manage", label: "Manage" },
]

const baseStudentServicesSubItems = [
  { href: "/student-services/my-calendar", label: "My calendar" },
  { href: "/student-services/all-services", label: "All services" },
  { href: "/student-services/log-service", label: "Log service" },
  { href: "/student-services/schedule-service", label: "Schedule service" },
]

const supervisorOnlySubItems = [
  { href: "/student-services/supervisor-logs", label: "Supervisor Logs" },
]

const reportsSubItems = [
  { href: "/reports", label: "Canned reports" },
  { href: "/reports/report-builder", label: "Report builder" }
]



type AccountType = "administrator" | "practitioner" | "supervisor"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState("fee-schedule")

  // Initialize collapsed state from localStorage
  useEffect(() => {
    const collapsed = localStorage.getItem("sidebarCollapsed") === "true"
    setIsCollapsed(collapsed)
  }, [])
  const [accountType, setAccountType] = useState<AccountType | null>(null)

  // Get selected organization from localStorage
  useEffect(() => {
    const storedOrganization = localStorage.getItem("selectedOrganization") || "fee-schedule"
    setSelectedOrganization(storedOrganization)
  }, [])
  
  // State for dropdown menus
  const [isClaimsOpen, setIsClaimsOpen] = useState(pathname.startsWith("/claims"))
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(pathname.startsWith("/manage-users"))
  const [isManageStudentsOpen, setIsManageStudentsOpen] = useState(pathname.startsWith("/manage-students"))
  const [isManageOrganizationsOpen, setIsManageOrganizationsOpen] = useState(pathname.startsWith("/manage-organizations"))
  const [isCaseloadOpen, setIsCaseloadOpen] = useState(pathname.startsWith("/caseload"))
  const [isStudentServicesOpen, setIsStudentServicesOpen] = useState(pathname.startsWith("/student-services"))
  const [isReportsOpen, setIsReportsOpen] = useState(pathname.startsWith("/reports"))

  // Get account type from localStorage on component mount
  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") as AccountType
    setAccountType(storedAccountType || "practitioner") // Default to practitioner if not set
  }, [])

  // Build student services sub items based on account type
  const getStudentServicesSubItems = () => {
    let items = [...baseStudentServicesSubItems]
    
    // Only add supervisor-only items for supervisors
    if (accountType === "supervisor") {
      items = [...items, ...supervisorOnlySubItems]
    }
    
    return items
  }

  // Don't show sidebar on login page
  if (pathname === "/login") {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("accountType")
    router.push("/login")
  }

  // Define which navigation items should be shown for each account type
  const getVisibleNavItems = () => {
    if (!accountType) return []

    switch (accountType) {
      case "administrator":
        return ["claims", "manageUsers", "manageStudents", "reports", "manageOrganizations"]
      case "supervisor":
        return ["logService", "caseload", "studentServices", "assignedPractitioners", "reports"]
      case "practitioner":
        return ["logService", "caseload", "studentServices", "reports"]
      default:
        return []
    }
  }

  const visibleItems = getVisibleNavItems()
  const studentServicesSubItems = getStudentServicesSubItems()
  const manageOrganizationsSubItems = getManageOrganizationsSubItems(selectedOrganization)

  return (
    <aside className={`fixed left-0 top-0 ${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-cyan-500 to-teal-600 text-white h-screen flex flex-col transition-all duration-300 shadow-lg z-40`}>
      {/* Header spacer */}
      <div className="h-16"></div>
      
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const newCollapsed = !isCollapsed
            setIsCollapsed(newCollapsed)
            localStorage.setItem("sidebarCollapsed", newCollapsed.toString())
            // Emit custom event to notify layout
            window.dispatchEvent(new CustomEvent("sidebarToggle", { 
              detail: { collapsed: newCollapsed } 
            }))
          }}
          className="text-white hover:bg-white/20 hover:text-white p-1"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
      </div>
      
      <nav className={`${isCollapsed ? 'px-2' : 'px-4'} flex-1 space-y-2 overflow-y-auto`}>
        {/* Claims Dropdown - Only for Administrators */}
        {visibleItems.includes("claims") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/claims"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/claims") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Claims"
              >
                <FileText className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/claims"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/claims") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span>Claims</span>
                  </Link>
                  <button
                    onClick={() => setIsClaimsOpen(!isClaimsOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/claims") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isClaimsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isClaimsOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {claimsSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Manage Users Dropdown - Only for Administrators */}
        {visibleItems.includes("manageUsers") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/manage-users"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/manage-users") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Manage Users"
              >
                <Users2 className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/manage-users"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/manage-users") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Users2 className="w-5 h-5" />
                    <span>Manage Users</span>
                  </Link>
                  <button
                    onClick={() => setIsManageUsersOpen(!isManageUsersOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/manage-users") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isManageUsersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isManageUsersOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {manageUsersSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Manage Students Dropdown - Only for Administrators */}
        {visibleItems.includes("manageStudents") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/manage-students"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/manage-students") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Manage Students"
              >
                <Clipboard className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/manage-students"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/manage-students") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Clipboard className="w-5 h-5" />
                    <span>Manage Students</span>
                  </Link>
                  <button
                    onClick={() => setIsManageStudentsOpen(!isManageStudentsOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/manage-students") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isManageStudentsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isManageStudentsOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {manageStudentsSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Log a Service - For Supervisors and Practitioners */}
        {visibleItems.includes("logService") && (
          <div>
            <Link
              href="/log-service"
              className={`${isCollapsed ? 'flex items-center justify-center p-3' : 'flex items-center gap-3 px-3 py-2'} rounded transition-colors ${
                pathname === "/log-service" ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
              }`}
              title={isCollapsed ? "Log a Service" : undefined}
            >
              <Calendar className="w-5 h-5" />
              {!isCollapsed && <span>Log a Service</span>}
            </Link>
          </div>
        )}

        {/* Caseload Dropdown - For Supervisors and Practitioners */}
        {visibleItems.includes("caseload") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/caseload"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/caseload") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Caseload"
              >
                <Briefcase className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/caseload"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/caseload") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Caseload</span>
                  </Link>
                  <button
                    onClick={() => setIsCaseloadOpen(!isCaseloadOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/caseload") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isCaseloadOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isCaseloadOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {caseloadSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Student Services Dropdown - For Supervisors and Practitioners */}
        {visibleItems.includes("studentServices") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/student-services"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/student-services") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Student Services"
              >
                <Calendar className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/student-services"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/student-services") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Student Services</span>
                  </Link>
                  <button
                    onClick={() => setIsStudentServicesOpen(!isStudentServicesOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/student-services") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isStudentServicesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isStudentServicesOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {studentServicesSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Assigned Practitioners - Only for Supervisors */}
        {visibleItems.includes("assignedPractitioners") && (
          <div>
            <Link
              href="/assigned-practitioners"
              className={`${isCollapsed ? 'flex items-center justify-center p-3' : 'flex items-center gap-3 px-3 py-2'} rounded transition-colors ${
                pathname === "/assigned-practitioners" ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
              }`}
              title={isCollapsed ? "Assigned Practitioners" : undefined}
            >
              <UserCheck className="w-5 h-5" />
              {!isCollapsed && <span>Assigned Practitioners</span>}
            </Link>
          </div>
        )}

        {/* Reports Dropdown - For All Account Types */}
        {visibleItems.includes("reports") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/reports"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/reports") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Reports"
              >
                <Download className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/reports"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/reports") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Download className="w-5 h-5" />
                    <span>Reports</span>
                  </Link>
                  <button
                    onClick={() => setIsReportsOpen(!isReportsOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/reports") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isReportsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isReportsOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {reportsSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}



        {/* Manage Organizations Dropdown - Only for Administrators */}
        {visibleItems.includes("manageOrganizations") && (
          <div>
            {isCollapsed ? (
              <Link
                href="/manage-organizations"
                className={`flex items-center justify-center p-3 rounded transition-colors ${
                  pathname.startsWith("/manage-organizations") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                }`}
                title="Manage Organizations"
              >
                <Building2 className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href="/manage-organizations"
                    className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/manage-organizations") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Manage Organizations</span>
                  </Link>
                  <button
                    onClick={() => setIsManageOrganizationsOpen(!isManageOrganizationsOpen)}
                    className={`px-2 py-2 rounded transition-colors ${
                      pathname.startsWith("/manage-organizations") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isManageOrganizationsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isManageOrganizationsOpen && (
                  <div className="ml-8 mt-2 space-y-1">
                    {manageOrganizationsSubItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-colors ${
                            isActive ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </nav>

      {/* Logout Button */}
      <div className={`${isCollapsed ? 'px-2' : 'px-4'} pb-4`}>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`${isCollapsed ? 'w-full p-3' : 'w-full flex items-center gap-2'} text-white hover:bg-white/20 hover:text-white transition-colors`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
