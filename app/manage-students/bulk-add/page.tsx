"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, FileText, X } from "lucide-react"

export default function BulkAddStudentsPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (isValidFileType(file)) {
        setUploadedFile(file)
      } else {
        alert("Please upload a .xls, .xlsx, or .csv file")
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (isValidFileType(file)) {
        setUploadedFile(file)
      } else {
        alert("Please upload a .xls, .xlsx, or .csv file")
      }
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]
    const validExtensions = ['.xls', '.xlsx', '.csv']
    
    return validTypes.includes(file.type) || 
           validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
  }

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      // TODO: Implement actual file upload and processing
      console.log("File uploaded:", uploadedFile.name)
      router.push("/manage-students")
    }, 2000)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const triggerFileInput = () => {
    document.getElementById('fileInput')?.click()
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-[#000000]">Bulk Add Students</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center transition-colors
            ${dragActive 
              ? "border-[#4286f4] bg-blue-50" 
              : uploadedFile 
                ? "border-green-400 bg-green-50" 
                : "border-gray-300 bg-gray-50"
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="fileInput"
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!uploadedFile ? (
            <>
              <div className="mb-4">
                <FileText className="w-16 h-16 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload your files</h3>
              <p className="text-gray-600 mb-4">
                Drag your file here or{" "}
                <button 
                  onClick={triggerFileInput}
                  className="text-[#4286f4] hover:underline font-medium"
                >
                  Browse
                </button>
              </p>
              <p className="text-sm text-gray-500">
                File should be .xls, .xlsx or .csv
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-white rounded-lg border p-4 shadow-sm">
                <FileText className="w-8 h-8 text-green-600 mr-3" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="ml-4 text-gray-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        {uploadedFile && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-[#4286f4] hover:bg-[#3275e3] px-8"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">File Format Requirements:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Supported formats: Excel (.xls, .xlsx) or CSV (.csv)</li>
            <li>• Required columns: SSID, Local ID, First Name, Last Name, District, School, DOB</li>
            <li>• Maximum file size: 10 MB</li>
            <li>• First row should contain column headers</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 