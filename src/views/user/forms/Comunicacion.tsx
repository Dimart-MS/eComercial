import React, { useState, useEffect, useRef } from 'react'

import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
  Divider,
  Grid
} from '@mui/material'

import type { UserType, UserContacts, PhoneContact, EmailContact } from '@/types/user'

// --- Icons ---
const PhoneSolidIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' {...props}>
    <path
      fillRule='evenodd'
      d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-5.25 0-9.5-4.25-9.5-9.5V3.5z'
      clipRule='evenodd'
    />
  </svg>
)

const ChevronDownIconMini: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' {...props}>
    <path
      fillRule='evenodd'
      d='M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z'
      clipRule='evenodd'
    />
  </svg>
)

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' {...props}>
    <path
      fillRule='evenodd'
      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
      clipRule='evenodd'
    />
  </svg>
)

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' {...props}>
    <path
      fillRule='evenodd'
      d='M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807c1.123 0 2.086-.834 2.199-1.953l.841-10.518.149.022a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z'
      clipRule='evenodd'
    />
  </svg>
)

// --- Country Data ---
interface Country {
  name: string
  dial_code: string
  code: string // ISO 2-letter country code
  flag: string // Emoji representation
}

const ALL_COUNTRIES: Country[] = [
  { name: 'México', dial_code: '+52', code: 'MX', flag: '🇲🇽' },
  { name: 'Estados Unidos', dial_code: '+1', code: 'US', flag: '🇺🇸' },
  { name: 'Canadá', dial_code: '+1', code: 'CA', flag: '🇨🇦' },
  { name: 'España', dial_code: '+34', code: 'ES', flag: '🇪🇸' },
  { name: 'Argentina', dial_code: '+54', code: 'AR', flag: '🇦🇷' },
  { name: 'Chile', dial_code: '+56', code: 'CL', flag: '🇨🇱' },
  { name: 'Colombia', dial_code: '+57', code: 'CO', flag: '🇨🇴' },
  { name: 'Perú', dial_code: '+51', code: 'PE', flag: '🇵🇪' },
  { name: 'Venezuela', dial_code: '+58', code: 'VE', flag: '🇻🇪' },
  { name: 'Brasil', dial_code: '+55', code: 'BR', flag: '🇧🇷' },
  { name: 'Ecuador', dial_code: '+593', code: 'EC', flag: '🇪🇨' },
  { name: 'Bolivia', dial_code: '+591', code: 'BO', flag: '🇧🇴' },
  { name: 'Paraguay', dial_code: '+595', code: 'PY', flag: '🇵🇾' },
  { name: 'Uruguay', dial_code: '+598', code: 'UY', flag: '🇺🇾' },
  { name: 'Guatemala', dial_code: '+502', code: 'GT', flag: '🇬🇹' },
  { name: 'Honduras', dial_code: '+504', code: 'HN', flag: '🇭🇳' },
  { name: 'El Salvador', dial_code: '+503', code: 'SV', flag: '🇸🇻' },
  { name: 'Nicaragua', dial_code: '+505', code: 'NI', flag: '🇳🇮' },
  { name: 'Costa Rica', dial_code: '+506', code: 'CR', flag: '🇨🇷' },
  { name: 'Panamá', dial_code: '+507', code: 'PA', flag: '🇵🇦' },
  { name: 'Cuba', dial_code: '+53', code: 'CU', flag: '🇨🇺' },
  { name: 'República Dominicana', dial_code: '+1', code: 'DO', flag: '🇩🇴' },
  { name: 'Puerto Rico', dial_code: '+1', code: 'PR', flag: '🇵🇷' },
  { name: 'Alemania', dial_code: '+49', code: 'DE', flag: '🇩🇪' },
  { name: 'Francia', dial_code: '+33', code: 'FR', flag: '🇫🇷' },
  { name: 'Italia', dial_code: '+39', code: 'IT', flag: '🇮🇹' },
  { name: 'Reino Unido', dial_code: '+44', code: 'GB', flag: '🇬🇧' },
  { name: 'China', dial_code: '+86', code: 'CN', flag: '🇨🇳' },
  { name: 'Japón', dial_code: '+81', code: 'JP', flag: '🇯🇵' },
  { name: 'Corea del Sur', dial_code: '+82', code: 'KR', flag: '🇰🇷' },
  { name: 'India', dial_code: '+91', code: 'IN', flag: '🇮🇳' },
  { name: 'Australia', dial_code: '+61', code: 'AU', flag: '🇦🇺' },
  { name: 'Nueva Zelanda', dial_code: '+64', code: 'NZ', flag: '🇳🇿' },
  { name: 'Rusia', dial_code: '+7', code: 'RU', flag: '🇷🇺' },
  { name: 'Turquía', dial_code: '+90', code: 'TR', flag: '🇹🇷' },
  { name: 'Egipto', dial_code: '+20', code: 'EG', flag: '🇪🇬' },
  { name: 'Sudáfrica', dial_code: '+27', code: 'ZA', flag: '🇿🇦' },
  { name: 'Nigeria', dial_code: '+234', code: 'NG', flag: '🇳🇬' },
  { name: 'Kenia', dial_code: '+254', code: 'KE', flag: '🇰🇪' },
  { name: 'Marruecos', dial_code: '+212', code: 'MA', flag: '🇲🇦' },
  { name: 'Argelia', dial_code: '+213', code: 'DZ', flag: '🇩🇿' },
  { name: 'Túnez', dial_code: '+216', code: 'TN', flag: '🇹🇳' },
  { name: 'Libia', dial_code: '+218', code: 'LY', flag: '🇱🇾' },
  { name: 'Sudán', dial_code: '+249', code: 'SD', flag: '🇸🇩' },
  { name: 'Etiopía', dial_code: '+251', code: 'ET', flag: '🇪🇹' },
  { name: 'Uganda', dial_code: '+256', code: 'UG', flag: '🇺🇬' },
  { name: 'Tanzania', dial_code: '+255', code: 'TZ', flag: '🇹🇿' },
  { name: 'Ghana', dial_code: '+233', code: 'GH', flag: '🇬🇭' },
  { name: 'Costa de Marfil', dial_code: '+225', code: 'CI', flag: '🇨🇮' },
  { name: 'Senegal', dial_code: '+221', code: 'SN', flag: '🇸🇳' },
  { name: 'Mali', dial_code: '+223', code: 'ML', flag: '🇲🇱' },
  { name: 'Burkina Faso', dial_code: '+226', code: 'BF', flag: '🇧🇫' },
  { name: 'Níger', dial_code: '+227', code: 'NE', flag: '🇳🇪' },
  { name: 'Chad', dial_code: '+235', code: 'TD', flag: '🇹🇩' },
  { name: 'Camerún', dial_code: '+237', code: 'CM', flag: '🇨🇲' },
  { name: 'República Centroafricana', dial_code: '+236', code: 'CF', flag: '🇨🇫' },
  { name: 'Gabón', dial_code: '+241', code: 'GA', flag: '🇬🇦' },
  { name: 'Congo', dial_code: '+242', code: 'CG', flag: '🇨🇬' },
  { name: 'República Democrática del Congo', dial_code: '+243', code: 'CD', flag: '🇨🇩' },
  { name: 'Angola', dial_code: '+244', code: 'AO', flag: '🇦🇴' },
  { name: 'Guinea Ecuatorial', dial_code: '+240', code: 'GQ', flag: '🇬🇶' },
  { name: 'Santo Tomé y Príncipe', dial_code: '+239', code: 'ST', flag: '🇸🇹' },
  { name: 'Cabo Verde', dial_code: '+238', code: 'CV', flag: '🇨🇻' },
  { name: 'Guinea-Bisáu', dial_code: '+245', code: 'GW', flag: '🇬🇼' },
  { name: 'Guinea', dial_code: '+224', code: 'GN', flag: '🇬🇳' },
  { name: 'Sierra Leona', dial_code: '+232', code: 'SL', flag: '🇸🇱' },
  { name: 'Liberia', dial_code: '+231', code: 'LR', flag: '🇱🇷' },
  { name: 'Togo', dial_code: '+228', code: 'TG', flag: '🇹🇬' },
  { name: 'Benín', dial_code: '+229', code: 'BJ', flag: '🇧🇯' },
  { name: 'Niger', dial_code: '+227', code: 'NE', flag: '🇳🇪' },
  { name: 'Chad', dial_code: '+235', code: 'TD', flag: '🇹🇩' },
  { name: 'Sudán del Sur', dial_code: '+211', code: 'SS', flag: '🇸🇸' },
  { name: 'Eritrea', dial_code: '+291', code: 'ER', flag: '🇪🇷' },
  { name: 'Yibuti', dial_code: '+253', code: 'DJ', flag: '🇩🇯' },
  { name: 'Somalia', dial_code: '+252', code: 'SO', flag: '🇸🇴' },
  { name: 'Comoras', dial_code: '+269', code: 'KM', flag: '🇰🇲' },
  { name: 'Seychelles', dial_code: '+248', code: 'SC', flag: '🇸🇨' },
  { name: 'Mauricio', dial_code: '+230', code: 'MU', flag: '🇲🇺' },
  { name: 'Madagascar', dial_code: '+261', code: 'MG', flag: '🇲🇬' },
  { name: 'Malawi', dial_code: '+265', code: 'MW', flag: '🇲🇼' },
  { name: 'Zambia', dial_code: '+260', code: 'ZM', flag: '🇿🇲' },
  { name: 'Zimbabue', dial_code: '+263', code: 'ZW', flag: '🇿🇼' },
  { name: 'Botsuana', dial_code: '+267', code: 'BW', flag: '🇧🇼' },
  { name: 'Namibia', dial_code: '+264', code: 'NA', flag: '🇳🇦' },
  { name: 'Lesoto', dial_code: '+266', code: 'LS', flag: '🇱🇸' },
  { name: 'Suazilandia', dial_code: '+268', code: 'SZ', flag: '🇸🇿' },
  { name: 'Mozambique', dial_code: '+258', code: 'MZ', flag: '🇲🇿' },
  { name: 'Burundi', dial_code: '+257', code: 'BI', flag: '🇧🇮' },
  { name: 'Ruanda', dial_code: '+250', code: 'RW', flag: '🇷🇼' }
]

// --- Component Interface ---
interface ComunicacionFormProps {
  user: UserType
  onSave: (contacts: UserContacts) => void
  onCancel: () => void
}

const ComunicacionForm: React.FC<ComunicacionFormProps> = ({ user, onSave, onCancel }) => {
  const [contacts, setContacts] = useState<UserContacts>(user.contacts)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<number | null>(null)
  const [countrySearchTerm, setCountrySearchTerm] = useState('')
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePhoneChange = (index: number, field: keyof PhoneContact, value: string) => {
    const newPhones = [...contacts.phones]

    newPhones[index] = { ...newPhones[index], [field]: value }
    setContacts({ ...contacts, phones: newPhones })
  }

  const handleEmailChange = (index: number, field: keyof EmailContact, value: string) => {
    const newEmails = [...contacts.emails]

    newEmails[index] = { ...newEmails[index], [field]: value }
    setContacts({ ...contacts, emails: newEmails })
  }

  const addPhone = () => {
    const newPhone: PhoneContact = { region: '+52', number: '', type: 'personal' }

    setContacts({ ...contacts, phones: [...contacts.phones, newPhone] })
  }

  const addEmail = () => {
    const newEmail: EmailContact = { address: '', type: 'personal', alias: '' }

    setContacts({ ...contacts, emails: [...contacts.emails, newEmail] })
  }

  const removePhone = (index: number) => {
    const newPhones = contacts.phones.filter((_, i) => i !== index)

    setContacts({ ...contacts, phones: newPhones })
  }

  const removeEmail = (index: number) => {
    const newEmails = contacts.emails.filter((_, i) => i !== index)

    setContacts({ ...contacts, emails: newEmails })
  }

  const handleCountrySelect = (country: Country, phoneIndex: number) => {
    handlePhoneChange(phoneIndex, 'region', country.dial_code)
    setIsCountryDropdownOpen(null)
    setCountrySearchTerm('')
  }

  const filteredCountries = ALL_COUNTRIES.filter(
    country =>
      country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
      country.dial_code.includes(countrySearchTerm)
  )

  const getSelectedCountry = (dialCode: string) => {
    return ALL_COUNTRIES.find(c => c.dial_code === dialCode) || ALL_COUNTRIES[0]
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Editar Información de Comunicación
      </Typography>

      {/* Teléfonos */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='h6' color='primary'>
              Teléfonos
            </Typography>
            <Button startIcon={<PlusIcon />} onClick={addPhone} variant='outlined' size='small'>
              Agregar Teléfono
            </Button>
          </Box>

          {contacts.phones.map((phone, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Teléfono {index + 1}
                </Typography>
                {contacts.phones.length > 1 && (
                  <IconButton size='small' color='error' onClick={() => removePhone(index)}>
                    <TrashIcon />
                  </IconButton>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneSolidIcon style={{ width: 20, height: 20, marginRight: 8, color: 'gray' }} />
                    <Box sx={{ position: 'relative', minWidth: 120 }} ref={countryDropdownRef}>
                      <Button
                        variant='outlined'
                        onClick={() => setIsCountryDropdownOpen(isCountryDropdownOpen === index ? null : index)}
                        sx={{
                          minWidth: 120,
                          justifyContent: 'space-between',
                          textTransform: 'none'
                        }}
                      >
                        <span style={{ fontSize: '1.2em', marginRight: 8 }}>
                          {getSelectedCountry(phone.region).flag}
                        </span>
                        <ChevronDownIconMini style={{ width: 16, height: 16 }} />
                      </Button>

                      {isCountryDropdownOpen === index && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            bgcolor: 'background.paper',
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            maxHeight: 200,
                            overflow: 'auto',
                            boxShadow: 3
                          }}
                        >
                          <TextField
                            size='small'
                            placeholder='Buscar país...'
                            value={countrySearchTerm}
                            onChange={e => setCountrySearchTerm(e.target.value)}
                            sx={{ p: 1 }}
                          />
                          {filteredCountries.map(country => (
                            <Box
                              key={country.code}
                              onClick={() => handleCountrySelect(country, index)}
                              sx={{
                                p: 1,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'action.hover' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2em', marginRight: 8 }}>{country.flag}</span>
                                <Typography variant='body2'>{country.name}</Typography>
                              </Box>
                              <Typography variant='caption' color='text.secondary'>
                                {country.dial_code}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='tel'
                    value={phone.number}
                    onChange={e => handlePhoneChange(index, 'number', e.target.value)}
                    placeholder='Número de teléfono'
                    size='small'
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth size='small'>
                    <InputLabel>Tipo de teléfono</InputLabel>
                    <Select
                      value={phone.type}
                      onChange={e => handlePhoneChange(index, 'type', e.target.value)}
                      label='Tipo de teléfono'
                    >
                      <MenuItem value='personal'>Personal</MenuItem>
                      <MenuItem value='trabajo'>Trabajo</MenuItem>
                      <MenuItem value='casa'>Casa</MenuItem>
                      <MenuItem value='otro'>Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Correos */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='h6' color='primary'>
              Correos Electrónicos
            </Typography>
            <Button startIcon={<PlusIcon />} onClick={addEmail} variant='outlined' size='small'>
              Agregar Correo
            </Button>
          </Box>

          {contacts.emails.map((email, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Correo {index + 1}
                </Typography>
                {contacts.emails.length > 1 && (
                  <IconButton size='small' color='error' onClick={() => removeEmail(index)}>
                    <TrashIcon />
                  </IconButton>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='email'
                    value={email.address}
                    onChange={e => handleEmailChange(index, 'address', e.target.value)}
                    placeholder='usuario@ejemplo.com'
                    label='Dirección de correo'
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size='small'>
                    <InputLabel>Tipo de correo</InputLabel>
                    <Select
                      value={email.type}
                      onChange={e => handleEmailChange(index, 'type', e.target.value)}
                      label='Tipo de correo'
                    >
                      <MenuItem value='personal'>Personal</MenuItem>
                      <MenuItem value='trabajo'>Trabajo</MenuItem>
                      <MenuItem value='otro'>Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    value={email.alias || ''}
                    onChange={e => handleEmailChange(index, 'alias', e.target.value)}
                    placeholder='Alias (opcional)'
                    label='Alias'
                    size='small'
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant='outlined' onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant='contained' onClick={() => onSave(contacts)}>
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  )
}

export default ComunicacionForm
