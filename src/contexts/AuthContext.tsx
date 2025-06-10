'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import type { User, AuthContextType } from '../types/auth'
import { ROUTES, LOCAL_STORAGE_KEYS, IMAGES } from '../constants/index'

/**
 * Contexto de autenticación que proporciona el estado y las funciones de autenticación
 * a toda la aplicación.
 */
export const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Proveedor del contexto de autenticación que maneja el estado de autenticación
 * y proporciona funciones para login, registro, logout y recuperación de contraseña.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  /**
   * Limpia el mensaje de error actual
   */
  const clearError = () => setError(null)

  /**
   * Maneja el proceso de cierre de sesión
   * Limpia el estado local y el almacenamiento
   */
  const handleLogout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGOUT_EVENT, Date.now().toString())
    router.push(ROUTES.LOGIN)
  }, [router])

  /**
   * Efecto para cargar el estado de autenticación al montar el componente
   * Verifica si hay un token y usuario almacenados
   */
  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER)

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Error al cargar el estado de autenticación', e)
        handleLogout()
      }
    }
  }, [handleLogout])

  /**
   * Efecto para manejar cambios en el almacenamiento entre pestañas
   * Permite sincronizar el estado de autenticación entre diferentes pestañas
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === LOCAL_STORAGE_KEYS.LOGOUT_EVENT ||
        (event.key === LOCAL_STORAGE_KEYS.TOKEN && !event.newValue)
      ) {
        // Si se eliminó el token o se disparó el evento de logout desde otra pestaña
        if (token) {
          // solo cierra sesión si actualmente está conectado en esta pestaña
          setUser(null)
          setToken(null)
          router.push(ROUTES.LOGIN)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [token, router])

  /**
   * Maneja el proceso de inicio de sesión
   * @param emailOrUsername - Email o nombre de usuario
   * @param password - Contraseña
   */
  const login = async (emailOrUsername: string, password: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (emailOrUsername === 'admin@ecomercial.com' && password === 'Admin123!') {
        const mockUser: User = {
          id: '1',
          username: 'Admin',
          email: 'admin@ecomercial.com',
          avatar: IMAGES.AVATAR,
          role: 'Admin'
        }

        const mockToken = Date.now().toString() + Math.random().toString(36).substring(7)

        setUser(mockUser)
        setToken(mockToken)
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(mockUser))
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, mockToken)
        router.push(ROUTES.DASHBOARD)
      } else {
        setError('Email o contraseña incorrectos')
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intente de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el proceso de registro de usuario
   * @param username - Nombre de usuario
   * @param email - Email
   * @param password - Contraseña
   */
  const register = async (username: string, email: string, password: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Registered:', { username, email, password })
    } catch (err) {
      setError('Error al registrar usuario')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Maneja el proceso de cierre de sesión
   */
  const logout = () => {
    handleLogout()
  }

  /**
   * Maneja el proceso de recuperación de contraseña
   * @param email - Email del usuario
   */
  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    // Validación de correo vacío
    if (!email.trim()) {
      setIsLoading(false)
      setError('El correo no puede estar vacío')

      return
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setIsLoading(false)
      setError('El formato del correo es inválido')

      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      console.log('Password reset link sent to:', email)
    } catch (err) {
      setError('Error al enviar el enlace de recuperación')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, error, login, register, logout, forgotPassword, clearError }}
    >
      {children}
    </AuthContext.Provider>
  )
}
