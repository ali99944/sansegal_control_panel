"use client"

import { QuickActions } from "../../pages/dashboard/QuickActions"


export default function ControlPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <main className="p-6 ">
        {children}
      </main>

      <QuickActions />
    </div>
  )
}
