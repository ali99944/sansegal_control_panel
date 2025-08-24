"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Check, X } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  render?: (option: SelectOption, isSelected: boolean) => React.ReactNode
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

export type SelectOptions = (SelectOption | SelectOptionGroup)[]

interface SelectProps {
  options: SelectOptions
  value?: string | string[]
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  onChange?: (value: string | string[]) => void
  multiple?: boolean
  clearable?: boolean
}

export function Select({
  options,
  value,
  placeholder = "Select an option",
  label,
  disabled = false,
  className,
  onChange,
  multiple = false,
  clearable = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(value) ? value : value ? [value] : [])
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedValues(Array.isArray(value) ? value : value ? [value] : [])
  }, [value])

  const handleValueChange = useCallback(
    (newValues: string[]) => {
      setSelectedValues(newValues)
      if (onChange) {
        onChange(multiple ? newValues : newValues[0] || "")
      }
    },
    [onChange, multiple],
  )

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled || disabled) return

    if (multiple) {
      const newSelectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter((val) => val !== option.value)
        : [...selectedValues, option.value]
      handleValueChange(newSelectedValues)
    } else {
      handleValueChange([option.value])
      setIsOpen(false)
    }
  }

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation() // Prevent opening the dropdown
    handleValueChange([])
  }

  const getDisplayValue = () => {
    if (selectedValues.length === 0) {
      return placeholder
    }
    if (multiple) {
      const labels = selectedValues
        .map((val) => {
          for (const opt of options) {
            if ("options" in opt) {
              const found = opt.options.find((o) => o.value === val)
              if (found) return found.label
            } else if (opt.value === val) {
              return opt.label
            }
          }
          return ""
        })
        .filter(Boolean)
      return labels.join(", ")
    }
    const singleSelectedOption = options
      .flatMap((opt) => ("options" in opt ? opt.options : [opt]))
      .find((o) => o.value === selectedValues[0])
    return singleSelectedOption ? singleSelectedOption.label : placeholder
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault()
        setIsOpen(!isOpen)
        break
      case "Escape":
        setIsOpen(false)
        break
      case "ArrowDown":
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        }
        // TODO: Add keyboard navigation for options
        break
      case "ArrowUp":
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        }
        // TODO: Add keyboard navigation for options
        break
    }
  }

  return (
    <div className={cn("relative w-full", className)} ref={selectRef}>
      {label && <label className="block text-sm font-normal text-gray-900 mb-2">{label}</label>}

      <button
        type="button"
        className={cn(
          "relative w-full bg-white border rounded px-3 py-2 text-left cursor-pointer",
          "focus:outline-none focus:border-gray-400",
          "transition-colors duration-150 ease-out",
          "text-sm text-gray-900",
          disabled && "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200",
          isOpen ? "border-gray-400" : "border-gray-300",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate pr-6">{getDisplayValue()}</span>
        {clearable && selectedValues.length > 0 && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-6 flex items-center pr-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-500 transition-transform duration-200 ease-out",
              isOpen && "transform rotate-180",
            )}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded border border-gray-200",
            "overflow-auto focus:outline-none",
            "animate-in fade-in-0 zoom-in-98 duration-150 ease-out",
          )}
          role="listbox"
        >
          {options.map((item, index) => {
            if ("options" in item) {
              // Render option group
              return (
                <React.Fragment key={item.label + index}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.options.map((option) => {
                    const isSelected = selectedValues.includes(option.value)
                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "relative cursor-pointer select-none py-2 px-3 text-sm transition-colors duration-100 ease-out",
                          option.disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100",
                          isSelected && "bg-gray-100",
                        )}
                        onClick={() => handleOptionClick(option)}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {option.render ? (
                          option.render(option, isSelected)
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="block truncate">{option.label}</span>
                            {multiple && (
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                checked={isSelected}
                                readOnly
                              />
                            )}
                            {!multiple && isSelected && <Check className="h-4 w-4 text-gray-900 ml-2 flex-shrink-0" />}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              )
            } else {
              // Render single option
              const isSelected = selectedValues.includes(item.value)
              return (
                <div
                  key={item.value}
                  className={cn(
                    "relative cursor-pointer select-none py-2 px-3 text-sm transition-colors duration-100 ease-out",
                    item.disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100",
                    isSelected && "bg-gray-100",
                  )}
                  onClick={() => handleOptionClick(item)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {item.render ? (
                    item.render(item, isSelected)
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="block truncate">{item.label}</span>
                      {multiple && (
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={isSelected}
                          readOnly
                        />
                      )}
                      {!multiple && isSelected && <Check className="h-4 w-4 text-gray-900 ml-2 flex-shrink-0" />}
                    </div>
                  )}
                </div>
              )
            }
          })}
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">No options available</div>
          )}
        </div>
      )}
    </div>
  )
}
