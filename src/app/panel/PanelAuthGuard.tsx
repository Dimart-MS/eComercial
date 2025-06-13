'use client'
import { useContext, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { AuthContext } from '@/contexts/AuthContext'

export default function PanelAuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!auth?.isLoading && !auth?.token) {
      router.replace('/')
    }
  }, [auth?.isLoading, auth?.token, router])

  if (auth?.isLoading) return null
  if (!auth?.token) return null

  return <>{children}</>
}
