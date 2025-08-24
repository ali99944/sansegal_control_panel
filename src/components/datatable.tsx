/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type { ReactNode } from "react"
import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, Download } from "lucide-react"
import { Input } from "./ui/input"
import Button from "./ui/button"


export interface Column<T> {
  key: keyof T | string | string[]
  title: string
  sortable?: boolean
  width?: string
  render?: (value: any, row: T, index: number) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  className?: string
  onRowClick?: (row: T, index: number) => void
  loading?: boolean
  emptyState?: ReactNode
  searchable?: boolean
  exportable?: boolean
  selectable?: boolean
  onSelectionChange?: (selectedRows: T[]) => void
}

interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  className = "",
  onRowClick,
  loading = false,
  emptyState,
  searchable = true,
  exportable = true,
  selectable = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())

  // Helper function to get nested value
  const getNestedValue = (obj: any, path: string | string[]): any => {
    if (typeof path === "string") {
      return obj[path]
    }
    return path.reduce((current, key) => current?.[key], obj)
  }

  // Helper function to get sort key
  const getSortKey = (column: Column<T>): string => {
    if (Array.isArray(column.key)) {
      return column.key.join(".")
    }
    return column.key as string
  }

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = [...data]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const value = getNestedValue(row, column.key as string | string[])
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        }),
      )
    }

    // Sort
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key.split("."))
        const bValue = getNestedValue(b, sortConfig.key.split("."))

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, sortConfig, columns])

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = processedData.slice(startIndex, startIndex + pageSize)

  // Handle sort
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return

    const key = getSortKey(column)
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        }
      }
      return { key, direction: "asc" }
    })
  }

  // Handle selection
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((_, index) => startIndex + index)))
    }
  }

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRows(newSelected)
  }

  // Handle export
  const handleExport = () => {
    const csvContent = [
      columns.map((col) => col.title).join(","),
      ...processedData.map((row) =>
        columns
          .map((col) => {
            const value = getNestedValue(row, col.key as string | string[])
            return `"${String(value).replace(/"/g, '""')}"`
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "data-export.csv"
    link.click()
  }

  // Update selection callback
  // React.useEffect(() => {
  //   if (onSelectionChange) {
  //     const selectedData = Array.from(selectedRows).map((index) => data[index])
  //     onSelectionChange(selectedData)
  //   }
  // }, [selectedRows, data, onSelectionChange])

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: pageSize }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          {columns.map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 bg-gray-200 rounded animate-pulse"
              style={{ width: `${Math.random() * 100 + 50}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className={`bg-white rounded-xl  ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {searchable && (
              <div className="relative w-xs">
                <Input
                  placeholder="البحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {exportable && (
              <Button variant="secondary" size="sm" onClick={handleExport} icon={Download}>
                تصدير
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`p-4 text-right text-sm font-medium text-gray-700 ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 ${
                            sortConfig?.key === getSortKey(column) && sortConfig.direction === "asc"
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig?.key === getSortKey(column) && sortConfig.direction === "desc"
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4">
                  <LoadingSkeleton />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-12 text-center">
                  {emptyState || (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg 
                          className="w-12 h-12 text-gray-400"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-1">لا توجد بيانات</h3>
                      <p className="text-sm text-gray-400">لم يتم العثور على أي بيانات للعرض في الوقت الحالي</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const actualIndex = startIndex + index
                return (
                  <tr
                    key={actualIndex}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    } ${selectedRows.has(actualIndex) ? "bg-blue-50" : ""}`}
                    onClick={() => onRowClick?.(row, actualIndex)}
                  >
                    {selectable && (
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(actualIndex)}
                          onChange={() => handleSelectRow(actualIndex)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                    )}
                    {columns.map((column, colIndex) => {
                      const value = getNestedValue(row, column.key as string | string[])
                      return (
                        <td key={colIndex} className="p-4 text-sm text-gray-900">
                          {column.render ? column.render(value, row, actualIndex) : String(value || "")}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              عرض {startIndex + 1} إلى {Math.min(startIndex + pageSize, processedData.length)} من {processedData.length}{" "}
              نتيجة
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="!px-3 !py-1"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                السابق
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 text-sm rounded cursor-pointer transition-all duration-300 ${
                        currentPage === pageNum ? "bg-primary text-white" : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="!px-3 !py-1"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                التالي
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
