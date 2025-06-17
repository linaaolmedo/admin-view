"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

// Mock data based on the screenshot
const qualificationsData = [
  {
    id: 1,
    type: "License",
    code: "AMFT",
    description: "Registered Associate Marriage and Family Therapists",
    status: "Active"
  },
  {
    id: 2,
    type: "Credential",
    code: "AOD",
    description: "Alcohol and Other Drug Counselors",
    status: "Active"
  },
  {
    id: 3,
    type: "Credential",
    code: "APCC",
    description: "Registered Associate Professional Clinical Counselors",
    status: "Active"
  },
  {
    id: 4,
    type: "License",
    code: "ASW",
    description: "Registered Associate Social Workers",
    status: "Active"
  },
  {
    id: 5,
    type: "License",
    code: "CHW",
    description: "Community Health Workers",
    status: "Archived"
  },
  {
    id: 6,
    type: "Credential",
    code: "LCSW",
    description: "Community Health Workers",
    status: "Active"
  },
  {
    id: 7,
    type: "License",
    code: "LMFT",
    description: "Licensed Marriage and Family Therapists",
    status: "Active"
  },
  {
    id: 8,
    type: "License",
    code: "LPCC",
    description: "Licensed Professional Clinical Counselors",
    status: "Active"
  },
  {
    id: 9,
    type: "Certificate",
    code: "MD",
    description: "Licensed Physicians, including DOs and Psychiatrists",
    status: "Archived"
  },
  {
    id: 10,
    type: "Certificate",
    code: "NP",
    description: "Licensed Nurse Practitioners",
    status: "Active"
  },
  {
    id: 11,
    type: "License",
    code: "PA",
    description: "Licensed Physician Assistants",
    status: "Archived"
  },
  {
    id: 12,
    type: "License",
    code: "PPS",
    description: "Pupil Personnel Services Credentialed",
    status: "Archived"
  },
  {
    id: 13,
    type: "License",
    code: "PSYCH",
    description: "Licensed Psychologist, included Licensed Educational Psychologists",
    status: "Active"
  },
  {
    id: 14,
    type: "Certificate",
    code: "PSY ASSOC",
    description: "Registered Psychology Associates",
    status: "Active"
  },
  {
    id: 15,
    type: "License",
    code: "RN",
    description: "Registered Nurse, including Credentialed School Nurses",
    status: "Active"
  }
]

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Archived":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge className={`${getStatusStyles(status)} border`}>
      {status}
    </Badge>
  )
}

interface AddQualificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { type: string; code: string; description: string }) => void
}

const AddQualificationModal = ({ isOpen, onClose, onSave }: AddQualificationModalProps) => {
  const [formData, setFormData] = useState({
    type: "",
    code: "",
    description: ""
  })

  const handleSave = () => {
    if (formData.type && formData.code && formData.description) {
      onSave(formData)
      setFormData({ type: "", code: "", description: "" })
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({ type: "", code: "", description: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-semibold">Add new qualification</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="License">License</SelectItem>
                <SelectItem value="Credential">Credential</SelectItem>
                <SelectItem value="Certificate">Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              placeholder="Enter code"
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t">
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.type || !formData.code || !formData.description}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function QualificationsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [qualifications, setQualifications] = useState(qualificationsData)

  const handleAddQualification = (data: { type: string; code: string; description: string }) => {
    const newQualification = {
      id: qualifications.length + 1,
      ...data,
      status: "Active"
    }
    setQualifications(prev => [...prev, newQualification])
  }

  // Listen for global add button events
  useEffect(() => {
    const handleGlobalAdd = () => {
      setIsAddModalOpen(true)
    }

    // Add event listener for the add button in the layout
    window.addEventListener('openAddQualificationModal', handleGlobalAdd)
    
    return () => {
      window.removeEventListener('openAddQualificationModal', handleGlobalAdd)
    }
  }, [])

  return (
    <div>
      {/* Add button in the page for direct access */}
      <div className="flex justify-end mb-4">
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Qualification
        </Button>
      </div>

      {/* Qualifications Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualifications.map((qualification) => (
              <TableRow key={qualification.id}>
                <TableCell className="font-medium">
                  {qualification.type}
                </TableCell>
                <TableCell className="font-medium">
                  {qualification.code}
                </TableCell>
                <TableCell>
                  {qualification.description}
                </TableCell>
                <TableCell>
                  <StatusBadge status={qualification.status} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {qualifications.length} qualifications
        </span>
      </div>

      {/* Add Qualification Modal */}
      <AddQualificationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddQualification}
      />
    </div>
  )
}
