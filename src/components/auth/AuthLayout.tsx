'use client'

import React from 'react'

import Link from 'next/link'

import { Box, Paper, useTheme } from '@mui/material'

import { ROUTES, IMAGES } from '@/constants'

/**
 * Props para el componente AuthLayout
 * @property {string} illustrationSrc - URL de la imagen de ilustración para el panel izquierdo
 * @property {React.ReactNode} children - Contenido del formulario que se mostrará en el panel derecho
 * @property {string} pageTitle - Título de la página para el atributo alt de la imagen
 */
interface AuthLayoutProps {
  illustrationSrc: string
  children: React.ReactNode
  pageTitle: string
}

/**
 * AuthLayout - Componente de diseño para páginas de autenticación
 *
 * Este componente proporciona un diseño consistente para las páginas de autenticación
 * con un panel izquierdo que muestra una ilustración (3/4 de la pantalla) y un panel derecho
 * para el formulario (1/4 de la pantalla).
 *
 * Características:
 * - Diseño responsive que se adapta a diferentes tamaños de pantalla
 * - Soporte para modo oscuro/claro a través de Material-UI
 * - Logo en la esquina superior izquierda
 * - Ilustración centrada en el panel izquierdo
 * - Panel derecho con fondo gris elegante para el formulario
 *
 * @param {AuthLayoutProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente AuthLayout
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ illustrationSrc, children, pageTitle }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        bgcolor: theme.palette.background.default
      }}
    >
      {/* Panel Izquierdo - Ilustración (3/4 de la pantalla) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: { md: '75%' },
          alignItems: 'stretch',
          justifyContent: 'center',
          p: 0,
          position: 'relative',
          bgcolor: theme.palette.grey[100],
          color: theme.palette.grey[900],
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Logo */}
        <Link href={ROUTES.LOGIN} style={{ position: 'absolute', top: 32, left: 32, zIndex: 2 }}>
          <img src={IMAGES.LOGO} alt='Logo' style={{ height: 32 }} />
        </Link>

        {/* Ilustración */}
        <Box
          component='img'
          src={illustrationSrc}
          alt={pageTitle}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      </Box>

      {/* Panel Derecho - Formulario (1/4 de la pantalla) */}
      <Box
        sx={{
          width: { xs: '100%', md: '25%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6 },
          minHeight: { xs: '100vh', md: 'auto' },
          bgcolor: theme.palette.background.default
        }}
      >
        {/* Logo para vista móvil */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
          <Link href={ROUTES.LOGIN}>
            <img src={IMAGES.LOGO} alt='Logo' style={{ height: 32, margin: '0 auto' }} />
          </Link>
        </Box>

        {/* Contenedor del formulario */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 400,
            p: { xs: 2, sm: 4 },
            bgcolor: 'transparent'
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  )
}

export default AuthLayout
