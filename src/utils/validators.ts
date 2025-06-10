import { REGEX_PATTERNS } from '@/constants'
import type { ValidationErrors } from '../types/auth'

/**
 * Valida el formato de un email
 * @param email - El email a validar
 * @returns string | undefined - Mensaje de error si el formato es inválido, undefined si es válido
 */
export const validateEmailFormat = (email: string): string | undefined => {
  if (!email) return 'El email es requerido.'
  if (!REGEX_PATTERNS.EMAIL.test(email)) return 'Formato de email inválido.'
  
return undefined
}

/**
 * Valida el formato de un nombre de usuario
 * @param username - El nombre de usuario a validar
 * @returns string | undefined - Mensaje de error si el formato es inválido, undefined si es válido
 */
export const validateUsernameFormat = (username: string): string | undefined => {
  if (!username) return 'El nombre de usuario es requerido.'
  if (username.length < 3) return 'El nombre de usuario debe tener al menos 3 caracteres.'
  if (username.length > 30) return 'El nombre de usuario no puede tener más de 30 caracteres.'

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos.'
  }

  
return undefined
}

/**
 * Valida la complejidad de una contraseña
 * @param password - La contraseña a validar
 * @returns string | undefined - Mensaje de error si la contraseña no cumple con los requisitos, undefined si es válida
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'La contraseña es requerida.'
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
  if (password.length > 100) return 'La contraseña no puede tener más de 100 caracteres.'

  const errors: string[] = []

  if (!REGEX_PATTERNS.PASSWORD_UPPERCASE.test(password)) errors.push('mayúscula (A-Z)')
  if (!REGEX_PATTERNS.PASSWORD_LOWERCASE.test(password)) errors.push('minúscula (a-z)')
  if (!REGEX_PATTERNS.PASSWORD_DIGIT.test(password)) errors.push('número (0-9)')
  if (!REGEX_PATTERNS.PASSWORD_SPECIAL_CHAR.test(password)) errors.push('carácter especial (!@#...)')

  if (errors.length > 0) {
    return `La contraseña debe contener al menos una ${errors.join(', ')}.`
  }

  return undefined
}

/**
 * Valida que la confirmación de contraseña coincida con la contraseña original
 * @param password - La contraseña original
 * @param confirmPassword - La confirmación de contraseña
 * @returns string | undefined - Mensaje de error si no coinciden, undefined si coinciden
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Confirmar contraseña es requerido.'
  if (password !== confirmPassword) return 'Las contraseñas no coinciden.'
  
return undefined
}

/**
 * Valida el formulario de inicio de sesión
 * @param values - Objeto con email/username y contraseña
 * @returns ValidationErrors - Objeto con errores de validación
 */
export const validateLoginForm = (values: { emailOrUsername: string; password: string }): ValidationErrors => {
  const errors: ValidationErrors = {}
  const { emailOrUsername, password } = values

  // Validar email/username
  if (!emailOrUsername) {
    errors.emailOrUsername = 'Email o nombre de usuario es requerido.'
  } else {
    const trimmedValue = emailOrUsername.trim()

    if (emailOrUsername !== trimmedValue) {
      errors.emailOrUsername = 'No se permiten espacios al inicio o final.'
    } else {
      const isEmail = emailOrUsername.includes('@')

      if (isEmail) {
        const emailError = validateEmailFormat(emailOrUsername)

        if (emailError) errors.emailOrUsername = emailError
      } else {
        const usernameError = validateUsernameFormat(emailOrUsername)

        if (usernameError) errors.emailOrUsername = usernameError
      }
    }
  }

  // Validar contraseña
  const passwordError = validatePassword(password)

  if (passwordError) errors.password = passwordError

  return errors
}

/**
 * Interfaz para los datos del formulario de registro
 */
interface RegistrationFormDataType {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

/**
 * Valida el formulario de registro
 * @param values - Objeto con los datos del formulario de registro
 * @returns ValidationErrors - Objeto con errores de validación
 */
export const validateRegistrationForm = (values: RegistrationFormDataType): ValidationErrors => {
  const errors: ValidationErrors = {}
  const { username, email, password, confirmPassword, agreeTerms } = values

  // Validar username
  const trimmedUsername = username.trim()

  if (!trimmedUsername) {
    errors.username = 'El nombre de usuario es requerido.'
  } else if (username !== trimmedUsername) {
    errors.username = 'No se permiten espacios al inicio o final.'
  } else {
    const usernameError = validateUsernameFormat(trimmedUsername)

    if (usernameError) errors.username = usernameError
  }

  // Validar email
  const trimmedEmail = email.trim()

  if (!trimmedEmail) {
    errors.email = 'El email es requerido.'
  } else if (email !== trimmedEmail) {
    errors.email = 'No se permiten espacios al inicio o final.'
  } else {
    const emailError = validateEmailFormat(trimmedEmail)

    if (emailError) errors.email = emailError
  }

  // Validar contraseña
  const passwordError = validatePassword(password)

  if (passwordError) errors.password = passwordError

  // Validar confirmación de contraseña
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword)

  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError

  // Validar términos y condiciones
  if (!agreeTerms) {
    errors.agreeTerms = 'Debes aceptar los términos y condiciones.'
  }

  return errors
}

/**
 * Valida el formulario de recuperación de contraseña
 * @param values - Objeto con el email
 * @returns ValidationErrors - Objeto con errores de validación
 */
export const validateForgotPasswordForm = (values: { email: string }): ValidationErrors => {
  const errors: ValidationErrors = {}
  const { email } = values

  const trimmedEmail = email.trim()

  if (!trimmedEmail) {
    errors.email = 'El email es requerido.'
  } else if (email !== trimmedEmail) {
    errors.email = 'No se permiten espacios al inicio o final.'
  } else {
    const emailError = validateEmailFormat(trimmedEmail)

    if (emailError) errors.email = emailError
  }

  return errors
}
