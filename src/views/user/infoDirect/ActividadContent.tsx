import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'

import type { UserType } from '@/types/user'

interface ActividadContentProps {
  user: UserType
}

const ActividadContent = ({ user }: ActividadContentProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Actividad Direct - {user.name} {user.lastName}
        </Typography>
        <Typography color='text.secondary'>Funcionalidad de actividad próximamente...</Typography>
      </CardContent>
    </Card>
  )
}

export default ActividadContent
