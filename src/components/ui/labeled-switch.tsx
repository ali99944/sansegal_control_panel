"use client"

import { Label } from "./label"
import Switch from "./switch"

interface LabeledSwitchProps {
  id?: string
  title: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  switchClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export default function LabeledSwitch({
  id,
  title,
  description,
  checked,
  onChange,
  disabled = false,
  className = "",
  switchClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: LabeledSwitchProps) {
  const switchId = id || `switch-${title.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div className={`flex items-center justify-between p-4 bg-gray-100 rounded-lg ${className}`}>
      <div className="flex-1 pr-4">
        <Label htmlFor={switchId} className={`font-medium text-gray-900 cursor-pointer ${titleClassName}`}>
          {title}
        </Label>
        {description && <p className={`text-sm text-gray-600 mt-1 ${descriptionClassName}`}>{description}</p>}
      </div>
      <Switch id={switchId} checked={checked} onChange={onChange} disabled={disabled} className={switchClassName} />
    </div>
  )
}
