import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'

import type { UserType } from '@/types/user'

interface CorreoContentProps {
  user: UserType
}

const CorreoContent = ({ user }: CorreoContentProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Correo Direct - {user.name} {user.lastName}
        </Typography>
        <Typography color='text.secondary'>Funcionalidad de correo próximamente...</Typography>
      </CardContent>
    </Card>
  )
}

export default CorreoContent
