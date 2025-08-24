"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { type Manager } from "../types/manager"
import { useGetQuery } from "../hooks/queries-actions" // Reusing your query hook for 'me' endpoint

// Define the shape of the context value
interface AuthContextType {
  isAuthenticated: boolean
  manager: Manager | null
  token: string | null
  login: (newToken: string, newManager: Manager) => void
  logout: () => void
  isLoading: boolean // To handle the initial auth check
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [manager, setManager] = useState<Manager | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage on component mount
    return localStorage.getItem("authToken")
  })

  // Hook to fetch user data if a token exists
  const { data: userData, isLoading, isError } = useGetQuery<Manager>({
    key: ["current-manager"],
    url: "me", // The endpoint to get the authenticated user's data
    options: {
      enabled: !!token, // Only run this query if a token exists
      retry: 1, // Don't retry endlessly if the token is invalid
    },
  })

  // Effect to handle changes from the 'me' endpoint query
  useEffect(() => {
    console.log(userData);
    
    if (userData) {
      setManager(userData)
    }
    // If there's an error (e.g., token is invalid/expired), log the user out
    if (isError) {
      logout()
    }
  }, [userData, isError])

  // --- Core Authentication Functions ---

  const login = useCallback((newToken: string, newManager: Manager) => {
    setToken(newToken)
    setManager(newManager)
    localStorage.setItem("authToken", newToken)
    // Redirect to the dashboard after a successful login
    location.pathname = "/"
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setManager(null)
    localStorage.removeItem("authToken")
    // Redirect to the login page after logging out
    location.pathname = "/login"
  }, [])

  // The value provided to consuming components
  const contextValue: AuthContextType = {
    isAuthenticated: !!manager,
    manager,
    token,
    login,
    logout,
    isLoading, // True while the initial 'me' request is in flight
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy access to the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}