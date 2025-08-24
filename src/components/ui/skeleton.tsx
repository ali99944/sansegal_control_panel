import { cn } from "../../lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({ className, variant = "rectangular", width, height, lines = 1 }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200"

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              "h-4 rounded",
              index === lines - 1 && "w-3/4",
              className,
            )}
            style={{ width: index === lines - 1 ? "75%" : width, height }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClasses,
        {
          rounded: variant === "rectangular",
          "rounded-full": variant === "circular",
          "h-4 rounded": variant === "text",
        },
        className,
      )}
      style={{ width, height }}
    />
  )
}

// Enhanced preset skeleton components
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
      <div className="flex space-x-2">
        <Skeleton width={60} height={24} />
        <Skeleton width={80} height={24} />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} height={20} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b border-gray-200 last:border-b-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height={16} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonButton() {
  return <Skeleton width={100} height={40} className="rounded-lg" />
}

export function SkeletonInput() {
  return (
    <div className="space-y-2">
      <Skeleton width={80} height={16} />
      <Skeleton width="100%" height={40} className="rounded-lg" />
    </div>
  )
}

export function SkeletonNavigation() {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width={120} height={20} />
        </div>
        <div className="flex space-x-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
      </div>
      <div className="flex space-x-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width={80} height={16} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton width={150} height={20} />
        <Skeleton width={80} height={32} className="rounded-lg" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Skeleton width={60} height={12} />
            <Skeleton width={`${Math.random() * 60 + 40}%`} height={8} />
            <Skeleton width={40} height={12} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={64} height={64} />
        <div className="space-y-2 flex-1">
          <Skeleton width="40%" height={20} />
          <Skeleton width="60%" height={16} />
          <Skeleton width="30%" height={14} />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton width="100%" height={16} />
        <Skeleton width="80%" height={16} />
        <Skeleton width="90%" height={16} />
      </div>
      <div className="flex space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} width={60} height={24} className="rounded-lg" />
        ))}
      </div>
    </div>
  )
}
