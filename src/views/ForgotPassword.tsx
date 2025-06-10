'use client'

// React Imports
import { useContext, useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

// Type Imports
import type { Mode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Component Imports
import Form from '@components/Form'
import DirectionalIcon from '@components/DirectionalIcon'
import Illustrations from '@components/Illustrations'
import AuthLayout from '@/components/auth/AuthLayout'

// Constant Imports
import { TEXT_CONTENT, ROUTES } from '@/constants'

// Context Imports
import { AuthContext } from '../contexts/AuthContext'

const ForgotPassword = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/fondo.png'
  const lightImg = '/images/pages/fondo2.jpg'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const auth = useContext(AuthContext)

  // States
  const [email, setEmail] = useState('')
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    if (errors.form) {
      setErrors(prev => ({ ...prev, form: undefined }))
      auth?.clearError()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    auth?.clearError()
    if (!auth) return

    try {
      await auth.forgotPassword(email)
    } catch (err) {
      // El error ya se maneja en el contexto
    }
  }

  return (
    <AuthLayout illustrationSrc={authBackground} pageTitle='ForgotPassword'>
      <div className='flex flex-col gap-5'>
        <div>
          <Typography variant='h4'>{TEXT_CONTENT.FORGOT_PASSWORD.TITLE}</Typography>
          <Typography className='mbs-1'>{TEXT_CONTENT.FORGOT_PASSWORD.SUBTITLE}</Typography>
        </div>

        {errors.form && (
          <Alert severity='error' className='mb-4'>
            {errors.form}
          </Alert>
        )}

        <Form noValidate autoComplete='off' className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            label={TEXT_CONTENT.FORGOT_PASSWORD.EMAIL_LABEL}
            name='email'
            value={email}
            onChange={handleChange}
            error={!!errors.form}
            helperText={errors.form}
            disabled={auth?.isLoading}
          />
          <Button fullWidth variant='contained' type='submit' disabled={auth?.isLoading}>
            {auth?.isLoading ? 'Enviando...' : TEXT_CONTENT.FORGOT_PASSWORD.SEND_BUTTON}
          </Button>
          <Typography className='flex justify-center items-center' color='primary'>
            <Link href={ROUTES.LOGIN} className='flex items-center'>
              <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
              <span>{TEXT_CONTENT.FORGOT_PASSWORD.BACK_TO_LOGIN}</span>
            </Link>
          </Typography>
        </Form>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
