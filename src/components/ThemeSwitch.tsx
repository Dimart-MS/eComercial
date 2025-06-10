'use client'

import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useThemeMode } from '@/contexts/ThemeModeContext'

const ThemeSwitch = () => {
  const { mode, setMode } = useThemeMode()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light')
  }

  return (
    <Box display='flex' alignItems='center' gap={1}>
      <Typography variant='body2'>🌞</Typography>
      <Switch checked={mode === 'dark'} onChange={handleChange} inputProps={{ 'aria-label': 'theme switch' }} />
      <Typography variant='body2'>🌙</Typography>
    </Box>
  )
}

export default ThemeSwitch
