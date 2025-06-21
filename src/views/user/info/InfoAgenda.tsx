import React from 'react'

import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material'

import type { UserType } from '@/types/user'

interface InfoAgendaProps {
  user: UserType
}

const InfoAgenda: React.FC<InfoAgendaProps> = ({ user }) => {
  const agendaEvents = [
    {
      id: 1,
      title: 'Reunión de seguimiento',
      date: '2024-01-20',
      time: '14:00',
      type: 'meeting',
      status: 'programada'
    },
    { id: 2, title: 'Entrega de propuesta', date: '2024-01-18', time: '16:00', type: 'delivery', status: 'completada' },
    { id: 3, title: 'Llamada de confirmación', date: '2024-01-22', time: '11:00', type: 'call', status: 'pendiente' },
    {
      id: 4,
      title: 'Presentación final',
      date: '2024-01-25',
      time: '15:30',
      type: 'presentation',
      status: 'programada'
    }
  ]

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Agenda y Eventos con {user.name} {user.lastName}
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={3}>
        Eventos programados y reuniones realizadas
      </Typography>
      <List>
        {agendaEvents.map(event => (
          <ListItem
            key={event.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
              bgcolor: event.status === 'completada' ? 'success.light' : 'background.paper'
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor:
                    event.type === 'meeting'
                      ? 'primary.main'
                      : event.type === 'delivery'
                        ? 'success.main'
                        : event.type === 'call'
                          ? 'info.main'
                          : 'warning.main',
                  width: 32,
                  height: 32
                }}
              >
                {event.type === 'meeting' ? 'M' : event.type === 'delivery' ? 'E' : event.type === 'call' ? 'L' : 'P'}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              secondary={`${event.date} • ${event.time}`}
              primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
            />
            <Chip
              label={event.status}
              size='small'
              color={event.status === 'completada' ? 'success' : event.status === 'programada' ? 'primary' : 'warning'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default InfoAgenda
