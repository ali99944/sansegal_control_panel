import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import AppProvider from './providers/app-provider'
import { AuthProvider } from './providers/auth-context'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
      </AppProvider>
  </StrictMode>,
)
