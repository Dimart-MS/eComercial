'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import { useRouter, usePathname } from 'next/navigation'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Data & Types
import { flatMenuItems, type SearchItem } from '@components/layout/vertical/VerticalMenu'

interface NavSearchProps {
  width?: string
  height?: string
}

const NavSearch = ({ width = '300px', height = '40px' }: NavSearchProps) => {
  const theme = useTheme()
  const { isBreakpointReached } = useVerticalNav()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Buscar resultados
  const results = useMemo<SearchItem[]>(() => {
    const q = query.toLowerCase()

    return flatMenuItems.filter(item => item.label.toLowerCase().includes(q))
  }, [query])

  // Manejar teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = results[activeIndex]

      if (selected) {
        if (pathname !== selected.href) {
          router.push(selected.href)
        }

        setQuery('')
      }
    }
  }

  // Reset índice cuando cambia la búsqueda
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  if (isBreakpointReached) {
    return (
      <IconButton className='text-textPrimary'>
        <i className='ri-search-line' />
      </IconButton>
    )
  }

  return (
    <div className='relative' style={{ width, height }}>
      <TextField
        size='small'
        fullWidth
        placeholder='Buscar…'
        variant='outlined'
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <IconButton size='small' className='mr-1 text-textPrimary'>
              <i className='ri-search-line' />
            </IconButton>
          ),
          style: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            height
          }
        }}
      />

      {query && results.length > 0 && (
        <Paper
          elevation={3}
          className='absolute mt-1 w-full z-10 max-h-60 overflow-y-auto'
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <List dense disablePadding>
            {results.map((item, idx) => (
              <ListItem
                key={idx}
                component='button'
                onClick={() => {
                  if (pathname !== item.href) router.push(item.href)
                  setQuery('')
                }}
                selected={idx === activeIndex}
                className='hover:bg-opacity-10 text-left w-full'
                style={{
                  backgroundColor: idx === activeIndex ? theme.palette.action.hover : theme.palette.background.paper
                }}
              >
                <ListItemText
                  primary={item.label}
                  secondary={item.type === 'submenu' && item.parent ? `Submenú: ${item.parent}` : ''}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  )
}

export default NavSearch
