import React from 'react'

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge
} from '@mui/material'

import type { UserType } from '@/types/user'

interface InfoDirectProps {
  user: UserType
  type: 'chat' | 'agenda' | 'correo' | 'actividad'
}

const InfoDirect: React.FC<InfoDirectProps> = ({ user, type }) => {
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

  const getContent = () => {
    switch (type) {
      case 'chat':
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

      case 'agenda':
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
                      {event.type === 'meeting'
                        ? 'M'
                        : event.type === 'delivery'
                          ? 'E'
                          : event.type === 'call'
                            ? 'L'
                            : 'P'}
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
                    color={
                      event.status === 'completada' ? 'success' : event.status === 'programada' ? 'primary' : 'warning'
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )

      case 'correo':
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

      case 'actividad':
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

      default:
        return <Typography>Información no disponible</Typography>
    }
  }

  return (
    <Card variant='outlined'>
      <CardContent>{getContent()}</CardContent>
    </Card>
  )
}

export default InfoDirect
