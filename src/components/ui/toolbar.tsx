"use client"

import type React from "react"
import { Home, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../redux/hook"
import { logout } from "../../redux/reducers/auth_reducer"

interface ToolbarProps {
  title: string
  children?: React.ReactNode
  className?: string
}

export default function Toolbar({ title, children, className = "" }: ToolbarProps) {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.clear()
    dispatch(logout())
    window.location.href = "/login"
  }

  return (
    <div className={`bg-primary/80 sticky top-6 z-50 rounded-lg px-2 py-2 text-white/90 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Link to="/" className="hover:text-white/70 transition-colors bg-secondary p-1.5 rounded">
            <Home size={24} />
          </Link>
          <h1 className="text-md">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {children && <div>{children}</div>}
          <button 
            onClick={handleLogout}
            className="hover:bg-destructive/85 bg-destructive p-2 rounded transition-colors text-white cursor-pointer"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
