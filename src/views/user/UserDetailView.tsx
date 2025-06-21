'use client'

import React, { useState } from 'react'

import { Box, Button, Card, Typography, CardContent } from '@mui/material'

import UserProfileCard from './UserProfileCard'

// Imports para info
import InfoChatUser from './info/InfoChatUser'
import InfoAgenda from './info/InfoAgenda'
import InfoCorreoContent from './info/InfoCorreoContent'
import InfoActividad from './info/InfoActividad'

// Imports para infoDirect
import ChatUser from './infoDirect/ChatUser'
import AgendaContent from './infoDirect/AgendaContent'
import CorreoContent from './infoDirect/CorreoContent'
import ActividadContent from './infoDirect/ActividadContent'
import { ChatBubbleLeftRightIcon, CalendarDaysIcon, EnvelopeIcon, ListBulletIcon } from '@/components/icons'
import type { UserType, ActiveViewType, SectionKeyType } from '@/types/user'
import { sectionDisplayNames } from '@/types/user'

interface UserDetailViewProps {
  user: UserType
}

// Componente para el formulario de edición (Placeholder)
const EditFormPlaceholder: React.FC<{ section: SectionKeyType }> = ({ section }) => (
  <Card variant='outlined'>
    <CardContent>
      <Typography variant='h6' gutterBottom>
        Editando: {sectionDisplayNames[section]}
      </Typography>
      <Typography color='text.secondary'>El formulario para esta sección estará disponible próximamente.</Typography>
    </CardContent>
  </Card>
)

const UserDetailView: React.FC<UserDetailViewProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<ActiveViewType>('Chat')
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState<SectionKeyType[]>(['comunicacion'])

  const handleToggleSection = (section: SectionKeyType) => {
    // Si ya está en modo edición, solo cambia la sección activa, no la abre/cierra
    if (isEditing) {
      setExpandedSections([section])

      return
    }

    setExpandedSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [section]))
  }

  const handleViewChange = (view: ActiveViewType) => {
    if (isEditing) setIsEditing(false) // Salir del modo edición al cambiar de vista
    setActiveView(view)
  }

  const handleToggleEdit = (editing: boolean) => {
    setIsEditing(editing)

    if (editing) {
      // Al entrar en modo edición, colapsamos todas las vistas
      // y nos aseguramos que al menos una sección esté "abierta" para edición
      if (expandedSections.length === 0) {
        setExpandedSections(['generalInfo'])
      }
    } else {
      setActiveView('Chat')
    }
  }

  const renderActiveView = () => {
    if (isEditing) {
      return <EditFormPlaceholder section={expandedSections[0] || 'generalInfo'} />
    }

    // Renderizar el componente correspondiente según la vista activa
    switch (activeView) {
      case 'Chat':
        return <InfoChatUser user={user} />
      case 'Agenda':
        return <InfoAgenda user={user} />
      case 'Correo':
        return <InfoCorreoContent user={user} />
      case 'ActividadGeneral':
        return <InfoActividad user={user} />
      case 'ChatDirect':
        return <ChatUser user={user} />
      case 'AgendaDirect':
        return <AgendaContent user={user} />
      case 'CorreoDirect':
        return <CorreoContent user={user} />
      case 'ActividadDirect':
        return <ActividadContent user={user} />
      default:
        return <InfoChatUser user={user} />
    }
  }

  const navItems = [
    // Botones para info
    { id: 'Chat', label: 'Chat', icon: ChatBubbleLeftRightIcon },
    { id: 'Agenda', label: 'Agenda', icon: CalendarDaysIcon },
    { id: 'Correo', label: 'Correo', icon: EnvelopeIcon },
    { id: 'ActividadGeneral', label: 'Actividad', icon: ListBulletIcon }
  ]

  return (
    <Box className='min-h-screen p-4 md:p-6 lg:p-8' sx={{ bgcolor: 'background.default' }}>
      <Box className='flex flex-col lg:flex-row gap-6 md:gap-8'>
        {/* Columna Izquierda: Perfil del Usuario */}
        <Box className='w-full lg:w-[400px] xl:w-[420px] lg:flex-none'>
          <UserProfileCard
            user={user}
            activeView={activeView}
            isEditing={isEditing}
            expandedSections={expandedSections}
            onViewChange={handleViewChange}
            onToggleEdit={handleToggleEdit}
            onSectionToggle={handleToggleSection}
          />
        </Box>

        {/* Columna Derecha: Contenido de la Pestaña */}
        <Box className='flex-1 min-w-0 flex flex-col gap-4'>
          {!isEditing && (
            <Box display='flex' flexWrap='wrap' gap={2}>
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? 'contained' : 'text'}
                  onClick={() => handleViewChange(item.id as ActiveViewType)}
                  startIcon={<item.icon />}
                  sx={activeView !== item.id ? { color: 'text.secondary', bgcolor: 'action.hover' } : {}}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          <Card variant='outlined'>
            <CardContent>{renderActiveView()}</CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default UserDetailView
