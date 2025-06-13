'use client'

import React from 'react'

import { FaInstagram, FaFacebook, FaSquareTwitter, FaLinkedin } from 'react-icons/fa6'

import type { SocialLink } from '../types/auth'

export const ROUTES = {
  LOGIN: '/',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  PANEL: '/panel'
}

export const IMAGES = {
  LOGO: '/images/logos/ecomercial-logo.png',
  ILLUSTRATIONS: {
    LOGIN: 'https://picsum.photos/seed/loginpage/600/700',
    REGISTER: 'https://picsum.photos/seed/registerpage/600/700',
    FORGOT_PASSWORD: 'https://picsum.photos/seed/forgotpage/600/700'
  },
  AVATAR: 'https://picsum.photos/seed/avatar/40/40'
}

export const TEXT_CONTENT = {
  LOGIN: {
    TITLE: '¡Bienvenido a eComercial! 👋',
    SUBTITLE: 'Por favor, inicia sesión en tu cuenta',
    EMAIL_LABEL: 'Email',
    PASSWORD_LABEL: 'Contraseña',
    REMEMBER_ME: 'Recordarme',
    FORGOT_PASSWORD: '¿Olvidaste tu contraseña?',
    LOGIN_BUTTON: 'Iniciar Sesión',
    NO_ACCOUNT: '¿No tienes una cuenta?',
    REGISTER_LINK: 'Crear una cuenta',
    OR: 'o'
  },
  REGISTER: {
    TITLE: '¡La aventura comienza aquí! 🚀',
    SUBTITLE: '¡Haz que la gestión de tu aplicación sea fácil y divertida!',
    USERNAME_LABEL: 'Nombre de usuario',
    EMAIL_LABEL: 'Email',
    PASSWORD_LABEL: 'Contraseña',
    TERMS: 'Acepto los términos y condiciones',
    REGISTER_BUTTON: 'Registrarse',
    HAVE_ACCOUNT: '¿Ya tienes una cuenta?',
    LOGIN_LINK: 'Iniciar sesión',
    OR: 'o'
  },
  FORGOT_PASSWORD: {
    TITLE: '¿Olvidaste tu contraseña? 🔒',
    SUBTITLE: 'Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña',
    EMAIL_LABEL: 'Email',
    SEND_BUTTON: 'Enviar enlace',
    BACK_TO_LOGIN: 'Volver al inicio de sesión'
  },
  SOCIAL_LINKS: [
    { icon: 'ri-facebook-fill', href: 'https://facebook.com', label: 'Facebook', className: 'text-facebook' },
    { icon: 'ri-twitter-fill', href: 'https://twitter.com', label: 'Twitter', className: 'text-twitter' },
    { icon: 'ri-github-fill', href: 'https://github.com', label: 'Github', className: 'text-github' },
    { icon: 'ri-linkedin-fill', href: 'https://linkedin.com', label: 'Linkedin', className: 'text-linkedin' }
  ]
}

// Iconos de React
export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => <i className={`ri-eye-line ${className}`} />

export const EyeSlashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`ri-eye-off-line ${className}`} />
)

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`ri-arrow-down-s-line ${className}`} />
)

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`ri-logout-box-line ${className}`} />
)

export const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`ri-user-3-line ${className}`} />
)

export const BillingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`ri-bill-line ${className}`} />
)

// Enlaces sociales
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    icon: <FaInstagram className='w-5 h-5' />,
    color: '#E1306C',
    href: 'https://instagram.com'
  },
  {
    name: 'Facebook',
    icon: <FaFacebook className='w-5 h-5' />,
    color: '#1877F2',
    href: 'https://facebook.com'
  },
  {
    name: 'Twitter',
    icon: <FaSquareTwitter className='w-5 h-5' />,
    color: '#1DA1F2',
    href: 'https://twitter.com'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className='w-5 h-5' />,
    color: '#0A66C2',
    href: 'https://linkedin.com'
  }
]

// Patrones de validación
export const REGEX_PATTERNS = {
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_DIGIT: /[0-9]/,
  PASSWORD_SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
}

// Claves de localStorage
export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'ecomercial_token',
  USER: 'ecomercial_user',
  THEME: 'ecomercial_theme',
  LANGUAGE: 'ecomercial_language',
  LOGOUT_EVENT: 'ecomercial_logout_event'
}
