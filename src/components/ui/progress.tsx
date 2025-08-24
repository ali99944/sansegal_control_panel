"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        info: "bg-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number
  showValue?: boolean
  showPercentage?: boolean
  label?: string
  animated?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  size, 
  variant, 
  showValue = false, 
  showPercentage = false,
  label,
  animated = false,
  ...props 
}, ref) => {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayValue(value), 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value, animated])

  return (
    <div className="w-full">
      {(label || showValue || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {(showValue || showPercentage) && (
            <span className="text-sm text-gray-500">
              {showValue && `${Math.round(displayValue)}`}
              {showValue && showPercentage && "/"}
              {showPercentage && `${Math.round(displayValue)}%`}
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size, className }))}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - displayValue}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

// Circular Progress Component
interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  variant?: "default" | "success" | "warning" | "error" | "info"
  showValue?: boolean
  className?: string
  children?: React.ReactNode
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    value = 0, 
    size = 120, 
    strokeWidth = 8, 
    variant = "default", 
    showValue = false,
    className,
    children,
    ...props 
  }, ref) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    const variantColors = {
      default: "stroke-primary",
      success: "stroke-green-500",
      warning: "stroke-yellow-500",
      error: "stroke-red-500",
      info: "stroke-blue-500",
    }

    return (
      <div 
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-in-out", variantColors[variant])}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children || (showValue && (
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(value)}%
            </span>
          ))}
        </div>
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

// Step Progress Component
interface StepProgressProps {
  steps: Array<{
    label: string
    description?: string
    completed?: boolean
    current?: boolean
  }>
  orientation?: "horizontal" | "vertical"
  className?: string
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({ steps, orientation = "horizontal", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row items-center" : "flex-col",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex items-center",
                orientation === "vertical" ? "flex-row mb-4" : "flex-col"
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
                  step.completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : step.current
                    ? "border-primary text-primary bg-primary/10"
                    : "border-gray-300 text-gray-500 bg-white"
                )}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              
              {/* Step Content */}
              <div
                className={cn(
                  orientation === "horizontal" ? "mt-2 text-center" : "mr-4 text-right"
                )}
              >
                <div
                  className={cn(
                    "text-sm font-medium",
                    step.completed || step.current ? "text-gray-900" : "text-gray-500"
                  )}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "bg-gray-300",
                  orientation === "horizontal"
                    ? "flex-1 h-0.5 mx-4"
                    : "w-0.5 h-8 mr-4 -mt-2 mb-2"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
StepProgress.displayName = "StepProgress"

export { Progress, CircularProgress, StepProgress }
