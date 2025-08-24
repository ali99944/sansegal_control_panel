"use client"

import { LucideIcon, Music } from 'lucide-react'

interface SkeletonLoaderProps {
  cardCount?: number; // Number of skeleton cards to display
  showHeader?: boolean; // Whether to show header placeholder
  icon?: LucideIcon; // Optional icon for header
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  cardCount = 3,
  showHeader = true,
  icon: Icon = Music,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        {showHeader && (
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon size={32} className="text-gray-300" />
            </div>
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded-lg mx-auto mt-2 animate-pulse" />
          </div>
        )}

        {/* Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 w-full bg-gray-200 rounded-lg mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-lg mb-2" />
              <div className="h-4 w-2/3 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader