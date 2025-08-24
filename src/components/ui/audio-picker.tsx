"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, X, Music, Play, Pause, Volume2, Download, FileAudio } from "lucide-react"
import Button from "./button"

interface AudioFile {
  id: string
  file: File
  url: string
  name: string
  size: number
  type: string
  duration?: number
  metadata?: {
    title?: string
    artist?: string
    album?: string
    year?: string
    genre?: string
  }
}

interface AudioPickerProps {
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
  showWaveform?: boolean
  autoPlay?: boolean
}

export default function AudioPicker({
  onChange,
  onUrlChange,
  multiple = false,
  maxFiles = 10,
  maxSize = 50, // 50MB default for audio files
  acceptedTypes = ["audio/mpeg", "audio/wav", "audio/flac", "audio/aac", "audio/ogg", "audio/mp4"],
  className = "",
  disabled = false,
  placeholder,
  showPreview = true,
  showFileInfo = true,
  dragAndDrop = true,
}: AudioPickerProps) {
  const [selectedFiles, setSelectedFiles] = useState<AudioFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [playbackProgress, setPlaybackProgress] = useState<{ [key: string]: number }>({})
  const [loadingFiles, setLoadingFiles] = useState<Set<string>>(new Set())

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  // Extract audio metadata
  const extractMetadata = async (file: File): Promise<AudioFile["metadata"]> => {
    return new Promise((resolve) => {
      const audio = new Audio()
      const url = URL.createObjectURL(file)

      audio.src = url
      audio.addEventListener("loadedmetadata", () => {
        // Basic metadata - in a real app, you might use a library like music-metadata
        resolve({
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          artist: "Unknown Artist",
          album: "Unknown Album",
        })
        URL.revokeObjectURL(url)
      })

      audio.addEventListener("error", () => {
        resolve({})
        URL.revokeObjectURL(url)
      })
    })
  }

  // Get audio duration
  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio()
      const url = URL.createObjectURL(file)

      audio.src = url
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration)
        URL.revokeObjectURL(url)
      })

      audio.addEventListener("error", () => {
        resolve(0)
        URL.revokeObjectURL(url)
      })
    })
  }

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `نوع الملف غير مدعوم. الأنواع المدعومة: ${acceptedTypes.map((type) => type.split("/")[1]).join(", ")}`
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
  }

  // Process files
  const processFiles = useCallback(
    async (files: FileList) => {
      const newFiles: AudioFile[] = []
      const loadingIds = new Set<string>()

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const error = validateFile(file)

        if (error) {
          alert(error)
          continue
        }

        const id = Math.random().toString(36).substr(2, 9)
        loadingIds.add(id)
        setLoadingFiles((prev) => new Set([...prev, id]))

        try {
          const url = URL.createObjectURL(file)
          const duration = await getAudioDuration(file)
          const metadata = await extractMetadata(file)

          const audioFile: AudioFile = {
            id,
            file,
            url,
            name: file.name,
            size: file.size,
            type: file.type,
            duration,
            metadata,
          }

          newFiles.push(audioFile)
        } catch (error) {
          console.error("Error processing audio file:", error)
        } finally {
          setLoadingFiles((prev) => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
          })
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
    [selectedFiles, multiple, onChange, onUrlChange],
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
    // Stop audio if playing
    if (currentlyPlaying === id) {
      const audio = audioRefs.current[id]
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      setCurrentlyPlaying(null)
    }

    // Clean up audio ref and URL
    if (audioRefs.current[id]) {
      delete audioRefs.current[id]
    }

    const fileToRemove = selectedFiles.find((f) => f.id === id)
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.url)
    }

    const updatedFiles = selectedFiles.filter((f) => f.id !== id)
    setSelectedFiles(updatedFiles)

    const files = updatedFiles.map((f) => f.file)
    const urls = updatedFiles.map((f) => f.url)

    onChange?.(multiple ? files : files[0] || null)
    onUrlChange?.(multiple ? urls : urls[0] || null)
  }

  // Audio playback controls
  const togglePlayback = (id: string) => {
    const audio = audioRefs.current[id]
    if (!audio) return

    if (currentlyPlaying === id) {
      audio.pause()
      setCurrentlyPlaying(null)
    } else {
      // Pause other audios
      Object.values(audioRefs.current).forEach((a) => {
        a.pause()
        a.currentTime = 0
      })

      audio.play()
      setCurrentlyPlaying(id)
    }
  }

  // Setup audio element
  const setupAudio = (audioFile: AudioFile) => {
    if (audioRefs.current[audioFile.id]) return

    const audio = new Audio(audioFile.url)
    audioRefs.current[audioFile.id] = audio

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100
        setPlaybackProgress((prev) => ({ ...prev, [audioFile.id]: progress }))
      }
    })

    audio.addEventListener("ended", () => {
      setCurrentlyPlaying(null)
      setPlaybackProgress((prev) => ({ ...prev, [audioFile.id]: 0 }))
    })

    audio.addEventListener("error", () => {
      console.error("Audio playback error")
      setCurrentlyPlaying(null)
    })
  }

  // Format duration
  const formatDuration = (seconds?: number): string => {
    if (!seconds || seconds === 0) return "0:00"

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Get placeholder text
  const getPlaceholderText = () => {
    if (placeholder) return placeholder
    if (multiple) {
      return `اسحب الملفات الصوتية هنا أو انقر للاختيار (حد أقصى ${maxFiles} ملفات)`
    }
    return "اسحب الملف الصوتي هنا أو انقر للاختيار"
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        URL.revokeObjectURL(file.url)
      })
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause()
        audio.src = ""
      })
    }
  }, [])

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
          <h4 className="text-sm font-medium text-gray-900">الملفات الصوتية المختارة ({selectedFiles.length})</h4>

          <div className="space-y-3">
            {selectedFiles.map((audioFile) => {
              setupAudio(audioFile)
              const isPlaying = currentlyPlaying === audioFile.id
              const progress = playbackProgress[audioFile.id] || 0
              const isLoading = loadingFiles.has(audioFile.id)

              return (
                <div key={audioFile.id} className="bg-gray-50 rounded-lg p-4 relative group">
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(audioFile.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-4">
                    {/* Audio Icon & Play Button */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      {showPreview && !isLoading && (
                        <button
                          type="button"
                          onClick={() => togglePlayback(audioFile.id)}
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="w-3 h-3 text-primary" />
                          ) : (
                            <Play className="w-3 h-3 text-primary ml-0.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-gray-900 truncate">
                          {audioFile.metadata?.title || audioFile.name}
                        </h5>
                        {isLoading && (
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>

                      {showFileInfo && (
                        <div className="space-y-1">
                          {audioFile.metadata?.artist && (
                            <p className="text-sm text-gray-600">
                              {audioFile.metadata.artist}
                              {audioFile.metadata.album && ` • ${audioFile.metadata.album}`}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FileAudio className="w-3 h-3" />
                              {audioFile.type.split("/")[1].toUpperCase()}
                            </span>
                            <span>{formatFileSize(audioFile.size)}</span>
                            {audioFile.duration && (
                              <span className="flex items-center gap-1">
                                <Volume2 className="w-3 h-3" />
                                {formatDuration(audioFile.duration)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Progress Bar */}
                      {showPreview && audioFile.duration && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-primary h-1 rounded-full transition-all duration-100"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = audioFile.url
                          link.download = audioFile.name
                          link.click()
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loadingFiles.size > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            معالجة الملفات الصوتية...
          </div>
        </div>
      )}
    </div>
  )
}
