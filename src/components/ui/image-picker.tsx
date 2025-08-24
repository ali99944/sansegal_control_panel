"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Upload, X, ImageIcon } from 'lucide-react'

interface ImageFile {
  id: string
  file: File
  url: string
  name: string
  size: number
  type: string
}

interface ImagePickerProps {
  value?: string | string[]
  onChange?: (files: File | File[] | null) => void
  onUrlChange?: (urls: string | string[] | null) => void
  multiple?: boolean
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
  disabled?: boolean
  placeholder?: string
  showPreview?: boolean
  showFileInfo?: boolean
  dragAndDrop?: boolean
  quality?: number
  maxWidth?: number
  maxHeight?: number
}

export default function ImagePicker({
  // value,
  onChange,
  onUrlChange,
  multiple = false,
  maxFiles = 5,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  className = "",
  disabled = false,
  placeholder,
  showPreview = true,
  showFileInfo = true,
  dragAndDrop = true,
  quality = 0.8,
  maxWidth = 1920,
  maxHeight = 1080,
}: ImagePickerProps) {
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [previewFile, setPreviewFile] = useState<ImageFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  // Compress image
  const compressImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              resolve(file)
            }
          },
          file.type,
          quality,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }, [maxHeight, maxWidth, quality])

  // Validate file
  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `نوع الملف غير مدعوم. الأنواع المدعومة: ${acceptedTypes.join(", ")}`
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `حجم الملف كبير جداً. الحد الأقصى: ${maxSize}MB`
    }

    if (!multiple && selectedFiles.length >= 1) {
      return "يمكن اختيار ملف واحد فقط"
    }

    if (multiple && selectedFiles.length >= maxFiles) {
      return `تم الوصول للحد الأقصى من الملفات: ${maxFiles}`
    }

    return null
  }, [acceptedTypes, maxSize, multiple, selectedFiles.length, maxFiles])

  // Process files
  const processFiles = useCallback(
    async (files: FileList) => {
      const newFiles: ImageFile[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const error = validateFile(file)

        if (error) {
          alert(error)
          continue
        }

        try {
          const compressedFile = await compressImage(file)
          const url = await fileToBase64(compressedFile)

          const imageFile: ImageFile = {
            id: Math.random().toString(36).substr(2, 9),
            file: compressedFile,
            url,
            name: file.name,
            size: compressedFile.size,
            type: file.type,
          }

          newFiles.push(imageFile)
        } catch (error) {
          console.error("Error processing file:", error)
        }
      }

      if (newFiles.length > 0) {
        const updatedFiles = multiple ? [...selectedFiles, ...newFiles] : newFiles
        setSelectedFiles(updatedFiles)

        // Call onChange callbacks
        const files = updatedFiles.map((f) => f.file)
        const urls = updatedFiles.map((f) => f.url)

        onChange?.(multiple ? files : files[0] || null)
        onUrlChange?.(multiple ? urls : urls[0] || null)
      }
    },
    [validateFile, compressImage, multiple, selectedFiles, onChange, onUrlChange],
  )

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
  }

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (!disabled && dragAndDrop) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)

    if (!disabled && dragAndDrop) {
      const files = event.dataTransfer.files
      if (files.length > 0) {
        processFiles(files)
      }
    }
  }

  // Remove file
  const removeFile = (id: string) => {
    const updatedFiles = selectedFiles.filter((f) => f.id !== id)
    setSelectedFiles(updatedFiles)

    const files = updatedFiles.map((f) => f.file)
    const urls = updatedFiles.map((f) => f.url)

    onChange?.(multiple ? files : files[0] || null)
    onUrlChange?.(multiple ? urls : urls[0] || null)
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getPlaceholderText = () => {
    if (placeholder) return placeholder
    if (multiple) {
      return `اسحب الصور هنا أو انقر للاختيار (حد أقصى ${maxFiles} ملفات)`
    }
    return "اسحب الصورة هنا أو انقر للاختيار"
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200
          ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary hover:bg-gray-50"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(",")}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">{getPlaceholderText()}</p>
            <p className="text-xs text-gray-500 mt-1">
              الأنواع المدعومة: {acceptedTypes.map((type) => type.split("/")[1]).join(", ")} • حد أقصى: {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">الملفات المختارة ({selectedFiles.length})</h4>

          <div className={`grid gap-4 ${multiple ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {selectedFiles.map((file) => (
              <div key={file.id} className="bg-gray-50 rounded-lg p-4 relative group">
                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Preview */}
                {showPreview && (
                  <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* File Info */}
                {showFileInfo && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.type.split("/")[1].toUpperCase()}</span>
                    </div>


                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewFile.url || "/placeholder.svg"}
              alt={previewFile.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg">
              <p className="text-sm font-medium">{previewFile.name}</p>
              <p className="text-xs opacity-75">{formatFileSize(previewFile.size)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
