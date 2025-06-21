import { useState, useRef, useEffect } from 'react'

import { Box, TextField, IconButton, Typography, Button, Paper } from '@mui/material'

import type { UserType } from '@/types/user'

interface ChatUserProps {
  user: UserType
}

const ChatUser = ({ user }: ChatUserProps) => {
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! ¿Cómo estás?', sender: 'contact', time: '10:30 AM' },
    { id: 2, text: 'Muy bien, gracias. ¿Y tú?', sender: 'user', time: '10:32 AM' }
  ])

  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
    setInput('')
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        {
          id: msgs.length + 1,
          text: '¡Recibido!',
          sender: 'contact',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1200)
  }

  return (
    <Box className='flex flex-col h-[500px]'>
      {/* Header con información del usuario */}
      <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
        <Typography variant='h6' gutterBottom>
          Enviar Mensaje a {user.name} {user.lastName}
        </Typography>
        <Typography variant='body2'>
          {user.role} • {user.contacts.emails[0]?.address}
        </Typography>
      </Paper>

      {/* Área de chat */}
      <Box className='flex-1 overflow-y-auto space-y-2 p-2 bg-[var(--mui-palette-background-default)] rounded border'>
        {messages.map(msg => (
          <Box
            key={msg.id}
            className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm ${
              msg.sender === 'user'
                ? 'ml-auto bg-primary text-white'
                : 'mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
            }`}
          >
            <Typography variant='body2'>{msg.text}</Typography>
            <Typography variant='caption' sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
              {msg.time}
            </Typography>
          </Box>
        ))}
        <div ref={endRef} />
      </Box>

      {/* Área de entrada */}
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
        <Button
          variant='contained'
          color='primary'
          onClick={send}
          disabled={!input.trim()}
          startIcon={<i className='ri-send-plane-2-line' />}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  )
}

export default ChatUser
