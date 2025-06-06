import 'server-only'
import { cookies } from 'next/headers'

/**
 * Obtiene el modo de tema (dark/light) desde las cookies del servidor
 * @returns {string} 'dark' o 'light'
 */
export function getServerMode(): string {
  const cookieStore = cookies()
  return cookieStore.get('mode')?.value || 'light'
}
