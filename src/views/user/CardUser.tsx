import { Card, CardContent, Avatar, Typography, Chip, Divider } from '@mui/material'

import type { ChatUserType } from './infoDirect/ChatUser'

interface CardUserProps {
  user: ChatUserType
}

const CardUser = ({ user }: CardUserProps) => (
  <Card
    className='shadow-lg'
    sx={{
      bgcolor: 'background.paper',
      color: 'text.primary',
      borderRadius: 3,
      p: 0,
      minWidth: 0
    }}
  >
    <CardContent className='flex flex-col items-center gap-2 p-6'>
      <Avatar
        src={user.avatarSrc}
        alt={user.name}
        sx={{ width: 80, height: 80, mb: 2, border: '4px solid', borderColor: 'background.default' }}
      />
      <Typography variant='h6' fontWeight={600}>
        {user.name} {user.lastName}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {user.companies?.[0]?.name || 'Sin empresa'}
      </Typography>
      <Chip
        label={user.category || 'Sin categoría'}
        color='primary'
        size='small'
        sx={{ mt: 1, textTransform: 'capitalize' }}
      />
      <Divider sx={{ my: 2, width: '100%' }} />
      <Typography variant='body2' color='text.secondary'>
        <strong>Email:</strong> {user.contacts?.emails?.[0]?.address || 'N/D'}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        <strong>Teléfono:</strong>{' '}
        {user.contacts?.phones?.[0] ? `${user.contacts.phones[0].region} ${user.contacts.phones[0].number}` : 'N/D'}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        <strong>Estado:</strong>{' '}
        <Chip
          label={user.status}
          size='small'
          color={user.status === 'activo' ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize' }}
        />
      </Typography>
    </CardContent>
  </Card>
)

export default CardUser
