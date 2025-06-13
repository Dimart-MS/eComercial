'use client'

// React Imports
import { useState, useContext, useEffect } from 'react'
import type { FormEvent } from 'react'

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

// Type Imports
import type { Mode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Component Imports
import AuthLayout from '@components/auth/AuthLayout'

// Context Imports
import { AuthContext } from '../contexts/AuthContext'

// Constants Imports
import { TEXT_CONTENT, ROUTES } from '@/constants'

const Login = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/fondo.png'
  const lightImg = '/images/pages/fondo2.jpg'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()
  const auth = useContext(AuthContext)

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false })
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({})

  useEffect(() => {
    setErrors(prevErrors => {
      if (prevErrors.form !== auth?.error) {
        const newErrors = { ...prevErrors }

        if (auth?.error) {
          newErrors.form = auth.error
        } else {
          delete newErrors.form
        }

        return newErrors
      }

      return prevErrors
    })
  }, [auth?.error])

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }

    if (errors.form) {
      setErrors(prev => ({ ...prev, form: undefined }))
      auth?.clearError()
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    auth?.clearError()

    const validationErrors: { [key: string]: string } = {}

    if (!formData.email) validationErrors.email = 'El email es requerido'
    if (!formData.password) validationErrors.password = 'La contraseña es requerida'

    if (formData.password && formData.password.length < 8) {
      validationErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    if (!auth) return

    try {
      await auth.login(formData.email, formData.password)
      router.push('/panel')
    } catch (err) {
      console.error('Login - Error en submit:', err)
    }
  }

  return (
    <AuthLayout illustrationSrc={authBackground} pageTitle='Login'>
      <div className='flex flex-col gap-5'>
        <div>
          <Typography variant='h4'>{TEXT_CONTENT.LOGIN.TITLE}</Typography>
          <Typography className='mbs-1'>{TEXT_CONTENT.LOGIN.SUBTITLE}</Typography>
        </div>

        {errors.form && (
          <Alert severity='error' className='mb-4'>
            {errors.form}
          </Alert>
        )}

        <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            autoFocus
            fullWidth
            label={TEXT_CONTENT.LOGIN.EMAIL_LABEL}
            name='email'
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label={TEXT_CONTENT.LOGIN.PASSWORD_LABEL}
            name='password'
            id='outlined-adornment-password'
            type={isPasswordShown ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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

          <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
            <FormControlLabel
              control={<Checkbox name='rememberMe' checked={formData.rememberMe} onChange={handleChange} />}
              label={TEXT_CONTENT.LOGIN.REMEMBER_ME}
            />
            <Typography className='text-end' color='primary' component={Link} href={ROUTES.FORGOT_PASSWORD}>
              {TEXT_CONTENT.LOGIN.FORGOT_PASSWORD}
            </Typography>
          </div>

          <Button fullWidth variant='contained' type='submit' disabled={auth?.isLoading}>
            {auth?.isLoading ? 'Loading...' : TEXT_CONTENT.LOGIN.LOGIN_BUTTON}
          </Button>

          <div className='flex justify-center items-center flex-wrap gap-2'>
            <Typography>{TEXT_CONTENT.LOGIN.NO_ACCOUNT}</Typography>
            <Typography component={Link} href={ROUTES.REGISTER} color='primary'>
              {TEXT_CONTENT.LOGIN.REGISTER_LINK}
            </Typography>
          </div>

          <Divider className='gap-3'>{TEXT_CONTENT.LOGIN.OR}</Divider>

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
