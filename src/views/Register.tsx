'use client'

// React
import { useState } from 'react'
import type { FormEvent } from 'react'

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

// Type Imports
import type { Mode } from '@core/types'

// Componentes
import AuthLayout from '@components/auth/AuthLayout'

// Hooks
import { useImageVariant } from '@core/hooks/useImageVariant'

// Constantes y utils
import { TEXT_CONTENT, SOCIAL_LINKS, ROUTES } from '@/constants'
import { validateRegistrationForm } from '@/utils/validators'

const darkImg = '/images/pages/fondo.png'
const lightImg = '/images/pages/fondo2.jpg'

const Register = ({ mode }: { mode: Mode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({})

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateRegistrationForm(formData)

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    // Aquí iría la lógica de registro (API, etc.)
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    })
  }

  return (
    <AuthLayout illustrationSrc={authBackground} pageTitle={TEXT_CONTENT.REGISTER.TITLE}>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-2'>
          <Typography variant='h4'>{TEXT_CONTENT.REGISTER.TITLE}</Typography>
          <Typography className='mbs-1'>{TEXT_CONTENT.REGISTER.SUBTITLE}</Typography>
        </div>

        {errors.form && (
          <Alert severity='error' className='mb-4'>
            {errors.form}
          </Alert>
        )}

        <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            fullWidth
            label={TEXT_CONTENT.REGISTER.USERNAME_LABEL}
            name='username'
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            label={TEXT_CONTENT.REGISTER.EMAIL_LABEL}
            name='email'
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label={TEXT_CONTENT.REGISTER.PASSWORD_LABEL}
            name='password'
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
          <TextField
            fullWidth
            label='Confirmar contraseña'
            name='confirmPassword'
            type={isConfirmPasswordShown ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
          <FormControlLabel
            control={
              <Checkbox name='agreeTerms' checked={formData.agreeTerms} onChange={handleChange} color='primary' />
            }
            label={TEXT_CONTENT.REGISTER.TERMS}
          />
          {errors.agreeTerms && (
            <Typography color='error' variant='body2'>
              {errors.agreeTerms}
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
