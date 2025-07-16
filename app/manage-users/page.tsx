"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Filter, ArrowUpDown, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTableSorting } from "@/hooks/use-table-sorting"

// Mock data for users
const mockUsers = [
  // Practitioners
  { id: 1, name: "Bradley Brown", email: "bbrown@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 2, name: "Luis Hayes", email: "lhayes@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 3, name: "Teri Lakin", email: "tlakin@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 8, name: "Lisa Anderson", email: "landerson@email.com", role: "Practitioner", permissions: "Standard", status: "Inactive", lastLogin: "4/25/2025" },
  { id: 10, name: "Maria Rodriguez", email: "mrodriguez@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/2/2025" },
  { id: 11, name: "James Carter", email: "jcarter@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 12, name: "Emma Foster", email: "efoster@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "4/30/2025" },
  { id: 13, name: "Daniel Kim", email: "dkim@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/2/2025" },
  { id: 14, name: "Ashley Turner", email: "aturner@email.com", role: "Practitioner", permissions: "Standard", status: "Inactive", lastLogin: "4/28/2025" },
  { id: 15, name: "Kevin Walsh", email: "kwalsh@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  
  // Supervisors
  { id: 4, name: "Sarah Johnson", email: "sjohnson@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "5/1/2025" },
  { id: 5, name: "Michael Davis", email: "mdavis@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "4/30/2025" },
  { id: 9, name: "David Thompson", email: "dthompson@email.com", role: "Supervisor", permissions: "Advanced", status: "Inactive", lastLogin: "4/20/2025" },
  { id: 16, name: "Rachel Green", email: "rgreen@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "5/2/2025" },
  { id: 17, name: "Christopher Lee", email: "clee@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "5/1/2025" },
  { id: 18, name: "Amanda Clark", email: "aclark@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "4/29/2025" },
  { id: 19, name: "Ryan Cooper", email: "rcooper@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "5/2/2025" },
  { id: 20, name: "Michelle Parker", email: "mparker@email.com", role: "Supervisor", permissions: "Advanced", status: "Inactive", lastLogin: "4/26/2025" },
  
  // Administrators
  { id: 6, name: "Jennifer Wilson", email: "jwilson@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "5/1/2025" },
  { id: 7, name: "Robert Martinez", email: "rmartinez@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "4/29/2025" },
  { id: 21, name: "Patricia Moore", email: "pmoore@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "5/2/2025" },
  { id: 22, name: "Steven Adams", email: "sadams@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "5/1/2025" },
  { id: 23, name: "Laura Bennett", email: "lbennett@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "4/30/2025" },
  { id: 24, name: "Mark Phillips", email: "mphillips@email.com", role: "Administrator", permissions: "Full", status: "Inactive", lastLogin: "4/27/2025" },
  { id: 25, name: "Nicole Evans", email: "nevans@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "5/2/2025" },
]

export default function ManageUsersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesTab = false
    if (activeTab === "all") {
      matchesTab = true
    } else if (activeTab === "practitioners") {
      matchesTab = user.role.toLowerCase() === "practitioner"
    } else if (activeTab === "supervisors") {
      matchesTab = user.role.toLowerCase() === "supervisor"
    } else if (activeTab === "administrators") {
      matchesTab = user.role.toLowerCase() === "administrator"
    }

    return matchesSearch && matchesTab
  })

  const { sortedData, getSortIcon, getSortableHeaderProps } = useTableSorting(
    filteredUsers,
    "name",
    "asc"
  )

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === "Active" ? "default" : "secondary"}
        className={status === "Active" ? "bg-teal-100 text-teal-800 hover:bg-teal-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
      >
        {status}
      </Badge>
    )
  }

  const getPermissionsBadge = (permissions: string) => {
    const colors = {
      "Standard": "bg-teal-100 text-teal-800 border-teal-200",
      "Advanced": "bg-purple-100 text-purple-800 border-purple-200",
      "Full": "bg-red-100 text-red-800 border-red-200"
    }
    
    return (
      <Badge 
        variant="outline"
        className={colors[permissions as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"}
      >
        {permissions}
      </Badge>
    )
  }

  const handleAddUser = () => {
    router.push("/manage-users/add")
  }

  const handleUserAction = (action: string, userId: number) => {
    if (action === "view") {
      router.push(`/manage-users/${userId}`)
    } else {
      // TODO: Implement other user actions
      console.log(`${action} user ${userId}`)
    }
  }

  const handleUserClick = (userId: number) => {
    router.push(`/manage-users/${userId}`)
  }

  // handleSort is now handled by the useTableSorting hook

  const getTabCount = (role: string) => {
    if (role === "all") return mockUsers.length
    return mockUsers.filter(user => user.role.toLowerCase() === role.toLowerCase()).length
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-teal-800">Manage Users</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs Row */}
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">
              All Users ({getTabCount("all")})
            </TabsTrigger>
            <TabsTrigger value="practitioners">
              Practitioners ({getTabCount("practitioner")})
            </TabsTrigger>
            <TabsTrigger value="supervisors">
              Supervisors ({getTabCount("supervisor")})
            </TabsTrigger>
            <TabsTrigger value="administrators">
              Administrators ({getTabCount("administrator")})
            </TabsTrigger>
          </TabsList>
          
          <Button onClick={handleAddUser} size="sm" className="bg-teal-600 hover:bg-teal-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search and Filter Controls Row */}
        <div className="flex justify-end items-center gap-4 mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <TabsContent value={activeTab} className="mt-6">

          {/* Users Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("name")}
                  >
                    <div className="flex items-center gap-1">
                      Name
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("name")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("email")}
                  >
                    <div className="flex items-center gap-1">
                      Email
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("email")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  {activeTab === "all" && (
                    <TableHead 
                      className="font-semibold cursor-pointer hover:bg-gray-100"
                      {...getSortableHeaderProps("role")}
                    >
                      <div className="flex items-center gap-1">
                        Role
                        {(() => {
                          const { icon: Icon, className } = getSortIcon("role")
                          return <Icon className={className} />
                        })()}
                      </div>
                    </TableHead>
                  )}
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("permissions")}
                  >
                    <div className="flex items-center gap-1">
                      Permissions
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("permissions")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("status")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    {...getSortableHeaderProps("lastLogin")}
                  >
                    <div className="flex items-center gap-1">
                      Last Login
                      {(() => {
                        const { icon: Icon, className } = getSortIcon("lastLogin")
                        return <Icon className={className} />
                      })()}
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <button 
                        onClick={() => handleUserClick(user.id)}
                        className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                      >
                        {user.name}
                      </button>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    {activeTab === "all" && <TableCell>{user.role}</TableCell>}
                    <TableCell>{getPermissionsBadge(user.permissions)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("permissions", user.id)}>
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("deactivate", user.id)}>
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
