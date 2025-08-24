"use client"

import { useState, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { cn } from "../../lib/utils"

interface SnackbarItem {
  id: string
  message: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
}

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarItem["type"], duration?: number) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export function useSnackbar() {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider")
  }
  return context
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([])

  const showSnackbar = (message: string, type: SnackbarItem["type"], duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newSnackbar: SnackbarItem = { id, message, type, duration }
    
    setSnackbars(prev => [...prev, newSnackbar])

    if (duration > 0) {
      setTimeout(() => {
        removeSnackbar(id)
      }, duration)
    }
  }

  const removeSnackbar = (id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id))
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  }

  const styles = {
    success: "bg-accent text-white",
    error: "bg-red-500 text-white", 
    warning: "bg-yellow-500 text-white",
    info: "bg-primary text-white"
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        <AnimatePresence>
          {snackbars.map((snackbar) => (
            <motion.div
              key={snackbar.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-[400px]",
                styles[snackbar.type]
              )}
            >
              {icons[snackbar.type]}
              <span className="flex-1 text-sm font-medium">{snackbar.message}</span>
              <button
                onClick={() => removeSnackbar(snackbar.id)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SnackbarContext.Provider>
  )
}
