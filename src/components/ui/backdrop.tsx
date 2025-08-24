import { cn } from "../../lib/utils"

interface BackdropProps {
  isOpen: boolean
  onClose?: () => void
  className?: string
  blur?: boolean
}

export function Backdrop({ isOpen, onClose, className, blur = true }: BackdropProps) {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 bg-black/50 transition-opacity duration-200',
        blur && 'backdrop-blur-sm',
        className
      )}
      onClick={onClose}
    />
  )
}
