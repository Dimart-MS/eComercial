/**
 * SISTEMA DE VALIDACIÓN UNIFICADO - eComercial
 * 
 * Centraliza todas las validaciones del proyecto siguiendo el principio DRY.
 * Permite reutilización, mantenibilidad y consistencia en toda la aplicación.
 * 
 * ARQUITECTURA:
 * - REGEX_PATTERNS: Patrones base reutilizables
 * - Validadores atómicos: Funciones que retornan esquemas Zod
 * - Esquemas compuestos: Combinaciones de validadores atómicos
 * - Tipos TypeScript: Inferidos automáticamente
 * 
 * PATRONES DE VALIDACIÓN:
 * - Contraseñas: 8+ caracteres, mayúscula, minúscula, número, especial
 * - Emails: Formato estándar con validación regex
 * - Teléfonos: 10-15 dígitos, solo números
 * - Nombres: 2-60 caracteres, letras y espacios
 * - Códigos postales: 5-6 dígitos numéricos
 * 
 * USO EN COMPONENTES:
 * ```typescript
 * import { email, password, requiredString } from '@/utils/validators'
 * 
 * const schema = z.object({
 *   email: email('Email'),
 *   password: password('Contraseña'),
 *   name: requiredString('Nombre')
 * })
 * ```
 * 
 * VALIDACIONES CRUZADAS:
 * - Confirmación de contraseñas
 * - Email o username para login
 * - Validaciones dependientes
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 * @lastModified 2024-12-19
 */

import { z } from 'zod'

/**
 * PATRONES DE VALIDACIÓN BASE
 * 
 * Patrones regex optimizados para rendimiento y compatibilidad internacional.
 */
export const REGEX_PATTERNS = {
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_DIGIT: /[0-9]/,
  PASSWORD_SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>_\-\[\]=+;'/`~]/,
  ONLY_NUMBERS: /^[0-9]+$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  ZIP_CODE: /^[0-9]{5,6}$/,
  FILE_TYPE: /^(application\/pdf|image\/jpeg|image\/png|application\/msword|application\/vnd\.ms-excel|otro)$/,
  USERNAME: /^[a-zA-Z0-9_.-]+$/,
  EMAIL: /^[^\s@\d][^\s@]*@[^\s@]+\.[^\s@]+$/
}

/**
 * VALIDADORES ATÓMICOS Y REUTILIZABLES
 * 
 * Funciones que crean esquemas Zod básicos combinables para validaciones complejas.
 */

// Validador para campos de texto requeridos
export const requiredString = (fieldName = 'Este campo') =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} es requerido.` })

// Validador para campos de texto opcionales
export const optionalString = (maxLength?: number, fieldName = 'Este campo') => {
  let schema = z.string().trim()

  if (maxLength) {
    schema = schema.max(maxLength, { message: `${fieldName} debe tener máximo ${maxLength} caracteres.` })
  }

  return schema.optional()
}

// Validador para emails con formato estándar
export const email = (fieldName = 'Email') =>
  requiredString(fieldName)
    .email({ message: 'Formato de email inválido.' })
    .refine(val => REGEX_PATTERNS.EMAIL.test(val), { message: 'Formato de email inválido.' })

// Validador para teléfonos internacionales (10-15 dígitos)
export const phone = (fieldName = 'Teléfono') =>
  requiredString(fieldName)
    .regex(REGEX_PATTERNS.ONLY_NUMBERS, { message: 'Solo números.' })
    .min(10, { message: 'Mínimo 10 dígitos.' })
    .max(15, { message: 'Máximo 15 dígitos.' })

// Validador para nombres con caracteres acentuados
export const name = (fieldName = 'Nombre') =>
  requiredString(fieldName)
    .min(2, { message: 'Mínimo 2 caracteres.' })
    .max(60, { message: 'Máximo 60 caracteres.' })
    .regex(REGEX_PATTERNS.ONLY_LETTERS, { message: 'Solo letras y espacios.' })

// Validador para usernames alfanuméricos
export const username = (fieldName = 'Usuario') =>
  requiredString(fieldName)
    .min(3, { message: 'Mínimo 3 caracteres.' })
    .max(30, { message: 'Máximo 30 caracteres.' })
    .regex(REGEX_PATTERNS.USERNAME, { message: 'Solo letras, números, puntos, guiones o guiones bajos.' })

// Validador para contraseñas seguras con políticas estándar
export const password = (fieldName = 'Contraseña') =>
  requiredString(fieldName)
    .min(8, { message: 'Debe tener al menos 8 caracteres.' })
    .regex(REGEX_PATTERNS.PASSWORD_UPPERCASE, { message: 'Debe contener al menos una mayúscula (A-Z).' })
    .regex(REGEX_PATTERNS.PASSWORD_LOWERCASE, { message: 'Debe contener al menos una minúscula (a-z).' })
    .regex(REGEX_PATTERNS.PASSWORD_DIGIT, { message: 'Debe contener al menos un número (0-9).' })
    .regex(REGEX_PATTERNS.PASSWORD_SPECIAL_CHAR, { message: 'Debe contener al menos un carácter especial (!@#...).' })

// Validador para códigos postales (5-6 dígitos)
export const zipCode = (fieldName = 'Código Postal') =>
  requiredString(fieldName).regex(REGEX_PATTERNS.ZIP_CODE, { message: 'Código postal inválido.' })

// Validador para fechas válidas
export const date = (fieldName = 'Fecha') =>
  requiredString(fieldName).refine(val => !isNaN(Date.parse(val)), { message: 'Fecha inválida.' })

// Validador para campos booleanos
export const booleanField = (fieldName = 'Valor') => z.boolean({ required_error: `${fieldName} es requerido.` })

/**
 * ESQUEMAS COMPUESTOS
 * 
 * Esquemas que combinan validadores atómicos para estructuras complejas.
 */

// Esquema para direcciones completas
export const addressSchema = z.object({
  street: requiredString('Calle'),
  extNum: requiredString('No. Ext.').regex(REGEX_PATTERNS.ONLY_NUMBERS, { message: 'Solo números.' }),
  intNum: optionalString(),
  zipCode: zipCode(),
  neighborhood: requiredString('Colonia'),
  municipality: requiredString('Municipio'),
  city: requiredString('Ciudad'),
  state: requiredString('Estado'),
  country: requiredString('País')
})

// Esquema para documentos digitales
export const documentSchema = z.object({
  fileName: requiredString('Nombre del archivo').max(60, { message: 'Máximo 60 caracteres.' }),
  fileType: requiredString('Tipo de archivo').regex(REGEX_PATTERNS.FILE_TYPE, {
    message: 'Tipo de archivo no permitido.'
  }),
  url: requiredString('Archivo'),
  observation: optionalString(200, 'Observaciones'),
  uploadedAt: date('Fecha de carga')
})

/**
 * VALIDADORES ESPECIALIZADOS
 * 
 * Validadores que combinan múltiples tipos para casos específicos.
 */

// Validador para login que acepta email o username
export const emailOrUsername = (fieldName = 'Email o usuario') =>
  z
    .union([email(fieldName), username(fieldName)])
    .refine(val => typeof val === 'string', { message: `${fieldName} inválido.` })

/**
 * ESQUEMAS DE FORMULARIOS COMPLETOS
 * 
 * Esquemas que representan formularios completos de la aplicación.
 */

// Esquema para registro de usuarios
export const registrationSchema = z
  .object({
    username: username(),
    email: email(),
    password: password(),
    confirmPassword: requiredString('Confirmar contraseña'),
    agreeTerms: z.boolean().refine(value => value === true, { message: 'Debes aceptar los términos y condiciones.' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword']
  })

// Esquema para login de usuarios
export const loginSchema = z.object({
  emailOrUsername: emailOrUsername(),
  password: password()
})

/**
 * TIPOS TYPESCRIPT INFERIDOS
 * 
 * Tipos generados automáticamente de los esquemas Zod.
 */

export type LoginData = z.infer<typeof loginSchema>

export type RegistrationData = z.infer<typeof registrationSchema>
