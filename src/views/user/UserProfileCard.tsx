'use client'

import React from 'react'

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from '@mui/material'

import {
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  ListBulletIcon,
  PencilSquareIcon,
  ChevronDownIcon
} from '@/components/icons'
import type { UserType, ActiveViewType, SectionKeyType } from '@/types/user'
import { UserRole, sectionDisplayNames } from '@/types/user'

// --- Interfaces del componente ---
interface UserProfileCardProps {
  user: UserType
  activeView: ActiveViewType
  isEditing: boolean
  expandedSections: SectionKeyType[]
  onViewChange: (view: ActiveViewType) => void
  onToggleEdit: (editing: boolean) => void
  onSectionToggle: (section: SectionKeyType) => void
}

interface DetailItemProps {
  label: string
  value?: string | number | boolean | null
  isBoolean?: boolean
  isCheckbox?: boolean
  defaultText?: string
}

// --- Sub-componentes internos ---
const DetailItem: React.FC<DetailItemProps> = ({ label, value, isBoolean, isCheckbox, defaultText = 'N/A' }) => {
  let displayValue: React.ReactNode = value ?? defaultText

  if (isBoolean) {
    displayValue = value ? 'Sí' : 'No'
  }

  if (isCheckbox) {
    displayValue = <input type='checkbox' readOnly checked={!!value} className='form-checkbox text-primary' />
  }

  return (
    <Box display='flex' justifyContent='space-between' width='100%' my={0.5} gap={2}>
      <Typography variant='body2' color='text.secondary' noWrap>
        {label}:
      </Typography>
      <Typography
        variant='body2'
        color='text.primary'
        className='capitalize text-right'
        sx={{ wordBreak: 'break-word' }}
      >
        {displayValue as string}
      </Typography>
    </Box>
  )
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  activeView,
  isEditing,
  expandedSections,
  onViewChange,
  onToggleEdit,
  onSectionToggle
}) => {
  const roleColors: Record<UserRole, 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error'> = {
    [UserRole.Cliente]: 'success',
    [UserRole.Acreedor]: 'info',
    [UserRole.Proveedor]: 'warning',
    [UserRole.Prospecto]: 'primary',
    [UserRole.Colaborador]: 'secondary'
  }

  const profileNavItems = [
    { view: 'ChatDirect', label: 'Chat', icon: ChatBubbleLeftRightIcon },
    { view: 'AgendaDirect', label: 'Agenda', icon: CalendarDaysIcon },
    { view: 'CorreoDirect', label: 'Correo', icon: EnvelopeIcon },
    { view: 'ActividadDirect', label: 'Actividad', icon: ListBulletIcon }
  ]

  const AccordionSection = ({
    id,
    title,
    children
  }: {
    id: SectionKeyType
    title: string
    children: React.ReactNode
  }) => (
    <Accordion
      expanded={expandedSections.includes(id)}
      onChange={() => onSectionToggle(id)}
      sx={{
        boxShadow: 'none',
        '&:before': { display: 'none' },
        borderTop: '1px solid',
        borderColor: 'divider',
        m: '0 !important'
      }}
    >
      <AccordionSummary expandIcon={<ChevronDownIcon />} aria-controls={`${id}-content`} id={`${id}-header`}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1, '& .MuiTypography-body2': { textTransform: 'none' } }}>{children}</AccordionDetails>
    </Accordion>
  )

  return (
    <Card className='shadow-lg' sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
      <CardContent className='p-6'>
        {/* Información Fija del Perfil */}
        <Box className='flex flex-col items-center text-center'>
          <div className='relative group'>
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              sx={{ width: 90, height: 90, mb: 2, border: '4px solid', borderColor: 'background.default' }}
            />
            {isEditing && (
              <Button
                size='small'
                variant='contained'
                color='primary'
                onClick={() => onSectionToggle('generalInfo')}
                sx={{ position: 'absolute', top: 0, right: 0, minWidth: 'auto', p: '4px', borderRadius: '50%' }}
              >
                <PencilSquareIcon className='text-lg' />
              </Button>
            )}
          </div>
          <Typography variant='h6' fontWeight={600}>
            {user.name} {user.lastName || ''}
          </Typography>
          <Chip
            label={user.role}
            size='small'
            color={roleColors[user.role] || 'default'}
            sx={{ mt: 1, textTransform: 'capitalize' }}
          />
        </Box>

        {/* Botones de Navegación de Vistas */}
        {!isEditing && (
          <Box className='my-6 flex flex-wrap items-center justify-center gap-1'>
            {profileNavItems.map(item => (
              <Button
                key={item.view}
                variant={activeView === item.view ? 'contained' : 'outlined'}
                size='small'
                onClick={() => onViewChange(item.view as ActiveViewType)}
                startIcon={<item.icon />}
                color={activeView === item.view ? 'inherit' : 'secondary'}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem',
                  minWidth: 'auto',
                  ...(activeView === item.view && {
                    bgcolor: 'grey.500',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'grey.600'
                    }
                  })
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
        <Divider sx={{ my: 2 }} />

        {/* Secciones de Acordeón */}
        <Box mt={2} className='flex flex-col'>
          <AccordionSection id='comunicacion' title={sectionDisplayNames.comunicacion}>
            {user.contacts.phones.map((phone, i) => (
              <Box key={`phone-${i}`} mb={2}>
                <DetailItem label='Teléfono' value={`${phone.region} ${phone.number}`} />
                <DetailItem label='Tipo Tel.' value={phone.type} />
              </Box>
            ))}
            {user.contacts.emails.map((email, i) => (
              <Box key={`email-${i}`} mb={2}>
                <DetailItem label='Correo' value={email.address} />
                <DetailItem label='Tipo Correo' value={email.type} />
              </Box>
            ))}
          </AccordionSection>
          <AccordionSection id='datosPersonales' title={sectionDisplayNames.datosPersonales}>
            <DetailItem label='Género' value={user.personalInfo.gender} />
            <DetailItem label='Nacimiento' value={user.personalInfo.birthDate} />
            <DetailItem label='Profesión' value={user.personalInfo.profession} />
            <DetailItem label='Educación' value={user.personalInfo.education} />
            <DetailItem label='Estado Civil' value={user.personalInfo.maritalStatus} />
          </AccordionSection>
          <AccordionSection id='configuracion' title={sectionDisplayNames.configuracion}>
            <DetailItem label='Estado' value={user.status} />
            <DetailItem label='Categoría' value={user.settings.category} />
            <DetailItem label='Campaña MKT' value={user.settings.marketingCampaign} isCheckbox />
          </AccordionSection>
          <AccordionSection id='ubicacion' title={sectionDisplayNames.ubicacion}>
            {user.addresses.map((addr, i) => (
              <Box key={`addr-${i}`} mb={2} p={1.5} border={1} borderColor='divider' borderRadius={1}>
                <Typography variant='subtitle2' gutterBottom>
                  Dirección {i + 1}
                </Typography>
                <DetailItem
                  label='Calle'
                  value={`${addr.street} ${addr.extNum || ''} ${addr.intNum ? `Int. ${addr.intNum}` : ''}`}
                />
                <DetailItem label='Colonia' value={addr.neighborhood} />
                <DetailItem label='C.P.' value={addr.zipCode} />
                <DetailItem label='Ciudad' value={`${addr.municipality}, ${addr.city}`} />
                <DetailItem label='País' value={`${addr.state}, ${addr.country}`} />
              </Box>
            ))}
          </AccordionSection>
          <AccordionSection id='perfil' title={sectionDisplayNames.perfil}>
            <DetailItem label='Influye Decisiones' value={user.profile.influencesDecisions} isBoolean />
            <DetailItem label='Actividades' value={user.profile.mainActivities} />
            <DetailItem label='Oportunidades' value={user.profile.opportunityAreas} />
            <DetailItem label='Recomendaciones' value={user.profile.recommendations} />
            <DetailItem label='Notas' value={user.profile.notes} />
          </AccordionSection>
          <AccordionSection id='documentos' title={sectionDisplayNames.documentos}>
            {user.documents.map((doc, i) => (
              <Box key={`doc-${i}`} mb={2} p={1.5} border={1} borderColor='divider' borderRadius={1}>
                <DetailItem label='Archivo' value={doc.fileName} />
                <DetailItem label='Tipo' value={doc.fileType} />
                <DetailItem label='Fecha' value={doc.uploadedAt} />
                <DetailItem label='Nota' value={doc.observation} />
              </Box>
            ))}
          </AccordionSection>
        </Box>

        {/* Botones de Acción */}
        <Box className='mt-6 flex flex-row gap-2 justify-center'>
          <Button size='small' variant='contained' onClick={() => onToggleEdit(!isEditing)}>
            {isEditing ? 'Guardar' : 'Editar Perfil'}
          </Button>
          <Button
            size='small'
            variant='outlined'
            color={isEditing ? 'secondary' : 'error'}
            onClick={() => (isEditing ? onToggleEdit(false) : console.log('Suspender'))}
          >
            {isEditing ? 'Cancelar' : 'Suspender'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfileCard
