import { z } from 'zod'

import { REGEX_PATTERNS } from '@/constants'

// ==> Esquema de validación para el Login <==
export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .trim()
    .min(1, { message: 'Email o nombre de usuario es requerido.' })
    .refine(
      value => {
        const isEmail = value.includes('@')

        if (isEmail) {
          return REGEX_PATTERNS.EMAIL.test(value)
        }

        // Para nombres de usuario, aplicamos las reglas correspondientes
        return /^[a-zA-Z0-9_-]+$/.test(value) && value.length >= 3 && value.length <= 30
      },
      {
        message: 'Formato de email o nombre de usuario inválido.'
      }
    ),
  password: z.string().min(1, { message: 'La contraseña es requerida.' })
})

export type LoginData = z.infer<typeof loginSchema>

// ==> Esquema de validación para el Registro <==
export const registrationSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres.' })
      .max(30, { message: 'El nombre de usuario no puede tener más de 30 caracteres.' })
      .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Solo puede contener letras, números, guiones y guiones bajos.' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'El email es requerido.' })
      .email({ message: 'Formato de email inválido.' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .max(100, { message: 'La contraseña no puede tener más de 100 caracteres.' })
      .regex(REGEX_PATTERNS.PASSWORD_UPPERCASE, { message: 'Debe contener al menos una mayúscula (A-Z).' })
      .regex(REGEX_PATTERNS.PASSWORD_LOWERCASE, { message: 'Debe contener al menos una minúscula (a-z).' })
      .regex(REGEX_PATTERNS.PASSWORD_DIGIT, { message: 'Debe contener al menos un número (0-9).' })
      .regex(REGEX_PATTERNS.PASSWORD_SPECIAL_CHAR, {
        message: 'Debe contener al menos un carácter especial (!@#...).'
      }),
    confirmPassword: z.string().min(1, { message: 'Confirmar contraseña es requerido.' }),
    agreeTerms: z.boolean().refine(value => value === true, { message: 'Debes aceptar los términos y condiciones.' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'] // El error se asigna al campo confirmPassword
  })

export type RegistrationData = z.infer<typeof registrationSchema>

// ==> Esquema de validación para Olvido de Contraseña <==
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'El email es requerido.' })
    .email({ message: 'Formato de email inválido.' })
})

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
