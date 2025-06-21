'use client'

import { useRouter } from 'next/navigation'

export const useUserNavigation = () => {
  const router = useRouter()

  const navigateToContactDetail = (userId: string) => {
    router.push(`/panel/contactos/user/${userId}`)
  }

  return { navigateToContactDetail }
}
