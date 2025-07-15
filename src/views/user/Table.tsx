/**
 * TABLA DE CONTACTOS - eComercial
 * 
 * Componente principal para gestión y visualización de contactos.
 * Implementa tabla interactiva con filtrado, ordenamiento y búsqueda.
 * 
 * CARACTERÍSTICAS:
 * - Carga de datos desde JSON (preparado para API)
 * - Filtros dinámicos por tipo de contacto
 * - Ordenamiento multi-columna
 * - Búsqueda global en tiempo real
 * - Hover cards informativos
 * - Estados de carga y error
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

'use client'

import { useState, useMemo, useRef, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import {
  Typography,
  Card,
  Chip,
  Button,
  TextField,
  Paper,
  Popper,
  Fade,
  Box,
  Divider,
  Avatar,
  CircularProgress
} from '@mui/material'

import tableStyles from '@core/styles/table.module.css'
import { useUserNavigation } from '@/hooks/useUserNavigation'

/**
 * OPCIONES DE CONFIGURACIÓN
 * 
 * Estas constantes definen las opciones disponibles para filtros
 * y categorización de contactos en el sistema.
 */

// Opciones de tipo de usuario para filtrado
export const TYPE_OPTIONS = ['Prospecto', 'Cliente', 'Proveedor', 'Acreedor', 'Colaborador']

/**
 * Opciones de estado de usuario.
 * Define los estados posibles para un contacto en el sistema.
 */
export const STATUS_OPTIONS = ['activo', 'inactivo']

/**
 * TIPOS DE DATOS
 * 
 * Definiciones TypeScript para la estructura de datos de contactos
 * y configuración de la tabla.
 */

// Tipo principal para las filas de la tabla
type TableBodyRowType = {
  id: string
  avatarSrc?: string
  name: string
  lastName?: string
  username?: string
  email: string
  contacts?: {
    alias?: string
    phones?: Array<{
      region: string
      number: string
      type: string
    }>
    emails?: Array<{
      address: string
      type: string
    }>
  }
  companies?: Array<{
    name: string
    position?: string
  }>
  category?: string
  status: 'activo' | 'inactivo'
  profile?: {
    decisionInfluence?: string
    activities?: string
    opportunityAreas?: string
    recommendations?: string
    notes?: string
  }
}

// Tipos para el sistema de ordenamiento
type SortDirection = 'asc' | 'desc' | null
type SortColumn = 'name' | 'lastName' | 'email' | 'phone' | 'company'

type SortConfig = {
  column: SortColumn | null
  direction: SortDirection
}

/**
 * COMPONENTE: UserHoverCard
 * 
 * Card flotante que muestra información detallada del usuario al hacer hover.
 * Implementa un sistema de posicionamiento inteligente con transiciones suaves.
 * 
 * CARACTERÍSTICAS:
 * - Posicionamiento automático (right-start)
 * - Transiciones con Fade
 * - Información estructurada del contacto
 * - Diseño responsive
 * - Z-index optimizado
 * 
 * @param row - Datos del contacto a mostrar
 * @param open - Estado de visibilidad del card
 * @param anchorEl - Elemento ancla para posicionamiento
 */
const UserHoverCard = ({
  row,
  open,
  anchorEl
}: {
  row: TableBodyRowType
  open: boolean
  anchorEl: HTMLElement | null
}) => (
  <Popper
    open={open}
    anchorEl={anchorEl}
    placement='right-start'
    transition
    modifiers={[
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      }
    ]}
    sx={{ zIndex: 1300 }}
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={200}>
        <Paper
          elevation={3}
          sx={{
            width: 320,
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box display='flex' alignItems='center' mb={2}>
            <Avatar src={row.avatarSrc} sx={{ width: 64, height: 64, mr: 2 }} />
            <Box>
              <Typography variant='h6' fontWeight={600}>
                {row.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {row.contacts?.alias || row.username || ''}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box mb={2}>
            <Typography variant='body2' mb={1}>
              <strong>Email:</strong> {row.email}
            </Typography>
            <Typography variant='body2' mb={1}>
              <strong>Categoría:</strong> {row.category || 'N/D'}
            </Typography>
            <Box display='flex' alignItems='center'>
              <strong style={{ marginRight: 8 }}>Estado:</strong>
              <Chip
                label={row.status}
                size='small'
                color={row.status === 'activo' ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant='body2'>
              <strong>Información adicional:</strong>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.profile?.notes || 'Sin notas adicionales.'}
            </Typography>
          </Box>
        </Paper>
      </Fade>
    )}
  </Popper>
)

/**
 * COMPONENTE PRINCIPAL: Table
 * 
 * Tabla de contactos con funcionalidades completas de gestión.
 * Implementa un sistema de datos complejo con múltiples estados
 * y interacciones de usuario.
 * 
 * FUNCIONALIDADES:
 * - Carga y transformación de datos
 * - Filtrado por tipo de contacto
 * - Búsqueda global en tiempo real
 * - Ordenamiento multi-columna
 * - Hover cards informativos
 * - Navegación a detalles
 * - Estados de carga y error
 * 
 * ESTADOS:
 * - globalSearch: Búsqueda global
 * - typeFilter: Filtro por tipo de contacto
 * - sortConfig: Configuración de ordenamiento
 * - rowsData: Datos de contactos
 * - loading: Estado de carga
 * - error: Estado de error
 * - hoveredUserId: ID del usuario en hover
 * - anchorEl: Elemento ancla para hover card
 */
const Table = () => {
  const { navigateToContactDetail } = useUserNavigation()

  // Estados para filtros y búsqueda
  const [globalSearch, setGlobalSearch] = useState('')
  const [nameFilter] = useState('')
  const [emailFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: null, direction: null })

  // Estado para los usuarios cargados desde el JSON
  const [rowsData, setRowsData] = useState<TableBodyRowType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estado para el usuario actualmente en hover y el elemento ancla para el Popper
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)

  /**
   * CARGA DE DATOS
   * 
   * Efecto que carga los datos de contactos desde el archivo JSON estático.
   * Transforma la estructura de datos para que coincida con los tipos TypeScript.
   * 
   * FLUJO:
   * 1. Marca como cargando
   * 2. Hace fetch del archivo user.json
   * 3. Transforma cada usuario al formato esperado
   * 4. Maneja errores de red o parsing
   * 5. Actualiza el estado con los datos
   */
  useEffect(() => {
    setLoading(true)
    fetch('/user.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar user.json')

        return res.json()
      })
      .then(data => {
        // Transformar los datos para que coincidan con el tipo esperado
        const transformedData: TableBodyRowType[] = data.map((user: any) => ({
          id: user.id,
          avatarSrc: user.avatarSrc,
          name: user.name,
          lastName: user.lastName,
          username: user.contacts?.alias || '',
          email: user.contacts?.emails?.[0]?.address || '',
          contacts: user.contacts,
          companies: user.companies,
          category: user.category,
          status: user.disabled === false ? 'activo' : 'inactivo',
          profile: user.profile
        }))

        setRowsData(transformedData)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  /**
   * FILTRADO Y ORDENAMIENTO
   * 
   * Memo que aplica filtros y ordenamiento a los datos de contactos.
   * Se ejecuta automáticamente cuando cambian los filtros o datos.
   * 
   * FILTROS APLICADOS:
   * - Búsqueda global: nombre, apellido, email
   * - Filtro por nombre: búsqueda específica en nombre/apellido
   * - Filtro por email: búsqueda específica en email
   * - Filtro por tipo: categoría del contacto
   * - Filtro por estado: activo/inactivo
   * 
   * ORDENAMIENTO:
   * - Soporte para múltiples columnas
   * - Dirección ascendente/descendente
   * - Manejo de valores nulos/undefined
   */
  const filteredAndSortedRows = useMemo(() => {
    const result = rowsData.filter(row => {
      const matchesGlobal =
        !globalSearch ||
        row.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        (row.lastName || '').toLowerCase().includes(globalSearch.toLowerCase()) ||
        row.email.toLowerCase().includes(globalSearch.toLowerCase())

      const matchesName =
        !nameFilter ||
        row.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        (row.lastName || '').toLowerCase().includes(nameFilter.toLowerCase())

      const matchesEmail = !emailFilter || row.email.toLowerCase().includes(emailFilter.toLowerCase())
      const matchesType = !typeFilter || row.category === typeFilter
      const matchesStatus = !statusFilter || row.status === statusFilter

      return matchesGlobal && matchesName && matchesEmail && matchesType && matchesStatus
    })

    // Aplicar ordenamiento
    if (sortConfig.column && sortConfig.direction) {
      result.sort((a, b) => {
        let valA: any
        let valB: any

        switch (sortConfig.column) {
          case 'name':
            valA = a.name.toLowerCase()
            valB = b.name.toLowerCase()
            break
          case 'lastName':
            valA = (a.lastName || '').toLowerCase()
            valB = (b.lastName || '').toLowerCase()
            break
          case 'email':
            valA = a.email.toLowerCase()
            valB = b.email.toLowerCase()
            break
          case 'phone':
            const phoneA = a.contacts?.phones?.[0]
            const phoneB = b.contacts?.phones?.[0]

            valA = phoneA ? `${phoneA.region}${phoneA.number}`.toLowerCase() : ''
            valB = phoneB ? `${phoneB.region}${phoneB.number}`.toLowerCase() : ''
            break
          case 'company':
            const companyA = a.companies?.[0]
            const companyB = b.companies?.[0]

            valA = companyA ? companyA.name.toLowerCase() : ''
            valB = companyB ? companyB.name.toLowerCase() : ''
            break
          default:
            return 0
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1

        return 0
      })
    }

    return result
  }, [rowsData, globalSearch, nameFilter, emailFilter, typeFilter, statusFilter, sortConfig])

  /**
   * MANEJADOR DE ORDENAMIENTO
   * 
   * Función que maneja el ordenamiento de columnas con ciclo:
   * ascendente -> descendente -> sin ordenamiento
   * 
   * @param column - Columna a ordenar
   */
  const handleSort = (column: SortColumn) => {
    setSortConfig(prev => {
      if (prev.column === column) {
        if (prev.direction === 'asc') {
          return { column, direction: 'desc' }
        } else if (prev.direction === 'desc') {
          return { column: null, direction: null }
        }
      }

      return { column, direction: 'asc' }
    })
  }

  /**
   * RENDERIZADO DE ICONOS DE ORDENAMIENTO
   * 
   * Función que renderiza los iconos visuales para indicar
   * el estado de ordenamiento de cada columna.
   * 
   * @param column - Columna para la cual renderizar el icono
   * @returns JSX del icono correspondiente
   */
  const iconBaseClass = 'text-lg align-middle'

  const renderSortIcon = (column: SortColumn) => {
    if (sortConfig.column !== column) {
      return <i className={`${iconBaseClass} ri-expand-up-down-line text-gray-400`} />
    }

    if (sortConfig.direction === 'asc') {
      return <i className={`${iconBaseClass} ri-arrow-up-s-line text-primary`} />
    }

    return <i className={`${iconBaseClass} ri-arrow-down-s-line text-primary`} />
  }

  /**
   * MANEJADOR DE HOVER
   * 
   * Maneja el hover sobre la celda de usuario con retardo para
   * evitar parpadeos y mejorar la experiencia de usuario.
   * 
   * @param userId - ID del usuario o null para ocultar
   * @param event - Evento del mouse para posicionamiento
   */
  const handleUserHover = (userId: string | null, event?: React.MouseEvent<HTMLElement>) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
    }

    if (userId === null) {
      hoverTimer.current = setTimeout(() => {
        setHoveredUserId(null)
        setAnchorEl(null)
      }, 200)
    } else {
      setHoveredUserId(userId)
      setAnchorEl(event?.currentTarget || null)
    }
  }

  // Estados de carga y error
  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' sx={{ p: 4, minHeight: 300 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando contactos...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{ p: 4, color: 'error.main', minHeight: 300 }}
      >
        <Typography variant='h6'>Error: {error}</Typography>
      </Box>
    )
  }

  // =======================
  // RENDERIZADO PRINCIPAL
  // =======================
  return (
    <>
      {/* Pestañas de tipo de usuario */}
      <div className='flex border-b border-divider'>
        <button
          key='todos'
          type='button'
          onClick={() => setTypeFilter('')}
          className={`mui-tab
          px-6 py-3 text-sm font-medium rounded-t-lg shadow-sm 
          ${typeFilter === '' ? 'active' : ''}`}
          aria-current={typeFilter === '' ? 'page' : undefined}
        >
          Todos
        </button>
        {TYPE_OPTIONS.map(type => {
          const isActive = typeFilter === type

          return (
            <button
              key={type}
              type='button'
              onClick={() => setTypeFilter(type)}
              className={`mui-tab
                px-6 py-3 text-sm font-medium rounded-t-lg shadow-sm 
                ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {type}
            </button>
          )
        })}
      </div>
      <Card>
        {/* Barra superior con acciones y búsqueda */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-2 p-4 border-b'>
          <div className='flex gap-2'>
            <Button
              variant='contained'
              color='primary'
              size='small'
              startIcon={<i className='ri-upload-2-line' />}
              onClick={() => alert('Importar')}
            >
              Importar
            </Button>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              startIcon={<i className='ri-download-2-line' />}
              onClick={() => alert('Exportar')}
            >
              Exportar
            </Button>
          </div>
          <div className='flex w-full md:w-auto gap-2 items-center'>
            <TextField
              size='small'
              placeholder='Buscar usuario'
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              className='w-full md:w-64'
            />
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => alert('Nuevo usuario')}
              style={{ whiteSpace: 'nowrap' }}
            >
              Nuevo Contacto
            </Button>
          </div>
        </div>
        {/* Tabla de usuarios */}
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {/* Fila de encabezados */}
              <tr style={{ height: 32 }}>
                <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleSort('name')}>
                    Nombre
                    {renderSortIcon('name')}
                  </div>
                </th>
                <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleSort('lastName')}>
                    Apellidos
                    {renderSortIcon('lastName')}
                  </div>
                </th>
                <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleSort('email')}>
                    Correo
                    {renderSortIcon('email')}
                  </div>
                </th>
                <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleSort('phone')}>
                    Teléfono
                    {renderSortIcon('phone')}
                  </div>
                </th>
                <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleSort('company')}>
                    Empresa
                    {renderSortIcon('company')}
                  </div>
                </th>
                <th style={{ width: 44, padding: 0 }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Mensaje si no hay usuarios */}
              {filteredAndSortedRows.length === 0 && (
                <tr>
                  <td colSpan={6} className='text-center py-4 text-gray-400'>
                    No hay usuarios que coincidan.
                  </td>
                </tr>
              )}
              {/* Render de filas de usuario */}
              {filteredAndSortedRows.map(row => {
                const phone = row.contacts?.phones?.[0]
                  ? `${row.contacts.phones[0].region} ${row.contacts.phones[0].number}`
                  : 'N/D'

                const company = row.companies?.[0]?.name || 'N/D'

                return (
                  <tr
                    key={row.id}
                    className='hover:bg-[var(--mui-palette-action-hover)] transition-colors duration-150'
                    onMouseLeave={() => handleUserHover(null)}
                  >
                    {/* Celda de usuario con hover y click */}
                    <td
                      style={{ userSelect: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => handleUserHover(row.id, e)}
                      onMouseLeave={() => handleUserHover(null)}
                      onClick={e => {
                        e.stopPropagation()
                        navigateToContactDetail(row.id)
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar src={row.avatarSrc} sx={{ width: 32, height: 32 }} />
                        <div className='flex flex-col'>
                          <Typography color='text.primary' fontWeight={500} fontSize={13}>
                            {row.name}
                          </Typography>
                          <Typography variant='body2' fontSize={12} color='text.secondary'>
                            {row.contacts?.alias || row.username || ''}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Typography style={{ fontSize: 13 }}>{row.lastName || 'N/D'}</Typography>
                    </td>
                    <td>
                      <Typography style={{ fontSize: 13 }}>{row.email}</Typography>
                    </td>
                    <td>
                      <Typography style={{ fontSize: 13 }}>{phone}</Typography>
                    </td>
                    <td>
                      <Typography style={{ fontSize: 13 }}>{company}</Typography>
                    </td>
                    {/* Botón eliminar */}
                    <td style={{ textAlign: 'center', width: 30, padding: 0 }}>
                      <button
                        type='button'
                        title='Eliminar'
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 36,
                          height: 36
                        }}
                        onClick={e => {
                          e.stopPropagation()
                          alert(`Eliminar usuario: ${row.name}`)
                        }}
                      >
                        <i className='ri-delete-bin-7-line text-textSecondary' style={{ fontSize: 20 }} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Renderiza el hover card correspondiente según el usuario */}
        {filteredAndSortedRows.map(row => (
          <UserHoverCard key={row.id} row={row} open={hoveredUserId === row.id} anchorEl={anchorEl} />
        ))}
      </Card>
    </>
  )
}

export default Table
