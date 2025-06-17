"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LogOut,
  FileText,
  Users,
  GraduationCap,
  Briefcase,
  BarChart3,
  Settings,
  UserCheck,
  ChevronUp,
  ChevronDown,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
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
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-[#2f3a83] text-white min-h-screen flex flex-col transition-all duration-300`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-[#4286f4] hover:text-white p-1"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
      
      <nav className={`${isCollapsed ? 'px-2' : 'px-4'} flex-1 space-y-2 overflow-y-auto`}>
        {/* Claims Dropdown */}
        <div>
          {isCollapsed ? (
            <Link
              href="/claims"
              className={`flex items-center justify-center p-3 rounded transition-colors ${
                pathname.startsWith("/claims") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                    pathname.startsWith("/claims") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Claims</span>
                </Link>
                <button
                  onClick={() => setIsClaimsOpen(!isClaimsOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/claims") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                pathname.startsWith("/manage-users") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
              }`}
              title="Manage Users"
            >
              <Users className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/manage-users"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/manage-users") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </Link>
                <button
                  onClick={() => setIsManageUsersOpen(!isManageUsersOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/manage-users") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                pathname.startsWith("/manage-students") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
              }`}
              title="Manage Students"
            >
              <GraduationCap className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/manage-students"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/manage-students") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Manage Students</span>
                </Link>
                <button
                  onClick={() => setIsManageStudentsOpen(!isManageStudentsOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/manage-students") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
              pathname === "/log-service" ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
            }`}
            title={isCollapsed ? "Log a Service" : undefined}
          >
            <ClipboardList className="w-5 h-5" />
            {!isCollapsed && <span>Log a Service</span>}
          </Link>
        </div>

        {/* Caseload Dropdown */}
        <div>
          {isCollapsed ? (
            <Link
              href="/caseload/view"
              className={`flex items-center justify-center p-3 rounded transition-colors ${
                pathname.startsWith("/caseload") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
              }`}
              title="Caseload"
            >
              <Briefcase className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/caseload/view"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/caseload") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Caseload</span>
                </Link>
                <button
                  onClick={() => setIsCaseloadOpen(!isCaseloadOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/caseload") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
              href="/student-services/my-calendar"
              className={`flex items-center justify-center p-3 rounded transition-colors ${
                pathname.startsWith("/student-services") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
              }`}
              title="Student Services"
            >
              <UserCheck className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/student-services/my-calendar"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/student-services") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Student Services</span>
                </Link>
                <button
                  onClick={() => setIsStudentServicesOpen(!isStudentServicesOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/student-services") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
              href="/reports/user-history"
              className={`flex items-center justify-center p-3 rounded transition-colors ${
                pathname.startsWith("/reports") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
              }`}
              title="Reports"
            >
              <BarChart3 className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/reports/user-history"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/reports") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Reports</span>
                </Link>
                <button
                  onClick={() => setIsReportsOpen(!isReportsOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/reports") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
              href="/configurations/qualifications"
              className={`flex items-center justify-center p-3 rounded transition-colors ${
                pathname.startsWith("/configurations") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
              }`}
              title="Configurations"
            >
              <Settings className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Link
                  href="/configurations/qualifications"
                  className={`flex-1 flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith("/configurations") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Configurations</span>
                </Link>
                <button
                  onClick={() => setIsConfigurationsOpen(!isConfigurationsOpen)}
                  className={`px-2 py-2 rounded transition-colors ${
                    pathname.startsWith("/configurations") ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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
                          isActive ? "bg-[#4286f4] text-white" : "text-white hover:bg-[#4286f4]"
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

      {/* Logout Button - Fixed at bottom */}
      <div className={`${isCollapsed ? 'px-2' : 'px-4'} pb-4 pt-2 border-t border-[#4286f4]/20`}>
        <Button
          variant="ghost"
          className={`${isCollapsed ? 'w-full p-3' : 'w-full flex items-center gap-2'} text-white hover:bg-[#4286f4] hover:text-white transition-colors`}
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </aside>
  )
}
