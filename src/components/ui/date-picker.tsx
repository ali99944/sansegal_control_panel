
import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import moment from "moment"

interface DatePickerProps {
  value?: Date | string
  onChange?: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  showTime?: boolean
  minDate?: Date
  maxDate?: Date
  format?: "date" | "datetime" | "time"
  label?: string
  error?: string
  required?: boolean
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "اختر التاريخ",
  disabled = false,
  className = "",
  showTime = false,
  minDate,
  maxDate,
  format = "date",
  label,
  error,
  required = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (!value) return null;
    if (typeof value === "string") {
      // Parse date string in YYYY-MM-DD format
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day); // month is 0-based in Date constructor
    }
    return value;
  })
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date())
  const [timeValue, setTimeValue] = useState({
    hours: selectedDate?.getHours() || 0,
    minutes: selectedDate?.getMinutes() || 0,
  })

  const pickerRef = useRef<HTMLDivElement>(null)

  // Arabic month names
  const arabicMonths = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ]

  // Arabic day names
  const arabicDays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (date: Date | null): string => {
    if (!date) return ""

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    if (showTime || format === "datetime") {
      options.hour = "2-digit"
      options.minute = "2-digit"
    }

    return moment(date.toISOString()).format('DD-MM-YYYY')
  }

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day, timeValue.hours, timeValue.minutes)

    if (isDateDisabled(newDate)) return

    setSelectedDate(newDate)
    onChange?.(newDate)

    if (!showTime && format === "date") {
      setIsOpen(false)
    }
  }

  const handleTimeChange = (type: "hours" | "minutes", value: number) => {
    const newTimeValue = { ...timeValue, [type]: value }
    setTimeValue(newTimeValue)

    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setHours(newTimeValue.hours, newTimeValue.minutes)
      setSelectedDate(newDate)
      onChange?.(newDate)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setViewDate(newDate)
  }

  const navigateYear = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate)
    if (direction === "prev") {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setViewDate(newDate)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate)
    const firstDay = getFirstDayOfMonth(viewDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
      const isSelected = selectedDate && isSameDay(date, selectedDate)
      const isToday = isSameDay(date, new Date())
      const isDisabled = isDateDisabled(date)

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          className={`
            w-8 h-8 text-sm rounded-lg transition-colors
            ${isSelected ? "bg-primary text-white" : ""}
            ${isToday && !isSelected ? "bg-primary/10 text-primary" : "hover:bg-primary/20 hover:text-primary"}
            ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
            ${!isSelected && !isToday && !isDisabled ? "text-gray-700" : ""}
          `}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      {/* Input Field */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-2 px-4 py-1.5 border rounded text-right
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"}
          ${error ? "border-red-500" : "border-gray-300"}
          focus:outline-none
        `}
      >
        <Calendar className="w-4 h-4 text-primary text-gray-400" />
        <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
      </button>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow z-50 p-4 min-w-80">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigateYear("prev")}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-primary" />
              </button>
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-primary" />
              </button>
            </div>

            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {arabicMonths[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-primary" />
              </button>
              <button
                type="button"
                onClick={() => navigateYear("next")}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {arabicDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">{renderCalendar()}</div>

          {/* Time Picker */}
          {(showTime || format === "datetime") && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 justify-center">
                <Clock className="w-4 h-4 text-primary text-gray-400" />
                <div className="flex items-center gap-2">
                  <select
                    value={timeValue.hours}
                    onChange={(e) => handleTimeChange("hours", parseInt(e.target.value))}
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring focus:ring-primary/20"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-500">:</span>
                  <select
                    value={timeValue.minutes}
                    onChange={(e) => handleTimeChange("minutes", parseInt(e.target.value))}
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex justify-between pt-2 border-t border-gray-300">
            <button
                type="button"
              onClick={() => {
                const today = new Date()
                setSelectedDate(today)
                setViewDate(today)
                onChange?.(today)
                if (!showTime && format === "date") {
                  setIsOpen(false)
                }
              }}
              className="text-sm cursor-pointer text-primary hover:text-primary/80 transition-colors"
            >
              اليوم
            </button>
            <button
                type="button"
              onClick={() => {
                setSelectedDate(null)
                onChange?.(null)
                setIsOpen(false)
              }}
              className="text-sm cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            >
              مسح
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
