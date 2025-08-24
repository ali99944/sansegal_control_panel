"use client"

import type React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../redux/store"
import NotificationProvider from "./notification-provider"
import ReactQueryProvider from "./query-provider"

interface AppProviderProps {
    children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={<div className="min-h-screen bg-background flex items-center justify-center">جاري التحميل...</div>} persistor={persistor}>
                <ReactQueryProvider>
                    <NotificationProvider>
                        <div className="font-arabic" dir="rtl">
                            {children}
                        </div>
                    </NotificationProvider>
                </ReactQueryProvider>
            </PersistGate>
        </Provider>
    )
}
