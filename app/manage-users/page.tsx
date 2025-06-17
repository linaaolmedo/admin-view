"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Filter, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for users
const mockUsers = [
  { id: 1, lastName: "Brown", firstName: "Bradley", npi: "59249790", role: "Practitioner", status: "Active" },
  { id: 2, lastName: "Casper", firstName: "Susan", npi: "75976866", role: "Practitioner", status: "Active" },
  { id: 3, lastName: "McCullough", firstName: "Elijah", npi: "79129150", role: "Practitioner", status: "Active" },
  { id: 4, lastName: "Skiles", firstName: "Paul", npi: "29043835", role: "Supervisor", status: "Inactive" },
  { id: 5, lastName: "Thiel", firstName: "Grady", npi: "54867978", role: "Practitioner", status: "Active" },
  { id: 6, lastName: "Considine", firstName: "Eva", npi: "55111094", role: "Billing Administrator", status: "Active" },
  { id: 7, lastName: "Lebsack", firstName: "Angie", npi: "30180062", role: "Supervisor", status: "Active" },
  { id: 8, lastName: "DuBuque", firstName: "Rolando", npi: "96924843", role: "Practitioner", status: "Active" },
  { id: 9, lastName: "Kessler", firstName: "Alexander", npi: "07989949", role: "Practitioner", status: "Active" },
  { id: 10, lastName: "Harris", firstName: "Antonia", npi: "24137967", role: "Practitioner", status: "Inactive" },
  { id: 11, lastName: "Buckridge", firstName: "Dom", npi: "87189350", role: "Member Support", status: "Active" },
  { id: 12, lastName: "Wuckert", firstName: "Naomi", npi: "27571147", role: "Practitioner", status: "Active" },
  { id: 13, lastName: "Rice", firstName: "Susie", npi: "01071202", role: "Practitioner", status: "Active" },
]

export default function ManageUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["all", "practitioners", "supervisors", "administrators"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.npi.includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "practitioners") return matchesSearch && user.role === "Practitioner"
    if (activeTab === "supervisors") return matchesSearch && user.role === "Supervisor"
    if (activeTab === "administrators") return matchesSearch && (user.role === "Billing Administrator" || user.role === "Member Support")
    
    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === "Active" ? "default" : "secondary"}
        className={status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
      >
        {status}
      </Badge>
    )
  }

  const handleAddUser = () => {
    router.push("/manage-users/add")
  }

  const handleUserAction = (action: string, userId: number) => {
    // TODO: Implement user actions
    console.log(`${action} user ${userId}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#000000]">Manage Users</h1>
        <Button onClick={handleAddUser} className="bg-[#4286f4] hover:bg-[#3275e3]">
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white">
            All Users
          </TabsTrigger>
          <TabsTrigger value="practitioners" className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white">
            Practitioners
          </TabsTrigger>
          <TabsTrigger value="supervisors" className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white">
            Supervisors
          </TabsTrigger>
          <TabsTrigger value="administrators" className="data-[state=active]:bg-[#4286f4] data-[state=active]:text-white">
            Administrators
          </TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Last Name</TableHead>
                  <TableHead className="font-semibold">First Name</TableHead>
                  <TableHead className="font-semibold">NPI</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.firstName}
                      </Link>
                    </TableCell>
                    <TableCell>{user.npi}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("deactivate", user.id)}>
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            Delete
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

        <TabsContent value="practitioners" className="mt-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Last Name</TableHead>
                  <TableHead className="font-semibold">First Name</TableHead>
                  <TableHead className="font-semibold">NPI</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.firstName}
                      </Link>
                    </TableCell>
                    <TableCell>{user.npi}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("deactivate", user.id)}>
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            Delete
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

        <TabsContent value="supervisors" className="mt-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Last Name</TableHead>
                  <TableHead className="font-semibold">First Name</TableHead>
                  <TableHead className="font-semibold">NPI</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.firstName}
                      </Link>
                    </TableCell>
                    <TableCell>{user.npi}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("deactivate", user.id)}>
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            Delete
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

        <TabsContent value="administrators" className="mt-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Last Name</TableHead>
                  <TableHead className="font-semibold">First Name</TableHead>
                  <TableHead className="font-semibold">NPI</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/manage-users/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {user.firstName}
                      </Link>
                    </TableCell>
                    <TableCell>{user.npi}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("deactivate", user.id)}>
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            Delete
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
