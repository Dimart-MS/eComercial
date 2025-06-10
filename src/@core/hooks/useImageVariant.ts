import type { Mode } from '@core/types'

export const useImageVariant = (mode: Mode, imgLight: string, imgDark: string): string => {
  return mode === 'dark' ? imgDark : imgLight
}
