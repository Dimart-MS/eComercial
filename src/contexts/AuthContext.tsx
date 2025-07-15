/**
 * CONTEXTO DE AUTENTICACIÓN - eComercial
 * 
 * Gestión centralizada del estado de autenticación con persistencia local
 * y sincronización entre pestañas del navegador.
 * 
 * CARACTERÍSTICAS:
 * - Estado global de usuario y token
 * - Persistencia en localStorage
 * - Sincronización entre pestañas
 * - Autenticación mock para desarrollo
 * - Redirección automática
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import type { User, AuthContextType } from '../types/auth'
import { ROUTES, LOCAL_STORAGE_KEYS, IMAGES } from '../constants/index'

/**
 * Contexto de autenticación que proporciona estado y funciones de autenticación.
 */
export const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Proveedor del contexto de autenticación.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados principales del contexto
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Limpia el mensaje de error actual
  const clearError = () => setError(null)

  /**
   * Maneja el proceso de cierre de sesión.
   * Limpia estado local, localStorage y redirige a login.
   */
  const handleLogout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOGOUT_EVENT, Date.now().toString())
    setTimeout(() => {
      window.location.href = '/login'
    }, 100)
  }, [])

  /**
   * Carga el estado de autenticación al montar el componente.
   * Verifica token y usuario en localStorage.
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
    } else {
      setToken(null)
      setUser(null)
    }

    setIsLoading(false)
  }, [handleLogout])

  /**
   * Maneja cambios en localStorage entre pestañas.
   * Sincroniza el estado de autenticación.
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === LOCAL_STORAGE_KEYS.LOGOUT_EVENT ||
        (event.key === LOCAL_STORAGE_KEYS.TOKEN && !event.newValue)
      ) {
        if (token) {
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
   * Maneja el proceso de inicio de sesión.
   * Implementa autenticación mock para desarrollo.
   * 
   * Credenciales mock: admin@ecomercial.com / Admin123!
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
        router.push(ROUTES.PANEL)
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
   * Maneja el proceso de registro de usuario.
   * Implementación mock para desarrollo.
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

  // Wrapper que llama a handleLogout
  const logout = () => {
    handleLogout()
  }

  /**
   * Maneja la recuperación de contraseña.
   * Valida email y simula envío de enlace.
   */
  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    if (!email.trim()) {
      setIsLoading(false)
      setError('El correo no puede estar vacío')
      return
    }

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
