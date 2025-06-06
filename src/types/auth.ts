// React Imports
import type { ReactNode } from 'react'

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role?: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (emailOrUsername: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  clearError: () => void
}

export interface ValidationErrors {
  [key: string]: string | undefined
}

export interface SocialLink {
  name: string
  icon: ReactNode
  color: string
  href: string
}
