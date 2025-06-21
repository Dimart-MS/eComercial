import React from 'react'

import { Box, Typography, Card, CardContent } from '@mui/material'

const AgendaContent: React.FC = () => {
  return (
    <Box className='w-full min-h-[300px]'>
      <Typography variant='h6' className='mb-4'>
        Agenda y Eventos
      </Typography>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='body2' color='text.secondary' className='mb-4'>
            Esta sección está destinada a mostrar un calendario, próximos eventos, reuniones o tareas programadas
            relacionadas con el contacto.
          </Typography>
          <Box
            className='mt-6 p-4 border border-dashed border-green-300 bg-green-50 rounded-md'
            sx={{
              borderColor: 'success.light',
              bgcolor: 'success.light',
              opacity: 0.1
            }}
          >
            <Typography variant='body2' color='success.main' className='text-center'>
              (Contenedor para un componente de calendario o lista de eventos)
            </Typography>
            <Box
              className='mt-4 h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500'
              sx={{ bgcolor: 'grey.200' }}
            >
              <Typography variant='body2' color='text.secondary'>
                Espacio para Calendario/Eventos
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AgendaContent
