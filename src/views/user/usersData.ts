// =======================
// Tipos y datos de ejemplo
// =======================

/**
 * Tipo para cada usuario de la tabla.
 */
export type TableBodyRowType = {
  id: string
  avatarSrc?: string
  name: string
  username: string
  email: string
  type: string
  status: string
}

/**
 * Opciones de tipo de usuario.
 */
export const TYPE_OPTIONS = ['Empresa', 'Acredor', 'Proveedor', 'Cliente', 'Prospecto']

/**
 * Opciones de estado de usuario.
 */
export const STATUS_OPTIONS = ['activo', 'inactivo']

/**
 * Datos de ejemplo para la tabla de usuarios.
 */
export const rowsData: TableBodyRowType[] = [
  {
    id: '1',
    avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    username: '@amiccoo',
    email: 'Jacinthe_Blick@hotmail.com',
    type: 'Empresa',
    status: 'inactivo'
  },
  {
    id: '2',
    avatarSrc: '/images/avatars/2.png',
    name: 'Richard Payne',
    username: '@brossiter15',
    email: 'Jaylon_Bartell3@gmail.com',
    type: 'Acredor',
    status: 'activo'
  },
  {
    id: '3',
    avatarSrc: '/images/avatars/3.png',
    name: 'Jennifer Summers',
    username: '@jsbemblinf',
    email: 'Tristin_Johnson@gmail.com',
    type: 'Proveedor',
    status: 'activo'
  },
  {
    id: '4',
    avatarSrc: '/images/avatars/4.png',
    name: 'Mr. Justin Richardson',
    username: '@justin45',
    email: 'Toney21@yahoo.com',
    type: 'Cliente',
    status: 'activo'
  },
  {
    id: '5',
    avatarSrc: '/images/avatars/5.png',
    name: 'Nicholas Tanner',
    username: '@tannernic',
    email: 'Hunter_Kuhic68@hotmail.com',
    type: 'Prospecto',
    status: 'activo'
  },
  {
    id: '6',
    avatarSrc: '/images/avatars/6.png',
    name: 'Crystal Mays',
    username: '@crystal99',
    email: 'Norene_Bins@yahoo.com',
    type: 'Empresa',
    status: 'inactivo'
  },
  {
    id: '7',
    avatarSrc: '/images/avatars/7.png',
    name: 'Mary Garcia',
    username: '@marygarcia4',
    email: 'Emmitt.Walker14@hotmail.com',
    type: 'Cliente',
    status: 'inactivo'
  },
  {
    id: '8',
    avatarSrc: '/images/avatars/8.png',
    name: 'Megan Roberts',
    username: '@megan78',
    email: 'Patrick.Howe73@gmail.com',
    type: 'Proveedor',
    status: 'activo'
  }
]
