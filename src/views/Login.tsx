/**
 * PÁGINA DE LOGIN - eComercial
 * 
 * Formulario de autenticación principal del sistema.
 * Permite acceso con email o username y contraseña.
 * 
 * CAMPOS INCLUIDOS:
 * - emailOrUsername: string (email o username válido)
 * - password: string (requerido)
 * - rememberMe: boolean (opcional)
 * 
 * VALIDACIONES:
 * - Email: Formato estándar con regex
 * - Username: 3-30 caracteres, alfanumérico
 * - Password: Campo requerido
 * - Validación en tiempo real con Zod
 * 
 * FLUJO DE NAVEGACIÓN:
 * - Acceso: /login
 * - Validación: En tiempo real
 * - Envío: POST a /api/auth/login
 * - Redirección: /panel en éxito, error en formulario
 * 
 * ESTADOS:
 * - loading: Durante autenticación
 * - error: Mensajes de error específicos
 * - success: Redirección automática
 * 
 * INTEGRACIÓN:
 * - AuthContext para estado global
 * - useRouter para navegación
 * - react-hook-form + zod para validación
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 * @lastModified 2024-12-19
 */

'use client'

// React Imports
import { useState, useContext, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Type Imports
import type { Mode } from '@core/types'
import { type LoginData, loginSchema } from '@/utils/validators'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Component Imports
import AuthLayout from '@components/auth/AuthLayout'

// Context Imports
import { AuthContext } from '../contexts/AuthContext'

// Constants Imports
// import ROUTES from '@/constants' and TEXT_CONTENT from its correct location
import { ROUTES } from '@/constants'

const Login = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/fondo.png'
  const lightImg = '/images/pages/fondo2.jpg'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()
  const auth = useContext(AuthContext)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrUsername: '', password: '' }
  })

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  useEffect(() => {
    if (auth?.error) {
      setError('root.serverError', { type: 'custom', message: auth.error })
    }
  }, [auth?.error, setError])

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (data: LoginData) => {
    if (!auth) return

    auth.clearError()

    try {
      await auth.login(data.emailOrUsername, data.password)
      router.push('/panel')
    } catch (err) {
      console.error('Login - Error en submit:', err)
    }
  }

  return (
    <AuthLayout illustrationSrc={authBackground} pageTitle='Login'>
      <div className='flex flex-col gap-5'>
        <div>
          <Typography variant='h4'>login</Typography>
          <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
        </div>

        {errors.root?.serverError && (
          <Alert severity='error' className='mb-4'>
            {errors.root.serverError.message}
          </Alert>
        )}

        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='emailOrUsername'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                fullWidth
                label='correo o usuario'
                error={!!errors.emailOrUsername}
                helperText={errors.emailOrUsername?.message}
                onChange={e => {
                  field.onChange(e)
                  auth?.clearError()
                }}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='contraseña'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={e => {
                  field.onChange(e)
                  auth?.clearError()
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
            <FormControlLabel control={<Checkbox />} label='recuerdame' />
            <Typography className='text-end' color='primary' component={Link} href={ROUTES.FORGOT_PASSWORD}>
              olvide la contraseña
            </Typography>
          </div>

          <Button fullWidth variant='contained' type='submit' disabled={auth?.isLoading}>
            {auth?.isLoading ? 'Loading...' : 'iniciar'}
          </Button>

          <div className='flex justify-center items-center flex-wrap gap-2'>
            <Typography>no tengo cuenta</Typography>
            <Typography component={Link} href={ROUTES.REGISTER} color='primary'>
              registrarse
            </Typography>
          </div>

          <Divider className='gap-3'>iniciar o</Divider>

          <div className='flex justify-center items-center gap-2'>
            <IconButton size='small' className='text-facebook'>
              <i className='ri-facebook-fill' />
            </IconButton>
            <IconButton size='small' className='text-twitter'>
              <i className='ri-twitter-fill' />
            </IconButton>
            <IconButton size='small' className='text-github'>
              <i className='ri-github-fill' />
            </IconButton>
            <IconButton size='small' className='text-linkedin'>
              <i className='ri-linkedin-fill' />
            </IconButton>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
