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

// Opciones de tipo de usuario
export const TYPE_OPTIONS = ['Empresa', 'Acredor', 'Proveedor', 'Cliente', 'Prospecto']

/**
 * Opciones de estado de usuario.
 */
export const STATUS_OPTIONS = ['activo', 'inactivo']

// Tipo local para los usuarios
type TableBodyRowType = {
  id: string
  avatarSrc?: string
  name: string
  username: string
  email: string
  type: string
  status: string
}

/**
 * Card flotante que muestra información detallada del usuario al hacer hover.
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
                {row.username}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box mb={2}>
            <Typography variant='body2' mb={1}>
              <strong>Email:</strong> {row.email}
            </Typography>
            <Typography variant='body2' mb={1}>
              <strong>Tipo:</strong> {row.type}
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
              Experto en finanzas con más de 10 años de experiencia en el sector.
            </Typography>
          </Box>
        </Paper>
      </Fade>
    )}
  </Popper>
)

const Table = () => {
  const router = useRouter()

  // Estados para filtros y búsqueda
  const [globalSearch, setGlobalSearch] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Estado para los usuarios cargados desde el JSON
  const [rowsData, setRowsData] = useState<TableBodyRowType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estado para el usuario actualmente en hover y el elemento ancla para el Popper
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)

  // Cargar datos desde user.json
  useEffect(() => {
    setLoading(true)
    fetch('/user.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar user.json')

        return res.json()
      })
      .then(data => {
        setRowsData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  /**
   * Filtra los usuarios según los filtros y búsqueda.
   */
  const filteredRows = useMemo(() => {
    return rowsData.filter(row => {
      const matchesGlobal =
        !globalSearch ||
        row.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        row.username.toLowerCase().includes(globalSearch.toLowerCase()) ||
        row.email.toLowerCase().includes(globalSearch.toLowerCase())

      const matchesName =
        !nameFilter ||
        row.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        row.username.toLowerCase().includes(nameFilter.toLowerCase())

      const matchesEmail = !emailFilter || row.email.toLowerCase().includes(emailFilter.toLowerCase())
      const matchesType = !typeFilter || row.type === typeFilter
      const matchesStatus = !statusFilter || row.status === statusFilter

      return matchesGlobal && matchesName && matchesEmail && matchesType && matchesStatus
    })
  }, [rowsData, globalSearch, nameFilter, emailFilter, typeFilter, statusFilter])

  /**
   * Maneja el hover sobre la celda de usuario.
   * Muestra el card flotante y lo oculta con retardo al salir.
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

  /**
   * Abre la página de edición del usuario solo si se hace click en la celda del usuario.
   */
  const handleUserCellClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/view/user/CardUser?id=${id}`)
  }

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
  // Renderizado principal
  // =======================
  return (
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
            Nuevo usuario
          </Button>
        </div>
      </div>
      {/* Tabla de usuarios */}
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {/* Fila de filtros */}
            <tr style={{ height: 32 }}>
              <th style={{ padding: '2px 4px' }}>
                <TextField
                  size='small'
                  margin='dense'
                  placeholder='Filtrar usuario'
                  value={nameFilter}
                  onChange={e => setNameFilter(e.target.value)}
                  inputProps={{ style: { width: 120, height: 22, fontSize: 13 } }}
                />
              </th>
              <th style={{ padding: '2px 4px' }}>
                <TextField
                  size='small'
                  margin='dense'
                  placeholder='Filtrar email'
                  value={emailFilter}
                  onChange={e => setEmailFilter(e.target.value)}
                  inputProps={{ style: { width: 120, height: 22, fontSize: 13 } }}
                />
              </th>
              <th style={{ padding: '2px 4px' }}>
                <TextField
                  size='small'
                  margin='dense'
                  select
                  SelectProps={{ native: true }}
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  inputProps={{ style: { width: 90, height: 22, fontSize: 13 } }}
                >
                  <option value=''>Todos</option>
                  {TYPE_OPTIONS.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </TextField>
              </th>
              <th style={{ padding: '2px 4px' }}>
                <TextField
                  size='small'
                  margin='dense'
                  select
                  SelectProps={{ native: true }}
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  inputProps={{ style: { width: 90, height: 22, fontSize: 13 } }}
                >
                  <option value=''>Todos</option>
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </TextField>
              </th>
              <th style={{ width: 44, padding: 0 }}></th>
            </tr>
            {/* Fila de encabezados */}
            <tr style={{ height: 32 }}>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Usuario</th>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Email</th>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Tipo</th>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Status</th>
              <th style={{ width: 44, padding: 0 }}></th>
            </tr>
          </thead>
          <tbody>
            {/* Mensaje si no hay usuarios */}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={5} className='text-center py-4 text-gray-400'>
                  No hay usuarios que coincidan.
                </td>
              </tr>
            )}
            {/* Render de filas de usuario */}
            {filteredRows.map(row => (
              <tr key={row.id}>
                {/* Celda de usuario con hover y click */}
                <td
                  onMouseEnter={e => handleUserHover(row.id, e)}
                  onMouseLeave={() => handleUserHover(null)}
                  onClick={e => handleUserCellClick(row.id, e)}
                  style={{ userSelect: 'none', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar src={row.avatarSrc} sx={{ width: 32, height: 32 }} />
                    <div className='flex flex-col'>
                      <Typography color='text.primary' fontWeight={500} fontSize={13}>
                        {row.name}
                      </Typography>
                      <Typography variant='body2' fontSize={12} color='text.secondary'>
                        {row.username}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td>
                  <Typography style={{ fontSize: 13 }}>{row.email}</Typography>
                </td>
                <td>
                  <Typography color='text.primary' style={{ fontSize: 13 }}>
                    {row.type}
                  </Typography>
                </td>
                <td>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={row.status === 'activo' ? 'success' : 'error'}
                    label={row.status}
                    size='small'
                  />
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Renderiza el hover card correspondiente según el usuario */}
      {filteredRows.map(row => (
        <UserHoverCard key={row.id} row={row} open={hoveredUserId === row.id} anchorEl={anchorEl} />
      ))}
    </Card>
  )
}

export default Table
