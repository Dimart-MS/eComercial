'use client'

// React
import { useState } from 'react'

// Next
import Link from 'next/link'

// MUI
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
import { type RegistrationData, registrationSchema } from '@/utils/validators'

// Componentes
import AuthLayout from '@components/auth/AuthLayout'

// Hooks
import { useImageVariant } from '@core/hooks/useImageVariant'

// Constantes y utils
import { TEXT_CONTENT, SOCIAL_LINKS, ROUTES } from '@/constants'

const darkImg = '/images/pages/fondo.png'
const lightImg = '/images/pages/fondo2.jpg'

const Register = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationData>({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = (data: RegistrationData) => {
    console.log(data) // Aquí iría la lógica de registro (API, etc.)
    reset()
  }

  return (
    <AuthLayout illustrationSrc={authBackground} pageTitle={TEXT_CONTENT.REGISTER.TITLE}>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-2'>
          <Typography variant='h4'>{TEXT_CONTENT.REGISTER.TITLE}</Typography>
          <Typography className='mbs-1'>{TEXT_CONTENT.REGISTER.SUBTITLE}</Typography>
        </div>

        {errors.root && (
          <Alert severity='error' className='mb-4'>
            {errors.root.message}
          </Alert>
        )}

        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={TEXT_CONTENT.REGISTER.USERNAME_LABEL}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={TEXT_CONTENT.REGISTER.EMAIL_LABEL}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                label={TEXT_CONTENT.REGISTER.PASSWORD_LABEL}
                type={isPasswordShown ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
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
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Confirmar contraseña'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Controller
            name='agreeTerms'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} color='primary' />}
                label={TEXT_CONTENT.REGISTER.TERMS}
              />
            )}
          />
          {errors.agreeTerms && (
            <Typography color='error' variant='body2' className='ml-4'>
              {errors.agreeTerms.message}
            </Typography>
          )}
          <Button fullWidth variant='contained' type='submit'>
            {TEXT_CONTENT.REGISTER.REGISTER_BUTTON}
          </Button>
          <div className='flex justify-center items-center flex-wrap gap-2'>
            <Typography>{TEXT_CONTENT.REGISTER.HAVE_ACCOUNT}</Typography>
            <Typography component={Link} href={ROUTES.LOGIN} color='primary'>
              {TEXT_CONTENT.REGISTER.LOGIN_LINK}
            </Typography>
          </div>
          <Divider className='gap-3'>{TEXT_CONTENT.REGISTER.OR}</Divider>
          <div className='flex justify-center items-center gap-2'>
            {SOCIAL_LINKS.map(link => (
              <IconButton
                key={link.name}
                size='small'
                component='a'
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.name}
                style={{ color: link.color }}
              >
                {link.icon}
              </IconButton>
            ))}
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register
