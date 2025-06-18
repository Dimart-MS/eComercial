import { Card, CardMedia, CardContent, Avatar, Typography, Button, AvatarGroup } from '@mui/material'

import type { TableBodyRowType } from './usersData'

type Props = {
  user: TableBodyRowType
}

const CardUser = ({ user }: Props) => {
  return (
    <Card>
      <CardMedia image='/images/cards/2.png' className='bs-[180px]' />
      <CardContent className='relative'>
        <Avatar
          src={user.avatarSrc}
          alt={user.name}
          className='is-[78px] bs-[78px] border-[5px] border-backgroundPaper absolute start-[11px] block-start-[-39px]'
        />
        <div className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2 mbe-5 mbs-[30px]'>
          <div className='flex flex-col items-start'>
            <Typography variant='h5'>{user.name}</Typography>
            <Typography variant='body2'>{user.email}</Typography>
          </div>
          <Button variant='contained'>Send Request</Button>
        </div>
        <div className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2'>
          <Typography variant='subtitle2' color='text.disabled'>
            18 mutual friends
          </Typography>
          <AvatarGroup max={4}>
            <Avatar src='/images/avatars/1.png' />
            <Avatar src='/images/avatars/5.png' />
            <Avatar src='/images/avatars/4.png' />
            <Avatar src='/images/avatars/6.png' />
            <Avatar src='/images/avatars/7.png' />
            <Avatar src='/images/avatars/8.png' />
          </AvatarGroup>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardUser
