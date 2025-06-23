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
import type {
  UserType,
  ActiveViewType,
  SectionKeyType,
  PhoneContact,
  EmailContact,
  RelatedCompany,
  UserDocument,
  SocialNetwork
} from '@/types/user'
import { sectionDisplayNames } from '@/types/user'

// Imports para formularios de edición
import EditComunicacionForm from './forms/Comunicacion'
import EditConfiguracionForm from './forms/ConfiguracionContacto'
import EditDatosPersonalesForm from './forms/DatosPersonalesAdicionales'
import EditUbicacionForm from './forms/Ubicacion'
import EditEmpresaRelacionadaForm from './forms/EmpresaRelacionada'
import EditDocumentosForm from './forms/DocumentosDigiatales'

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

  // Estados locales para los formularios de edición
  const [editData, setEditData] = useState<{
    comunicacion: {
      phones: PhoneContact[]
      emails: EmailContact[]
      socialNetworks: SocialNetwork[]
    }
    datosPersonales: typeof user.personalInfo
    configuracion: { status: string; settings: typeof user.settings }
    empresaRelacionada: RelatedCompany[]
    ubicacion: typeof user.addresses
    perfil: Record<string, unknown>
    documentos: UserDocument[]
  }>({
    comunicacion: {
      phones: Array.isArray(user.contacts.phones) ? user.contacts.phones : [],
      emails: Array.isArray(user.contacts.emails) ? user.contacts.emails : [],
      socialNetworks: Array.isArray(user.socialNetworks) ? user.socialNetworks : []
    },
    datosPersonales: user.personalInfo,
    configuracion: { status: String(user.status), settings: user.settings },
    empresaRelacionada: Array.isArray(user.companies)
      ? user.companies.map(c => ({
          companyName: c.companyName ?? '',
          position: c.position ?? ''
        }))
      : [],
    ubicacion: Array.isArray(user.addresses) ? user.addresses : [],
    perfil: {},
    documentos: Array.isArray(user.documents) ? user.documents : []
  })

  // Handlers para empresaRelacionada
  const handleEmpresaRelacionadaChange = (companies: RelatedCompany[]) =>
    setEditData(prev => ({ ...prev, empresaRelacionada: companies }))

  const handleEmpresaRelacionadaAdd = () =>
    setEditData(prev => ({
      ...prev,
      empresaRelacionada: [...prev.empresaRelacionada, { companyName: '', position: '' }]
    }))

  const handleEmpresaRelacionadaRemove = (idx: number) =>
    setEditData(prev => ({ ...prev, empresaRelacionada: prev.empresaRelacionada.filter((_, i) => i !== idx) }))

  // Handlers para documentos
  const handleDocumentosChange = (docs: UserDocument[]) => setEditData(prev => ({ ...prev, documentos: docs }))

  const handleDocumentosAdd = () =>
    setEditData(prev => ({
      ...prev,
      documentos: [...prev.documentos, { fileName: '', fileType: '', url: '', uploadedAt: '', observation: '' }]
    }))

  const handleDocumentosRemove = (idx: number) =>
    setEditData(prev => ({ ...prev, documentos: prev.documentos.filter((_, i) => i !== idx) }))

  // Handlers para ubicacion
  const handleUbicacionChange = (addresses: any[]) => setEditData(prev => ({ ...prev, ubicacion: addresses }))
  const handleUbicacionAdd = () => setEditData(prev => ({ ...prev, ubicacion: [...prev.ubicacion, {}] }))

  const handleUbicacionRemove = (idx: number) =>
    setEditData(prev => ({ ...prev, ubicacion: prev.ubicacion.filter((_, i) => i !== idx) }))

  // Handler para comunicacion
  const handleComunicacionChange = (
    type: 'phones' | 'emails' | 'socialNetworks',
    idx: number,
    field: string,
    value: string
  ) => {
    setEditData(prev => {
      const updated = { ...prev.comunicacion }

      if (type === 'phones') {
        const arr = [...updated.phones] as PhoneContact[]

        arr[idx] = { ...arr[idx], [field]: value }
        updated.phones = arr
      } else if (type === 'emails') {
        const arr = [...updated.emails] as EmailContact[]

        arr[idx] = { ...arr[idx], [field]: value }
        updated.emails = arr
      } else if (type === 'socialNetworks') {
        const arr = [...updated.socialNetworks] as SocialNetwork[]

        arr[idx] = { ...arr[idx], [field]: value }
        updated.socialNetworks = arr
      }

      return { ...prev, comunicacion: updated }
    })
  }

  const handleComunicacionAdd = (type: 'phones' | 'emails' | 'socialNetworks') => {
    setEditData(prev => {
      const updated = { ...prev.comunicacion }

      if (type === 'phones') {
        updated.phones = [...updated.phones, { region: '', number: '', type: 'personal' }] as PhoneContact[]
      } else if (type === 'emails') {
        updated.emails = [...updated.emails, { address: '', type: 'personal', alias: '' }] as EmailContact[]
      } else if (type === 'socialNetworks') {
        updated.socialNetworks = [...updated.socialNetworks, { type: '', username: '' }] as SocialNetwork[]
      }

      return { ...prev, comunicacion: updated }
    })
  }

  const handleComunicacionRemove = (type: 'phones' | 'emails' | 'socialNetworks', idx: number) => {
    setEditData(prev => {
      const updated = { ...prev.comunicacion }

      if (type === 'phones') {
        updated.phones = updated.phones.filter((_, i) => i !== idx) as PhoneContact[]
      } else if (type === 'emails') {
        updated.emails = updated.emails.filter((_, i) => i !== idx) as EmailContact[]
      } else if (type === 'socialNetworks') {
        updated.socialNetworks = updated.socialNetworks.filter((_, i) => i !== idx) as SocialNetwork[]
      }

      return { ...prev, comunicacion: updated }
    })
  }

  const handleDatosPersonalesChange = (field: keyof typeof user.personalInfo, value: string) => {
    setEditData(prev => ({ ...prev, datosPersonales: { ...prev.datosPersonales, [field]: value } }))
  }

  const handleConfiguracionChange = (field: 'status' | keyof typeof user.settings, value: string | boolean) => {
    setEditData(prev => {
      if (field === 'status') {
        return { ...prev, configuracion: { ...prev.configuracion, status: String(value) } }
      }

      return {
        ...prev,
        configuracion: {
          ...prev.configuracion,
          settings: { ...prev.configuracion.settings, [field]: value }
        }
      }
    })
  }

  const handleToggleSection = (section: SectionKeyType) => {
    // Si está en modo edición, solo se puede abrir una sección a la vez
    if (isEditing) {
      setExpandedSections([section])

      return
    }

    setExpandedSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [section]))
  }

  const handleViewChange = (view: ActiveViewType) => {
    if (isEditing) setIsEditing(false)

    setActiveView(view)
  }

  const handleToggleEdit = (editing: boolean) => {
    setIsEditing(editing)

    if (editing) {
      setExpandedSections(['comunicacion']) // Siempre abrir comunicación al editar
    } else {
      setActiveView('Chat')
    }
  }

  const renderActiveView = () => {
    if (isEditing) {
      // Solo mostrar el formulario de la sección expandida
      const section = expandedSections[0] || 'comunicacion'

      return sectionFormMap[section]
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

  const sectionFormMap: Record<SectionKeyType, React.ReactNode> = {
    comunicacion: (
      <EditComunicacionForm
        data={editData.comunicacion}
        onChange={handleComunicacionChange}
        onAdd={handleComunicacionAdd}
        onRemove={handleComunicacionRemove}
      />
    ),
    datosPersonales: <EditDatosPersonalesForm data={editData.datosPersonales} onChange={handleDatosPersonalesChange} />,
    configuracion: <EditConfiguracionForm data={editData.configuracion} onChange={handleConfiguracionChange} />,
    empresaRelacionada: (
      <EditEmpresaRelacionadaForm data={editData.empresaRelacionada} onChange={handleEmpresaRelacionadaChange} />
    ),
    ubicacion: (
      <EditUbicacionForm
        data={editData.ubicacion}
        onChange={handleUbicacionChange}
        onAdd={handleUbicacionAdd}
        onRemove={handleUbicacionRemove}
      />
    ),
    perfil: <EditFormPlaceholder section='perfil' />, // No implementado
    documentos: (
      <EditDocumentosForm
        data={editData.documentos}
        onChange={handleDocumentosChange}
        onAdd={handleDocumentosAdd}
        onRemove={handleDocumentosRemove}
      />
    ),
    generalInfo: <EditFormPlaceholder section='generalInfo' />
  }

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
