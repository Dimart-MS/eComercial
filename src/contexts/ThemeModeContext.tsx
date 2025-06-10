'use client'

import { createContext, useContext, useState, useEffect } from 'react'

import themeConfig from '@configs/themeConfig'
import type { Mode } from '@core/types'

console.log('ThemeModeContext loaded!')

const STORAGE_KEY = 'theme-mode'

type ThemeModeContextType = {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: themeConfig.mode,
  setMode: () => {}
})

/**
 * Hook para consumir el contexto de tema.
 */
export const useThemeMode = (): ThemeModeContextType => {
  console.log('useThemeMode called!')

  return useContext(ThemeModeContext)
}

/**
 * Proveedor del contexto de tema.
 */
export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<Mode>(themeConfig.mode)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null

    if (stored === 'light' || stored === 'dark') {
      setModeState(stored)
    }
  }, [])

  const setMode = (newMode: Mode) => {
    setModeState(newMode)

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newMode)
    }
  }

  return <ThemeModeContext.Provider value={{ mode, setMode }}>{children}</ThemeModeContext.Provider>
}
