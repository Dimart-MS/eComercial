import React from 'react'

import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material'

import type { UserType } from '@/types/user'

interface InfoCorreoContentProps {
  user: UserType
}

const InfoCorreoContent: React.FC<InfoCorreoContentProps> = ({ user }) => {
  const emails = [
    {
      id: 1,
      subject: 'Cotización Proyecto A',
      to: user.contacts.emails[0]?.address,
      date: '2024-01-15',
      status: 'enviado',
      content: 'Adjunto la cotización solicitada...'
    },
    {
      id: 2,
      subject: 'Confirmación de reunión',
      to: user.contacts.emails[0]?.address,
      date: '2024-01-14',
      status: 'enviado',
      content: 'Confirmamos la reunión para el lunes...'
    },
    {
      id: 3,
      subject: 'Factura #2024-001',
      to: user.contacts.emails[0]?.address,
      date: '2024-01-12',
      status: 'enviado',
      content: 'Adjunto la factura correspondiente...'
    },
    {
      id: 4,
      subject: 'Seguimiento de proyecto',
      to: user.contacts.emails[0]?.address,
      date: '2024-01-10',
      status: 'enviado',
      content: 'Informe de avance del proyecto...'
    }
  ]

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Correos Enviados a {user.name} {user.lastName}
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={3}>
        Historial de comunicaciones por email
      </Typography>
      <List>
        {emails.map(email => (
          <ListItem
            key={email.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                <i className='ri-mail-line' style={{ fontSize: 16 }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={email.subject}
              secondary={
                <Box>
                  <Typography variant='caption' display='block'>
                    Para: {email.to}
                  </Typography>
                  <Typography variant='caption' display='block'>
                    {email.date} • {email.content.substring(0, 50)}...
                  </Typography>
                </Box>
              }
              primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
            />
            <Chip label={email.status} size='small' color='success' />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default InfoCorreoContent
