
import type React from "react"

// Base Skeleton with animation
function SkeletonBase({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return <div className={`animate-pulse ${className}`}>{children}</div>
}

// Product Card Skeleton
export function ProductCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-4 ${className}`}>
      <div className="space-y-4">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200 rounded-lg"></div>

        {/* Badge skeleton */}
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Category skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        {/* Price skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
          ))}
          <div className="h-3 bg-gray-200 rounded w-8 mr-2"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Category Card Skeleton
export function CategoryCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-6 text-center ${className}`}>
      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </SkeletonBase>
  )
}

// Promotion Card Skeleton
export function PromotionCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${className}`}>
      <div className="h-40 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Blog Card Skeleton
export function BlogCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${className}`}>
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Header Skeleton
export function HeaderSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white border-b border-gray-100 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="h-8 bg-gray-200 rounded w-32"></div>

          {/* Navigation */}
          <div className="hidden md:flex gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
            ))}
          </div>

          {/* Search and actions */}
          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-64 hidden md:block"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Hero Section Skeleton
export function HeroSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded w-32"></div>
              <div className="h-12 bg-gray-200 rounded w-28"></div>
            </div>
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Filter Sidebar Skeleton
export function FilterSidebarSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-6 ${className}`}>
      <div className="space-y-6">
        <div className="h-6 bg-gray-200 rounded w-24"></div>

        {/* Filter groups */}
        {[...Array(4)].map((_, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Price range */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Breadcrumb Skeleton
export function BreadcrumbSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`flex items-center gap-2 ${className}`}>
      <div className="h-4 bg-gray-200 rounded w-12"></div>
      <div className="h-4 bg-gray-200 rounded w-1"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-4 bg-gray-200 rounded w-1"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </SkeletonBase>
  )
}

// Product Details Skeleton
export function ProductDetailsSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`${className}`}>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="h-96 bg-gray-200 rounded-xl"></div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>

          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Cart Item Skeleton
export function CartItemSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-4 ${className}`}>
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-8"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
    </SkeletonBase>
  )
}

// Order Summary Skeleton
export function OrderSummarySkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-6 ${className}`}>
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-32"></div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-14"></div>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </SkeletonBase>
  )
}

// Profile Info Skeleton
export function ProfileInfoSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded w-20"></div>
      </div>
    </SkeletonBase>
  )
}

// Order History Item Skeleton
export function OrderHistoryItemSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-white rounded-xl border border-gray-100 p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>

      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="h-5 bg-gray-200 rounded w-20"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </SkeletonBase>
  )
}

// Grid Skeleton
export function GridSkeleton({
  items = 8,
  columns = 4,
  SkeletonComponent = ProductCardSkeleton,
  className = "",
}: {
  items?: number
  columns?: number
  SkeletonComponent?: React.ComponentType<{ className?: string }>
  className?: string
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[2]} ${gridCols[columns as keyof typeof gridCols]} gap-6 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  )
}

// Page Loading Skeleton
export function PageLoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <HeaderSkeleton />
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbSkeleton className="mb-6" />
        <div className="space-y-8">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <GridSkeleton items={12} columns={4} />
        </div>
      </div>
      <FooterSkeleton />
    </div>
  )
}

// Search Results Skeleton
export function SearchResultsSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </SkeletonBase>
  )
}

// Footer Skeleton
export function FooterSkeleton({ className = "" }: { className?: string }) {
  return (
    <SkeletonBase className={`bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-700 rounded w-24"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-700 rounded w-20"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-700 rounded w-48"></div>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonBase>
  )
}
