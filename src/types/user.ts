/**
 * TIPOS DE USUARIO - eComercial
 * 
 * Definiciones TypeScript para la estructura de datos de usuarios y contactos.
 * Proporciona tipado estricto para toda la aplicación.
 * 
 * CARACTERÍSTICAS:
 * - Tipos estrictos para validación en tiempo de compilación
 * - Interfaces extensibles para futuras funcionalidades
 * - Compatibilidad con API REST
 * - Documentación JSDoc completa
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

/**
 * Información básica de contacto telefónico.
 */
export interface PhoneContact {
  region: string // Código de país (+52, +1, etc.)
  number: string // Número telefónico
  type: 'personal' | 'trabajo' | 'casa' | 'otro' // Tipo de contacto
}

/**
 * Información de contacto por email.
 */
export interface EmailContact {
  address: string // Dirección de email
  type: 'personal' | 'trabajo' | 'otro' // Tipo de email
  alias?: string // Alias opcional para el email
}

/**
 * Información de redes sociales.
 */
export interface SocialNetwork {
  type: string // Tipo de red social (LinkedIn, Twitter, etc.)
  username: string // Usuario o enlace de la red social
}

/**
 * Información de empresa relacionada.
 */
export interface Company {
  name: string // Nombre de la empresa
  position?: string // Cargo en la empresa
}

/**
 * Información de ubicación geográfica.
 */
export interface Location {
  street: string
  extNum: string
  intNum?: string
  zipCode: string
  neighborhood: string
  municipality: string
  city: string
  state: string
  country: string
}

/**
 * Información de documentos digitales.
 */
export interface Document {
  fileName: string
  fileType: string
  url: string
  observation?: string
  uploadedAt: string
}

/**
 * Información de perfil profesional.
 */
export interface Profile {
  decisionInfluence?: string // Influencia en decisiones
  activities?: string // Actividades principales
  opportunityAreas?: string // Áreas de oportunidad
  recommendations?: string // Recomendaciones
  notes?: string // Notas adicionales
}

/**
 * Información completa de contactos de un usuario.
 */
export interface UserContacts {
  alias?: string // Alias o nombre de usuario
  phones: PhoneContact[] // Lista de teléfonos
  emails: EmailContact[] // Lista de emails
  socialNetworks?: SocialNetwork[] // Redes sociales opcionales
}

/**
 * Información completa de un usuario en el sistema.
 */
export interface User {
  id: string // Identificador único
  avatarSrc?: string // URL del avatar
  name: string // Nombre del usuario
  lastName?: string // Apellidos
  username?: string // Nombre de usuario
  email: string // Email principal
  contacts: UserContacts // Información de contactos
  companies?: Company[] // Empresas relacionadas
  category?: string // Categoría del contacto
  status: 'activo' | 'inactivo' // Estado del usuario
  location?: Location // Ubicación opcional
  documents?: Document[] // Documentos opcionales
  profile?: Profile // Perfil profesional opcional
  disabled?: boolean // Estado de deshabilitación (legacy)
}

/**
 * Tipo para formularios de usuario con campos opcionales.
 */
export type UserFormData = Partial<User>

/**
 * Tipo para respuestas de API de usuarios.
 */
export interface UserApiResponse {
  success: boolean
  data?: User | User[]
  message?: string
  error?: string
}

/**
 * Tipo para filtros de búsqueda de usuarios.
 */
export interface UserFilters {
  search?: string
  category?: string
  status?: 'activo' | 'inactivo'
  company?: string
}

/**
 * Tipo para paginación de resultados.
 */
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Tipo para respuesta paginada de usuarios.
 */
export interface PaginatedUserResponse {
  users: User[]
  pagination: PaginationInfo
}
