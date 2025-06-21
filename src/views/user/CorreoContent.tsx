import React from 'react'

import { Box, Typography, Card, CardContent } from '@mui/material'

const CorreoContent: React.FC = () => {
  return (
    <Box className='w-full min-h-[300px]'>
      <Typography variant='h6' className='mb-4'>
        Bandeja de Correo
      </Typography>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='body2' color='text.secondary' className='mb-4'>
            Aquí se podría integrar una vista de la bandeja de entrada de correos relacionados con este contacto, o una
            herramienta para redactar y enviar nuevos correos.
          </Typography>
          <Box
            className='mt-6 p-4 border border-dashed border-purple-300 bg-purple-50 rounded-md'
            sx={{
              borderColor: 'secondary.light',
              bgcolor: 'secondary.light',
              opacity: 0.1
            }}
          >
            <Typography variant='body2' color='secondary.main' className='text-center'>
              (Contenedor para una interfaz de cliente de correo)
            </Typography>
            <Box
              className='mt-4 h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500'
              sx={{ bgcolor: 'grey.200' }}
            >
              <Typography variant='body2' color='text.secondary'>
                Espacio para Interfaz de Correo
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CorreoContent
