import { useState, useRef, useEffect } from 'react'

import { Box, TextField, IconButton, Typography } from '@mui/material'

// Define el tipo de usuario igual que en Table.tsx
export type ChatUserType = {
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

interface ChatUserProps {
  user: ChatUserType
}

const ChatUser = ({ user }: ChatUserProps) => {
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! ¿Cómo estás?', sender: 'contact' },
    { id: 2, text: 'Muy bien, gracias. ¿Y tú?', sender: 'user' }
  ])

  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }])
    setInput('')
    setTimeout(() => {
      setMessages(msgs => [...msgs, { id: msgs.length + 1, text: '¡Recibido!', sender: 'contact' }])
    }, 1200)
  }

  return (
    <Box className='flex flex-col h-[320px] md:h-[400px]'>
      {/* Header con nombre del usuario */}
      <Typography variant='subtitle2' color='text.secondary' className='mb-2'>
        Chat con {user.name} {user.lastName}
      </Typography>
      <Box className='flex-1 overflow-y-auto space-y-2 p-2 bg-[var(--mui-palette-background-default)] rounded'>
        {messages.map(msg => (
          <Box
            key={msg.id}
            className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm ${
              msg.sender === 'user'
                ? 'ml-auto bg-primary text-white'
                : 'mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
            }`}
          >
            {msg.text}
          </Box>
        ))}
        <div ref={endRef} />
      </Box>
      <Box className='flex gap-2 mt-2'>
        <TextField
          size='small'
          fullWidth
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') send()
          }}
          placeholder='Escribe un mensaje...'
          sx={{
            bgcolor: 'background.paper',
            input: { color: 'text.primary' }
          }}
        />
        <IconButton color='primary' onClick={send}>
          <i className='ri-send-plane-2-line' />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatUser
