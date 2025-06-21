'use client'

import React, { useContext, useEffect } from 'react'

import { useRouter, usePathname } from 'next/navigation'
import router from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { ROUTES } from '@/constants'

// Componente de carga
const LoadingSpinner = () => (
  <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
  </div>
)

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!auth?.isLoading && !auth?.token) {
      router.push(ROUTES.LOGIN)
    }
  }, [auth?.isLoading, auth?.token, router])

  if (!auth || auth.isLoading) return <LoadingSpinner />
  if (!auth.token) return null

  return <>{children}</>
}

// Componente para rutas de invitados
const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!auth?.isLoading && auth?.token) {
      router.push(ROUTES.PANEL)
    }
  }, [auth?.isLoading, auth?.token, router])

  if (!auth || auth.isLoading) return <LoadingSpinner />
  if (auth.token) return null

  return <>{children}</>
}

// Componente principal
const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || ''
  const auth = useContext(AuthContext)

  // Determinar si la ruta actual es protegida o pública
  const isProtectedRoute = pathname === ROUTES.PANEL
  const isGuestRoute = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD].includes(pathname)

  if (isProtectedRoute) {
    return <ProtectedRoute>{children}</ProtectedRoute>
  }

  if (isGuestRoute) {
    return <GuestRoute>{children}</GuestRoute>
  }

  // Redirigir a login si no hay token y no estamos en una ruta de invitado
  if (!auth?.token && !isGuestRoute) {
    router.push(ROUTES.LOGIN)

    return null
  }

  return <>{children}</>
}

export default App
