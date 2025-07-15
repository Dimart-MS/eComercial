/**
 * CONSTANTES GLOBALES - eComercial
 * 
 * Centraliza todas las constantes utilizadas en la aplicación.
 * Facilita mantenimiento y evita valores hardcodeados.
 * 
 * CARACTERÍSTICAS:
 * - Valores centralizados para fácil modificación
 * - Agrupación lógica por funcionalidad
 * - Compatibilidad con TypeScript
 * - Preparado para internacionalización
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

/**
 * RUTAS DE LA APLICACIÓN
 * 
 * Definiciones de rutas para navegación interna.
 */
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  PANEL: '/panel',
  CONTACTOS: '/panel/contactos',
  ACCOUNT_SETTINGS: '/panel/account-settings',
  CARD_BASIC: '/panel/card-basic',
  FORM_LAYOUTS: '/panel/form-layouts'
} as const

/**
 * CLAVES DE LOCAL STORAGE
 * 
 * Identificadores para datos persistentes en el navegador.
 */
export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'ecomercial_token',
  USER: 'ecomercial_user',
  LOGOUT_EVENT: 'ecomercial_logout_event',
  THEME_MODE: 'ecomercial_theme_mode',
  LANGUAGE: 'ecomercial_language'
} as const

/**
 * RUTAS DE IMÁGENES
 * 
 * Referencias a imágenes estáticas del proyecto.
 */
export const IMAGES = {
  AVATAR: '/images/avatars/1.png',
  LOGO: '/images/logos/ecomercial-logo.png',
  LOGO_DARK: '/images/logos/ecomercial-logo-dark.png',
  FONDO: '/images/pages/fondo.png',
  FONDO2: '/images/pages/fondo2.jpg'
} as const

/**
 * CONFIGURACIÓN DE VALIDACIÓN
 * 
 * Límites y reglas para validación de formularios.
 */
export const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 60,
  USERNAME_MIN: 3,
  USERNAME_MAX: 30,
  PASSWORD_MIN: 8,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
  ZIP_CODE_LENGTH: 5
} as const

/**
 * MENSAJES DE ERROR
 * 
 * Mensajes estandarizados para errores de validación.
 */
export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido.',
  INVALID_EMAIL: 'Formato de email inválido.',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden.',
  INVALID_PHONE: 'Formato de teléfono inválido.',
  INVALID_ZIP_CODE: 'Código postal inválido.',
  TERMS_REQUIRED: 'Debes aceptar los términos y condiciones.'
} as const

/**
 * CONFIGURACIÓN DE PAGINACIÓN
 * 
 * Valores por defecto para paginación de tablas.
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
  MAX_PAGE_SIZE: 100
} as const

/**
 * CONFIGURACIÓN DE TEMAS
 * 
 * Opciones de tema y colores de la aplicación.
 */
export const THEME_CONFIG = {
  PRIMARY_COLOR: '#9155FD',
  SECONDARY_COLOR: '#8A8D93',
  SUCCESS_COLOR: '#56CA00',
  ERROR_COLOR: '#FF4C51',
  WARNING_COLOR: '#FFB400',
  INFO_COLOR: '#16B1FF'
} as const

/**
 * CONFIGURACIÓN DE API
 * 
 * Configuración para comunicación con backend.
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
} as const

/**
 * CONFIGURACIÓN DE NOTIFICACIONES
 * 
 * Configuración para sistema de notificaciones.
 */
export const NOTIFICATION_CONFIG = {
  AUTO_HIDE_DURATION: 6000,
  MAX_SNACKBARS: 3,
  POSITION: {
    vertical: 'bottom',
    horizontal: 'right'
  }
} as const
