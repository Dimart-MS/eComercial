import React from 'react'

import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material'

import type { UserType } from '@/types/user'

interface InfoActividadProps {
  user: UserType
}

const InfoActividad: React.FC<InfoActividadProps> = ({ user }) => {
  const activities = [
    {
      id: 1,
      type: 'cotización',
      title: 'Cotización Proyecto A',
      amount: '$15,000',
      date: '2024-01-15',
      status: 'aprobada'
    },
    { id: 2, type: 'factura', title: 'Factura #2024-001', amount: '$8,500', date: '2024-01-12', status: 'pagada' },
    {
      id: 3,
      type: 'propuesta',
      title: 'Propuesta Servicios B',
      amount: '$12,000',
      date: '2024-01-10',
      status: 'en revisión'
    },
    { id: 4, type: 'contrato', title: 'Contrato Anual', amount: '$45,000', date: '2024-01-08', status: 'firmado' },
    { id: 5, type: 'factura', title: 'Factura #2023-045', amount: '$6,200', date: '2024-01-05', status: 'pendiente' }
  ]

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Actividades Comerciales con {user.name} {user.lastName}
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={3}>
        Cotizaciones, facturas y documentos comerciales
      </Typography>
      <List>
        {activities.map(activity => (
          <ListItem
            key={activity.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
              bgcolor:
                activity.status === 'aprobada' || activity.status === 'pagada'
                  ? 'success.light'
                  : activity.status === 'pendiente'
                    ? 'warning.light'
                    : 'background.paper'
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor:
                    activity.type === 'cotización'
                      ? 'info.main'
                      : activity.type === 'factura'
                        ? 'success.main'
                        : activity.type === 'propuesta'
                          ? 'warning.main'
                          : 'primary.main',
                  width: 32,
                  height: 32
                }}
              >
                {activity.type === 'cotización'
                  ? 'C'
                  : activity.type === 'factura'
                    ? 'F'
                    : activity.type === 'propuesta'
                      ? 'P'
                      : 'T'}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={activity.title}
              secondary={`${activity.date} • ${activity.amount}`}
              primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
            />
            <Chip
              label={activity.status}
              size='small'
              color={
                activity.status === 'aprobada' || activity.status === 'pagada'
                  ? 'success'
                  : activity.status === 'pendiente'
                    ? 'warning'
                    : activity.status === 'en revisión'
                      ? 'info'
                      : 'primary'
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default InfoActividad
