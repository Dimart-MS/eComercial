import { z } from 'zod'

// Patrones de validación genéricos y completos
export const REGEX_PATTERNS = {
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_DIGIT: /[0-9]/,
  PASSWORD_SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>_\-\[\]=+;'/`~]/,
  ONLY_NUMBERS: /^[0-9]+$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  ZIP_CODE: /^[0-9]{5,6}$/,
  RFC: /^([A-ZÑ&]{3,4})\d{6}(?:[A-Z\d]{3})?$/,
  CURP: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/,
  FILE_TYPE: /^(application\/pdf|image\/jpeg|image\/png|application\/msword|application\/vnd\.ms-excel|otro)$/,
}

// Validadores atómicos y reutilizables
export const requiredString = (fieldName = 'Este campo') =>
  z.string().trim().min(1, { message: `${fieldName} es requerido.` })

export const optionalString = (maxLength?: number, fieldName = 'Este campo') => {
  let schema = z.string().trim()

  if (maxLength) {
    schema = schema.max(maxLength, { message: `${fieldName} debe tener máximo ${maxLength} caracteres.` })
  }

  return schema.optional()
}

export const email = (fieldName = 'Email') =>
  requiredString(fieldName).email({ message: 'Formato de email inválido.' })

export const phone = (fieldName = 'Teléfono') =>
  requiredString(fieldName)
    .regex(REGEX_PATTERNS.ONLY_NUMBERS, { message: 'Solo números.' })
    .min(10, { message: 'Mínimo 10 dígitos.' })
    .max(15, { message: 'Máximo 15 dígitos.' })

export const name = (fieldName = 'Nombre') =>
  requiredString(fieldName)
    .min(2, { message: 'Mínimo 2 caracteres.' })
    .max(60, { message: 'Máximo 60 caracteres.' })
    .regex(REGEX_PATTERNS.ONLY_LETTERS, { message: 'Solo letras y espacios.' })

export const username = (fieldName = 'Usuario') =>
  requiredString(fieldName)
    .min(3, { message: 'Mínimo 3 caracteres.' })
    .max(30, { message: 'Máximo 30 caracteres.' })
    .regex(/^[a-zA-Z0-9_.-]+$/, { message: 'Caracteres inválidos.' })

export const password = (fieldName = 'Contraseña') =>
  requiredString(fieldName)
    .min(8, { message: 'Debe tener al menos 8 caracteres.' })
    .regex(REGEX_PATTERNS.PASSWORD_UPPERCASE, { message: 'Debe contener al menos una mayúscula (A-Z).' })
    .regex(REGEX_PATTERNS.PASSWORD_LOWERCASE, { message: 'Debe contener al menos una minúscula (a-z).' })
    .regex(REGEX_PATTERNS.PASSWORD_DIGIT, { message: 'Debe contener al menos un número (0-9).' })
    .regex(REGEX_PATTERNS.PASSWORD_SPECIAL_CHAR, { message: 'Debe contener al menos un carácter especial (!@#...).' })

export const zipCode = (fieldName = 'Código Postal') =>
  requiredString(fieldName).regex(REGEX_PATTERNS.ZIP_CODE, { message: 'Código postal inválido.' })

export const rfc = (fieldName = 'RFC') =>
  requiredString(fieldName).regex(REGEX_PATTERNS.RFC, { message: 'RFC inválido.' })

export const curp = (fieldName = 'CURP') =>
  requiredString(fieldName).regex(REGEX_PATTERNS.CURP, { message: 'CURP inválido.' })

export const date = (fieldName = 'Fecha') =>
  requiredString(fieldName).refine(val => !isNaN(Date.parse(val)), { message: 'Fecha inválida.' })

export const booleanField = (fieldName = 'Valor') =>
  z.boolean({ required_error: `${fieldName} es requerido.` })

// Ejemplo de uso en esquemas para cualquier módulo
export const addressSchema = z.object({
  street: requiredString('Calle'),
  extNum: requiredString('No. Ext.').regex(REGEX_PATTERNS.ONLY_NUMBERS, { message: 'Solo números.' }),
  intNum: optionalString(),
  zipCode: zipCode(),
  neighborhood: requiredString('Colonia'),
  municipality: requiredString('Municipio'),
  city: requiredString('Ciudad'),
  state: requiredString('Estado'),
  country: requiredString('País'),
})

// Esquema para documentos digitales (solo valida campos de archivo, no RFC/CURP)
export const documentSchema = z.object({
  fileName: requiredString('Nombre del archivo').max(60, { message: 'Máximo 60 caracteres.' }),
  fileType: requiredString('Tipo de archivo').regex(REGEX_PATTERNS.FILE_TYPE, { message: 'Tipo de archivo no permitido.' }),
  url: requiredString('Archivo'),
  observation: optionalString(200, 'Observaciones'),
  uploadedAt: date('Fecha de carga')
})

export const registrationSchema = z.object({
  username: username(),
  email: email(),
  password: password(),
  confirmPassword: requiredString('Confirmar contraseña'),
  agreeTerms: z.boolean().refine(value => value === true, { message: 'Debes aceptar los términos y condiciones.' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
})

export type RegistrationData = z.infer<typeof registrationSchema>