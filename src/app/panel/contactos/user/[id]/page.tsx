'use client'

import React, { useState, useEffect } from 'react'

import { Box, CircularProgress, Alert } from '@mui/material'

import UserDetailView from '@/views/user/UserDetailView'
import type { UserType } from '@/types/user'
import { mapApiToUser } from '@/utils/user-adapter'

interface UserDetailPageProps {
  params: { id: string }
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ params }) => {
  const { id } = params
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/user.json')

        if (!response.ok) {
          throw new Error('No se pudo cargar la lista de usuarios.')
        }

        const usersData = await response.json()
        const foundUser = usersData.find((u: any) => u.id === id)

        if (foundUser) {
          setUser(mapApiToUser(foundUser))
        } else {
          setError('Usuario no encontrado.')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUserData()
    }
  }, [id])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    )
  }

  if (!user) {
    return (
      <Box p={4}>
        <Alert severity='warning'>No se ha podido encontrar el usuario seleccionado.</Alert>
      </Box>
    )
  }

  return <UserDetailView user={user} />
}

export default UserDetailPage
