'use client'

// React Imports
import React from 'react'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Constants Imports
import { SOCIAL_LINKS } from '../constants'

const SocialIcons: React.FC = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
      {SOCIAL_LINKS.map(link => (
        <IconButton
          key={link.name}
          component='a'
          href={link.href}
          target='_blank'
          rel='noopener noreferrer'
          size='small'
          className={link.color}
          title={link.name}
        >
          {link.icon}
        </IconButton>
      ))}
    </div>
  )
}

export default SocialIcons
