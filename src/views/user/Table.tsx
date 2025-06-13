'use client'

import { useState, useMemo } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

// Tipos y datos de ejemplo
type TableBodyRowType = {
  avatarSrc?: string
  name: string
  username: string
  email: string
  type: string
  status: string
  href?: string // Para el link al hacer click
}

const TYPE_OPTIONS = ['Empresa', 'Acredor', 'Proveedor', 'Cliente', 'Prospecto']
const STATUS_OPTIONS = ['activo', 'inactivo']

const rowsData: TableBodyRowType[] = [
  {
    avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    username: '@amiccoo',
    email: 'Jacinthe_Blick@hotmail.com',
    type: 'Empresa',
    status: 'inactivo',
    href: 'https://ejemplo.com/jordan'
  },
  {
    avatarSrc: '/images/avatars/2.png',
    name: 'Richard Payne',
    username: '@brossiter15',
    email: 'Jaylon_Bartell3@gmail.com',
    type: 'Acredor',
    status: 'activo',
    href: 'https://ejemplo.com/richard'
  },
  {
    avatarSrc: '/images/avatars/3.png',
    name: 'Jennifer Summers',
    username: '@jsbemblinf',
    email: 'Tristin_Johnson@gmail.com',
    type: 'Proveedor',
    status: 'activo',
    href: 'https://ejemplo.com/jennifer'
  },
  {
    avatarSrc: '/images/avatars/4.png',
    name: 'Mr. Justin Richardson',
    username: '@justin45',
    email: 'Toney21@yahoo.com',
    type: 'Cliente',
    status: 'activo',
    href: 'https://ejemplo.com/justin'
  },
  {
    avatarSrc: '/images/avatars/5.png',
    name: 'Nicholas Tanner',
    username: '@tannernic',
    email: 'Hunter_Kuhic68@hotmail.com',
    type: 'Prospecto',
    status: 'activo',
    href: 'https://ejemplo.com/nicholas'
  },
  {
    avatarSrc: '/images/avatars/6.png',
    name: 'Crystal Mays',
    username: '@crystal99',
    email: 'Norene_Bins@yahoo.com',
    type: 'Empresa',
    status: 'inactivo',
    href: 'https://ejemplo.com/crystal'
  },
  {
    avatarSrc: '/images/avatars/7.png',
    name: 'Mary Garcia',
    username: '@marygarcia4',
    email: 'Emmitt.Walker14@hotmail.com',
    type: 'Cliente',
    status: 'inactivo',
    href: 'https://ejemplo.com/mary'
  },
  {
    avatarSrc: '/images/avatars/8.png',
    name: 'Megan Roberts',
    username: '@megan78',
    email: 'Patrick.Howe73@gmail.com',
    type: 'Proveedor',
    status: 'activo',
    href: 'https://ejemplo.com/megan'
  }
]

const Table = () => {
  // Estados para filtros y búsqueda
  const [globalSearch, setGlobalSearch] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Filtrado de datos
  const filteredRows = useMemo(() => {
    return rowsData.filter(row => {
      // Búsqueda global
      const matchesGlobal =
        !globalSearch ||
        row.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        row.username.toLowerCase().includes(globalSearch.toLowerCase()) ||
        row.email.toLowerCase().includes(globalSearch.toLowerCase())

      // Filtros individuales
      const matchesName =
        !nameFilter ||
        row.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        row.username.toLowerCase().includes(nameFilter.toLowerCase())

      const matchesEmail = !emailFilter || row.email.toLowerCase().includes(emailFilter.toLowerCase())
      const matchesType = !typeFilter || row.type === typeFilter
      const matchesStatus = !statusFilter || row.status === statusFilter

      return matchesGlobal && matchesName && matchesEmail && matchesType && matchesStatus
    })
  }, [globalSearch, nameFilter, emailFilter, typeFilter, statusFilter])

  // Tooltip content
  const UserTooltipContent = ({ row }: { row: TableBodyRowType }) => (
    <Paper
      elevation={3}
      sx={{
        p: 1.2,
        minWidth: 180,
        maxWidth: 260,
        background: '#fff',
        fontSize: 13,
        boxShadow: 3,
        borderRadius: 2,
        wordBreak: 'break-word'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <CustomAvatar src={row.avatarSrc} size={32} />
        <div>
          <div style={{ fontWeight: 600 }}>{row.name}</div>
          <div style={{ color: '#888', fontSize: 12 }}>{row.username}</div>
        </div>
      </div>
      <div style={{ fontSize: 13, marginBottom: 2 }}>
        <span style={{ fontWeight: 500 }}>Email:</span> {row.email}
      </div>
      <div style={{ fontSize: 13, marginBottom: 2 }}>
        <span style={{ fontWeight: 500 }}>Tipo:</span> {row.type}
      </div>
      <div style={{ fontSize: 13 }}>
        <span style={{ fontWeight: 500 }}>Estado:</span>{' '}
        <Chip
          label={row.status}
          size='small'
          color={row.status === 'activo' ? 'success' : row.status === 'inactivo' ? 'secondary' : 'default'}
          sx={{ height: 20, fontSize: 12, textTransform: 'capitalize' }}
        />
      </div>
    </Paper>
  )

  return (
    <Card>
      {/* Barra superior con botones y buscador global */}
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
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {/* Fila de filtros con altura fija */}
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
              {/* Columna vacía para acción eliminar */}
              <th style={{ width: 44, padding: 0 }}></th>
            </tr>
            {/* Fila de títulos con altura fija */}
            <tr style={{ height: 32 }}>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Usuario</th>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Email</th>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Tipo</th>
              <th style={{ fontWeight: 600, fontSize: 14, padding: 6 }}>Status</th>
              {/* Encabezado vacío para acción eliminar */}
              <th style={{ width: 44, padding: 0 }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={5} className='text-center py-4 text-gray-400'>
                  No hay usuarios que coincidan.
                </td>
              </tr>
            )}
            {filteredRows.map((row, index) => (
              <Tooltip
                key={index}
                title={<UserTooltipContent row={row} />}
                arrow
                placement='top'
                enterDelay={200}
                leaveDelay={100}
                componentsProps={{
                  tooltip: {
                    sx: {
                      p: 0,
                      bgcolor: 'transparent'
                    }
                  }
                }}
              >
                <tr
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (row.href) window.open(row.href, '_blank')
                  }}
                  tabIndex={0}
                >
                  <td>
                    <Tooltip
                      title={<UserTooltipContent row={row} />}
                      arrow
                      placement='right'
                      enterDelay={200}
                      leaveDelay={100}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            p: 0,
                            bgcolor: 'transparent'
                          }
                        }
                      }}
                    >
                      <span
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                        onClick={e => {
                          e.stopPropagation()
                          if (row.href) window.open(row.href, '_blank')
                        }}
                      >
                        <CustomAvatar src={row.avatarSrc} size={28} />
                        <div className='flex flex-col'>
                          <Typography color='text.primary' className='font-medium' style={{ fontSize: 13 }}>
                            {row.name}
                          </Typography>
                          <Typography variant='body2' style={{ fontSize: 12 }}>
                            {row.username}
                          </Typography>
                        </div>
                      </span>
                    </Tooltip>
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
                      color={row.status === 'activo' ? 'success' : row.status === 'inactivo' ? 'secondary' : 'default'}
                      label={row.status}
                      size='small'
                    />
                  </td>
                  {/* Columna de acción eliminar */}
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
              </Tooltip>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default Table
