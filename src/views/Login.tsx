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
import { type LoginData, loginSchema } from '@/utils/schemas'

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
          <Typography variant='h4'>{TEXT_CONTENT.LOGIN.TITLE}</Typography>
          <Typography className='mbs-1'>{TEXT_CONTENT.LOGIN.SUBTITLE}</Typography>
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
                label={TEXT_CONTENT.LOGIN.EMAIL_LABEL}
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
                label={TEXT_CONTENT.LOGIN.PASSWORD_LABEL}
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
            <FormControlLabel control={<Checkbox />} label={TEXT_CONTENT.LOGIN.REMEMBER_ME} />
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
