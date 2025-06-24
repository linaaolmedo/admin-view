"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LogOut,
  FileText,
  Users2,
  Clipboard,
  Briefcase,
  Download,
  Settings,
  ChevronUp,
  ChevronDown,
  PanelLeft,
  Building2,
  Calendar,
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

const manageOrganizationsSubItems = [
  { href: "/manage-organizations/all", label: "All Organizations" },
  { href: "/manage-organizations/add", label: "Add Organization" },
  { href: "/manage-organizations/settings", label: "Organization Settings" },
]

const caseloadSubItems = [
  { href: "/caseload/view", label: "View" },
  { href: "/caseload/groups", label: "Groups" },
  { href: "/caseload/manage", label: "Manage" },
]

const studentServicesSubItems = [
  { href: "/student-services/my-calendar", label: "My calendar" },
  { href: "/student-services/all-services", label: "All services" },
  { href: "/student-services/supervisor-logs", label: "Supervisor Logs" },
  { href: "/student-services/log-service", label: "Log service" },
  { href: "/student-services/schedule-service", label: "Schedule service" },
]

const reportsSubItems = [
  { href: "/reports/report-builder", label: "Report builder" },
  { href: "/reports/user-history", label: "User history" },
  { href: "/reports/qualifications", label: "Qualifications" }
]

const configurationsSubItems = [
  { href: "/configurations/qualifications", label: "Qualifications" },
  { href: "/configurations/billing-codes", label: "Billing codes" },
  { href: "/configurations/permission-types", label: "Permission types" },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isClaimsOpen, setIsClaimsOpen] = useState(pathname.startsWith("/claims"))
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(pathname.startsWith("/manage-users"))
  const [isManageStudentsOpen, setIsManageStudentsOpen] = useState(pathname.startsWith("/manage-students"))
  const [isManageOrganizationsOpen, setIsManageOrganizationsOpen] = useState(pathname.startsWith("/manage-organizations"))
  const [isCaseloadOpen, setIsCaseloadOpen] = useState(pathname.startsWith("/caseload"))
  const [isStudentServicesOpen, setIsStudentServicesOpen] = useState(pathname.startsWith("/student-services"))
  const [isReportsOpen, setIsReportsOpen] = useState(pathname.startsWith("/reports"))
  const [isConfigurationsOpen, setIsConfigurationsOpen] = useState(pathname.startsWith("/configurations"))

  const isClaimsActive = pathname.startsWith("/claims")

  // Don't show sidebar on login page
  if (pathname === "/login") {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-cyan-500 to-teal-600 text-white min-h-screen flex flex-col transition-all duration-300 shadow-lg`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-white/20 hover:text-white p-1"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
      </div>
      
      <nav className={`${isCollapsed ? 'px-2' : 'px-4'} flex-1 space-y-2 overflow-y-auto`}>
        {/* Claims Dropdown */}
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

        {/* Manage Users Dropdown */}
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

        {/* Manage Students Dropdown */}
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

        {/* Log a Service */}
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

        {/* Caseload Dropdown */}
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

        {/* Student Services Dropdown */}
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

        {/* Reports Dropdown */}
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

        {/* Configurations Dropdown */}
        <div>
          {isCollapsed ? (
            <Link
              href="/configurations"
              className={`flex items-center justify-center p-3 rounded transition-colors ${
                pathname.startsWith("/configurations") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
              }`}
              title="Configurations"
            >
              <Settings className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/configurations"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/configurations") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Configurations</span>
                </Link>
                <button
                  onClick={() => setIsConfigurationsOpen(!isConfigurationsOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/configurations") ? "bg-white/20 text-white" : "text-white hover:bg-white/10"
                  }`}
                >
                  {isConfigurationsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isConfigurationsOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  {configurationsSubItems.map((item) => {
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

        {/* Manage Organizations Dropdown */}
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
