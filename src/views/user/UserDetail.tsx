import { useState } from 'react'

import { Card, Tabs, Tab, Box } from '@mui/material'

import CardUser from './CardUser'
import ChatUser from './infoDirect/ChatUser'

const UserDetailView = ({ user }) => {
  const [tab, setTab] = useState(0)

  return (
    <Box className='flex flex-col md:flex-row gap-6 p-4 md:p-8 bg-[var(--mui-palette-background-default)] min-h-screen'>
      {/* Card de usuario */}
      <Box className='w-full md:w-1/3'>
        <CardUser user={user} />
      </Box>
      {/* Contenido con tabs */}
      <Box className='flex-1'>
        <Card className='p-0'>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant='scrollable'
            scrollButtons='auto'
            className='border-b'
            sx={{
              background: 'var(--mui-palette-background-paper)',
              color: 'var(--mui-palette-text-primary)'
            }}
          >
            <Tab label='Chat' />
            <Tab label='Agenda' />
            <Tab label='Correo' />
            <Tab label='Actividad' />
          </Tabs>
          <Box className='p-4 md:p-6'>
            {tab === 0 && <ChatUser user={user} />}
            {tab === 1 && <div className='text-gray-500 dark:text-gray-400'>Agenda (próximamente)</div>}
            {tab === 2 && <div className='text-gray-500 dark:text-gray-400'>Correo (próximamente)</div>}
            {tab === 3 && <div className='text-gray-500 dark:text-gray-400'>Actividad (próximamente)</div>}
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default UserDetailView
