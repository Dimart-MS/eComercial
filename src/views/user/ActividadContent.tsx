import React from 'react'

import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material'

interface ActividadContentProps {
  context?: 'tasks' | 'projects' | 'general'
}

const ActividadContent: React.FC<ActividadContentProps> = ({ context = 'general' }) => {
  let title = 'Actividad General'
  let description = 'Esta área puede mostrar un historial de actividad general relacionada con el contacto.'
  let exampleItems = [
    'Actividad general de ejemplo 1',
    'Actividad general de ejemplo 2',
    'Actividad general de ejemplo 3'
  ]

  if (context === 'tasks') {
    title = 'Actividad de Tareas'
    description = 'Aquí se muestra un resumen de las tareas completadas y pendientes para este contacto.'
    exampleItems = [
      "Tarea 'Seguimiento Cliente A' completada.",
      "Tarea 'Preparar propuesta B' iniciada.",
      "Tarea 'Revisar contrato C' pendiente."
    ]
  } else if (context === 'projects') {
    title = 'Actividad de Proyectos'
    description = 'Detalles sobre los proyectos en los que este contacto está involucrado y su progreso.'
    exampleItems = [
      "Proyecto 'Implementación CRM' - Fase 2 completada.",
      "Proyecto 'Desarrollo Web X' - Sprint 3 en curso.",
      "Proyecto 'Consultoría Y' - Kickoff realizado."
    ]
  }

  return (
    <Box className='w-full min-h-[300px]'>
      <Typography variant='h6' className='mb-4'>
        {title}
      </Typography>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='body2' color='text.secondary' className='mb-4'>
            {description}
          </Typography>
          <Box
            className='mt-6 p-4 border border-dashed border-sky-400 bg-sky-50 rounded-md'
            sx={{
              borderColor: 'info.light',
              bgcolor: 'info.light',
              opacity: 0.1
            }}
          >
            <Typography variant='body2' color='info.main' className='text-center mb-4'>
              (Contenedor para lista de actividades o configuraciones)
            </Typography>
            <List dense>
              {exampleItems.map((item, index) => (
                <ListItem key={index} sx={{ bgcolor: 'grey.100', mb: 1, borderRadius: 1 }}>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
            {exampleItems.length === 0 && (
              <Typography variant='body2' color='text.secondary' className='text-center py-4'>
                No hay actividad registrada para mostrar.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ActividadContent
