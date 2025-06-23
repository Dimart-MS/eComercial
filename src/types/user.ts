// src/types/user.ts

// Estado del usuario
export enum UserStatus {
  Active = 'activo',
  Inactive = 'inactivo'
}

// Rol del usuario, útil para etiquetas y lógica de negocio
export enum UserRole {
  Prospecto = 'Prospecto',
  Cliente = 'Cliente',
  Proveedor = 'Proveedor',
  Acreedor = 'Acreedor',
  Colaborador = 'Colaborador'
}

// Interfaces para datos de contacto
export interface PhoneContact {
  region: string
  number: string
  type: 'personal' | 'trabajo' | 'casa' | 'otro'
}

export interface EmailContact {
  address: string
  type: 'personal' | 'trabajo' | 'otro'
  alias?: string
}

export interface UserContacts {
  phones: PhoneContact[]
  emails: EmailContact[]
}

// Interfaces para información detallada
export interface UserPersonalInfo {
  gender?: 'hombre' | 'mujer' | 'otro'
  birthDate?: string // Formato YYYY-MM-DD
  profession?: string
  education?: 'primaria' | 'secundaria' | 'bachillerato' | 'licenciatura' | 'posgrado' | 'otro'
  maritalStatus?: 'soltero(a)' | 'casado(a)' | 'divorciado(a)' | 'viudo(a)' | 'otro'
}

export interface UserSettings {
  category?: string
  marketingCampaign?: boolean
}

export interface UserAddress {
  street?: string
  extNum?: string
  intNum?: string
  zipCode?: string
  neighborhood?: string
  municipality?: string
  city?: string
  state?: string
  country?: string
  noExt?: string
  noInt?: string
  zip?: string
  colony?: string
}

export interface UserProfileDetails {
  influencesDecisions?: boolean
  mainActivities?: string
  opportunityAreas?: string
  recommendations?: string
  notes?: string
}

export interface SocialNetwork {
  type: string // Ej: Facebook, LinkedIn, etc.
  username: string // Usuario o enlace
}

export interface RelatedCompany {
  companyName: string
  position: string
}

export interface UserDocument {
  fileName: string
  fileType: string // Ej: pdf, jpg, etc.
  url: string // URL o base64 temporal
  uploadedAt: string // Formato ISO
  observation?: string
}

// Tipo principal que une todo, usado en la tabla y en la vista de detalle
export interface UserType {
  id: string
  name: string
  lastName?: string
  avatarUrl: string // Se asume que siempre habrá una URL, aunque sea un placeholder
  role: UserRole
  status: UserStatus
  contacts: UserContacts
  personalInfo: UserPersonalInfo
  settings: UserSettings
  addresses: UserAddress[]
  profile: UserProfileDetails
  documents: UserDocument[]
  relatedCompanies?: RelatedCompany[]
  socialNetworks?: SocialNetwork[]
  companies?: RelatedCompany[]

  // Campos simplificados que la tabla usaba, se pueden derivar o mantener por compatibilidad
  email: string // Email principal
  companyName?: string // Nombre de la empresa principal
}

// Tipos para la UI de la vista de detalle
export type ActiveViewType =
  | 'Chat'
  | 'Agenda'
  | 'Correo'
  | 'ActividadGeneral' // Para info
  | 'ChatDirect'
  | 'AgendaDirect'
  | 'CorreoDirect'
  | 'ActividadDirect' // Para infoDirect
export type SectionKeyType =
  | 'generalInfo'
  | 'comunicacion'
  | 'datosPersonales'
  | 'configuracion'
  | 'ubicacion'
  | 'perfil'
  | 'documentos'
  | 'empresaRelacionada'

// Mapeo para mostrar nombres en la UI de edición
export const sectionDisplayNames: Record<SectionKeyType, string> = {
  generalInfo: 'Información General',
  comunicacion: 'Comunicación',
  datosPersonales: 'Datos Personales Adicionales',
  configuracion: 'Configuración del Contacto',
  empresaRelacionada: 'Empresas Relacionadas',
  ubicacion: 'Ubicación - Domicilio',
  perfil: 'Perfil del Contacto',
  documentos: 'Documentos Digitales'
}
