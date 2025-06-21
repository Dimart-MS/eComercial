import React from 'react'

import { Box, Typography, Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar, Chip } from '@mui/material'

import type { UserType } from '@/types/user'

interface InfoChatUserProps {
  user: UserType
}

const InfoChatUser: React.FC<InfoChatUserProps> = ({ user }) => {
  // Datos simulados para mostrar información real
  const chatMessages = [
    { id: 1, text: 'Hola, ¿cómo va el proyecto?', sender: 'user', time: '10:30 AM', date: '2024-01-15' },
    {
      id: 2,
      text: 'Todo bien, estamos avanzando según lo planeado',
      sender: 'contact',
      time: '10:32 AM',
      date: '2024-01-15'
    },
    { id: 3, text: 'Perfecto, ¿necesitas algo más?', sender: 'user', time: '10:35 AM', date: '2024-01-15' },
    { id: 4, text: 'Sí, necesito la cotización actualizada', sender: 'contact', time: '10:40 AM', date: '2024-01-15' },
    { id: 5, text: 'Te la envío en 5 minutos', sender: 'user', time: '10:42 AM', date: '2024-01-15' }
  ]

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Historial de Chat con {user.name} {user.lastName}
      </Typography>
      <Box display='flex' alignItems='center' mb={2}>
        <Avatar src={user.avatarUrl} sx={{ width: 40, height: 40, mr: 2 }} />
        <Box>
          <Typography variant='subtitle2' fontWeight={600}>
            {user.name} {user.lastName}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {user.role} • {user.contacts.emails[0]?.address}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {chatMessages.map(msg => (
          <Box
            key={msg.id}
            mb={2}
            p={1.5}
            sx={{
              bgcolor: msg.sender === 'contact' ? 'grey.100' : 'primary.light',
              borderRadius: 1,
              ml: msg.sender === 'contact' ? 0 : 'auto',
              mr: msg.sender === 'contact' ? 'auto' : 0,
              maxWidth: '80%'
            }}
          >
            <Typography variant='body2' sx={{ color: msg.sender === 'contact' ? 'text.primary' : 'white' }}>
              {msg.text}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: msg.sender === 'contact' ? 'text.secondary' : 'rgba(255,255,255,0.7)',
                display: 'block',
                mt: 0.5
              }}
            >
              {msg.time} • {msg.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default InfoChatUser
