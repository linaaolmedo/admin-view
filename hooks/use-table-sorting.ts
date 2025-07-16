"use client"

import { useState, useMemo } from "react"
import { ArrowUpDown, ChevronUp, ChevronDown, type LucideIcon } from "lucide-react"

export interface SortConfig {
  field: string
  direction: "asc" | "desc"
}

export interface SortableColumn {
  field: string
  label: string
  sortable: boolean
  type?: "string" | "number" | "date" | "currency"
}

export function useTableSorting<T extends Record<string, any>>(
  data: T[],
  initialSortField: string = "",
  initialSortDirection: "asc" | "desc" = "asc"
) {
  const [sortField, setSortField] = useState<string>(initialSortField)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(initialSortDirection)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField) return data
    
    return [...data].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      // Handle different data types
      if (sortField.includes("Date") || sortField === "serviceDate" || sortField === "dateSubmitted") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (sortField.includes("Amount") || sortField === "billedAmount" || sortField === "paidAmount") {
        aValue = parseFloat(aValue.replace(/[$,]/g, ""))
        bValue = parseFloat(bValue.replace(/[$,]/g, ""))
      } else if (sortField.includes("Claims") || sortField === "totalClaimsSubmitted" || sortField === "claimsPaid" || sortField === "deniedClaims") {
        // Handle numeric values
        aValue = parseInt(aValue)
        bValue = parseInt(bValue)
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortField, sortDirection])

  const getSortIcon = (field: string): { icon: LucideIcon; className: string } => {
    if (sortField !== field) {
      return { icon: ArrowUpDown, className: "w-4 h-4 text-gray-400" }
    }
    return {
      icon: sortDirection === "asc" ? ChevronUp : ChevronDown,
      className: "w-4 h-4 text-teal-600"
    }
  }

  const getSortableHeaderProps = (field: string) => ({
    onClick: () => handleSort(field)
  })

  return {
    sortField,
    sortDirection,
    sortedData,
    handleSort,
    getSortIcon,
    getSortableHeaderProps
  }
} 