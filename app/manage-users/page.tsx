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

// Mock data for users
const mockUsers = [
  { id: 1, name: "Bradley Brown", email: "bbrown@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 2, name: "Luis Hayes", email: "lhayes@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 3, name: "Teri Lakin", email: "tlakin@email.com", role: "Practitioner", permissions: "Standard", status: "Active", lastLogin: "5/1/2025" },
  { id: 4, name: "Sarah Johnson", email: "sjohnson@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "5/1/2025" },
  { id: 5, name: "Michael Davis", email: "mdavis@email.com", role: "Supervisor", permissions: "Advanced", status: "Active", lastLogin: "4/30/2025" },
  { id: 6, name: "Jennifer Wilson", email: "jwilson@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "5/1/2025" },
  { id: 7, name: "Robert Martinez", email: "rmartinez@email.com", role: "Administrator", permissions: "Full", status: "Active", lastLogin: "4/29/2025" },
  { id: 8, name: "Lisa Anderson", email: "landerson@email.com", role: "Practitioner", permissions: "Standard", status: "Inactive", lastLogin: "4/25/2025" },
  { id: 9, name: "David Thompson", email: "dthompson@email.com", role: "Supervisor", permissions: "Advanced", status: "Inactive", lastLogin: "4/20/2025" },
]

export default function ManageUsersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("practitioner")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const router = useRouter()

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = user.role.toLowerCase() === selectedRole.toLowerCase()

    const matchesTab = activeTab === "all" || user.role.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch && matchesRole && matchesTab
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]
    
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

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

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const getTabCount = (role: string) => {
    if (role === "all") return mockUsers.length
    return mockUsers.filter(user => user.role.toLowerCase() === role.toLowerCase()).length
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <Button onClick={handleAddUser} className="bg-teal-600 hover:bg-teal-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            All Users ({getTabCount("all")})
          </TabsTrigger>
          <TabsTrigger value="practitioners" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Practitioners ({getTabCount("practitioner")})
          </TabsTrigger>
          <TabsTrigger value="supervisors" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Supervisors ({getTabCount("supervisor")})
          </TabsTrigger>
          <TabsTrigger value="administrators" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Administrators ({getTabCount("administrator")})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {/* Filters and Search */}
          <div className="flex justify-end items-center gap-4 mb-4">
            {activeTab === "all" && (
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practitioner">Practitioner</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Users Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-semibold cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center">
                      Email
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Permissions</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Last Login</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
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
                    <TableCell>{user.role}</TableCell>
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
