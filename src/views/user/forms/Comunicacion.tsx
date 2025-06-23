import React, { useState, useEffect, useRef } from 'react'

import { ChevronDownIcon } from '@/components/icons'

import type { UserContacts, PhoneContact, EmailContact, SocialNetwork } from '@/types/user'

interface EditComunicacionFormProps {
  data: UserContacts & { socialNetworks?: SocialNetwork[] }
  onChange: (
    type: 'phones' | 'emails' | 'socialNetworks',
    index: number,
    field: keyof PhoneContact | keyof EmailContact | keyof SocialNetwork,
    value: string
  ) => void
  onAdd?: (type: 'phones' | 'emails' | 'socialNetworks') => void
  onRemove?: (type: 'phones' | 'emails' | 'socialNetworks', index: number) => void
}

const COUNTRY_OPTIONS = [
  { name: 'México', code: '+52', flag: '🇲🇽' },
  { name: 'Estados Unidos', code: '+1', flag: '🇺🇸' },
  { name: 'Canadá', code: '+1', flag: '🇨🇦' },
  { name: 'España', code: '+34', flag: '🇪🇸' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Chile', code: '+56', flag: '🇨🇱' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' },
  { name: 'Perú', code: '+51', flag: '🇵🇪' },
  { name: 'Venezuela', code: '+58', flag: '🇻🇪' },
  { name: 'Brasil', code: '+55', flag: '🇧🇷' },
  { name: 'Ecuador', code: '+593', flag: '🇪🇨' },
  { name: 'Bolivia', code: '+591', flag: '🇧🇴' },
  { name: 'Paraguay', code: '+595', flag: '🇵🇾' },
  { name: 'Uruguay', code: '+598', flag: '🇺🇾' },
  { name: 'Guatemala', code: '+502', flag: '��🇹' },
  { name: 'Honduras', code: '+504', flag: '🇭🇳' },
  { name: 'El Salvador', code: '+503', flag: '🇸🇻' },
  { name: 'Nicaragua', code: '+505', flag: '🇳🇮' },
  { name: 'Costa Rica', code: '+506', flag: '🇨🇷' },
  { name: 'Panamá', code: '+507', flag: '🇵🇦' },
  { name: 'Cuba', code: '+53', flag: '🇨🇺' },
  { name: 'República Dominicana', code: '+1809', flag: '🇩🇴' },
  { name: 'Puerto Rico', code: '+1787', flag: '🇵🇷' },
  { name: 'Alemania', code: '+49', flag: '🇩🇪' },
  { name: 'Francia', code: '+33', flag: '🇫🇷' },
  { name: 'Italia', code: '+39', flag: '🇮🇹' },
  { name: 'Reino Unido', code: '+44', flag: '🇬🇧' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Japón', code: '+81', flag: '🇯🇵' },
  { name: 'Corea del Sur', code: '+82', flag: '🇰🇷' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Nueva Zelanda', code: '+64', flag: '🇳🇿' },
  { name: 'Rusia', code: '+7', flag: '🇷🇺' },
  { name: 'Turquía', code: '+90', flag: '🇹🇷' },
  { name: 'Egipto', code: '+20', flag: '🇪🇬' },
  { name: 'Sudáfrica', code: '+27', flag: '🇿🇦' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Kenia', code: '+254', flag: '🇰🇪' },
  { name: 'Marruecos', code: '+212', flag: '🇲��' },
  { name: 'Argelia', code: '+213', flag: '��🇿' },
  { name: 'Túnez', code: '+216', flag: '🇹🇳' },
  { name: 'Libia', code: '+218', flag: '🇱🇾' },
  { name: 'Sudán', code: '+249', flag: '🇸🇩' },
  { name: 'Etiopía', code: '+251', flag: '🇪🇹' },
  { name: 'Uganda', code: '+256', flag: '🇺🇬' },
  { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Costa de Marfil', code: '+225', flag: '🇨🇮' },
  { name: 'Senegal', code: '+221', flag: '🇸🇳' },
  { name: 'Mali', code: '+223', flag: '🇲🇱' },
  { name: 'Burkina Faso', code: '+226', flag: '🇧🇫' },
  { name: 'Níger', code: '+227', flag: '🇳🇪' },
  { name: 'Chad', code: '+235', flag: '🇹🇩' },
  { name: 'Camerún', code: '+237', flag: '🇨🇲' },
  { name: 'República Centroafricana', code: '+236', flag: '🇨🇫' },
  { name: 'Gabón', code: '+241', flag: '🇬🇦' },
  { name: 'Congo', code: '+242', flag: '🇨🇬' },
  { name: 'República Democrática del Congo', code: '+243', flag: '🇨🇩' },
  { name: 'Angola', code: '+244', flag: '🇦🇴' },
  { name: 'Guinea Ecuatorial', code: '+240', flag: '🇬🇶' },
  { name: 'Santo Tomé y Príncipe', code: '+239', flag: '🇸🇹' },
  { name: 'Cabo Verde', code: '+238', flag: '🇨🇻' },
  { name: 'Guinea-Bisáu', code: '+245', flag: '🇬🇼' },
  { name: 'Guinea', code: '+224', flag: '🇬🇳' },
  { name: 'Sierra Leona', code: '+232', flag: '🇸🇱' },
  { name: 'Liberia', code: '+231', flag: '🇱🇷' },
  { name: 'Togo', code: '+228', flag: '🇹🇬' },
  { name: 'Benín', code: '+229', flag: '🇧🇯' },
  { name: 'Sudán del Sur', code: '+249', flag: '🇸🇸' },
  { name: 'Eritrea', code: '+291', flag: '🇪🇷' },
  { name: 'Yibuti', code: '+253', flag: '🇩🇯' },
  { name: 'Somalia', code: '+252', flag: '🇸🇴' },
  { name: 'Comoras', code: '+269', flag: '🇰🇲' },
  { name: 'Seychelles', code: '+248', flag: '🇸🇨' },
  { name: 'Mauricio', code: '+230', flag: '🇲🇺' },
  { name: 'Madagascar', code: '+261', flag: '🇲��' },
  { name: 'Malawi', code: '+265', flag: '��🇼' },
  { name: 'Zambia', code: '+260', flag: '🇿🇲' },
  { name: 'Zimbabue', code: '+263', flag: '🇿🇼' },
  { name: 'Botsuana', code: '+267', flag: '🇧🇼' },
  { name: 'Namibia', code: '+264', flag: '🇳🇦' },
  { name: 'Lesoto', code: '+266', flag: '🇱🇸' },
  { name: 'Suazilandia', code: '+268', flag: '🇸🇿' },
  { name: 'Mozambique', code: '+258', flag: '🇲🇿' },
  { name: 'Burundi', code: '+257', flag: '🇧🇮' },
  { name: 'Ruanda', code: '+250', flag: '🇷🇼' }
]

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'

const selectClass = `${inputClass} appearance-none`

const EditComunicacionForm: React.FC<EditComunicacionFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  // Dropdown país para cada teléfono
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<number | null>(null)
  const [countrySearch, setCountrySearch] = useState('')
  const dropdownRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsRegionDropdownOpen(null)
      }
    }

    if (isRegionDropdownOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isRegionDropdownOpen])

  // --- Teléfonos ---
  const phones = data.phones || []

  // --- Correos ---
  const emails = data.emails || []

  // --- Redes sociales ---
  const socials = data.socialNetworks || []

  return (
    <div className='space-y-6'>
      {/* Teléfonos */}
      <fieldset className='border border-gray-300 p-4 rounded-md'>
        <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
          Teléfono
          <button type='button' className='ml-2 text-primary' onClick={() => onAdd && onAdd('phones')}>
            + Agregar
          </button>
        </legend>
        <div className='space-y-3 mt-2'>
          {phones.map((phone, idx) => (
            <div key={idx} className='flex items-stretch gap-2 relative'>
              <div className='relative'>
                <button
                  ref={buttonRef}
                  type='button'
                  className='flex items-center justify-center h-full px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary'
                  onClick={() => setIsRegionDropdownOpen(isRegionDropdownOpen === idx ? null : idx)}
                  aria-haspopup='listbox'
                  aria-expanded={isRegionDropdownOpen === idx}
                  aria-label='Seleccionar código de país'
                >
                  <span className='text-lg leading-none'>
                    {COUNTRY_OPTIONS.find(c => c.code === phone.region)?.flag || '🌐'}
                  </span>
                  <ChevronDownIcon className='w-4 h-4 text-gray-600 ml-1.5' />
                </button>
                {isRegionDropdownOpen === idx && (
                  <ul
                    ref={dropdownRef}
                    className='absolute z-20 mt-1 w-max max-h-56 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                    tabIndex={-1}
                    role='listbox'
                  >
                    <li className='px-2 py-1'>
                      <input
                        type='text'
                        placeholder='Buscar país...'
                        value={countrySearch}
                        onChange={e => setCountrySearch(e.target.value)}
                        className='w-full px-2 py-1 border border-gray-200 rounded text-sm'
                        autoFocus
                      />
                    </li>
                    {COUNTRY_OPTIONS.filter(
                      c =>
                        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                        c.code.includes(countrySearch) ||
                        c.flag.includes(countrySearch)
                    ).map(country => (
                      <li
                        key={`${country.flag}-${country.code}-${country.name}`}
                        className={`text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary hover:text-white group
                          ${phone.region === country.code ? 'bg-primary text-white' : ''}`}
                        onClick={() => {
                          onChange('phones', idx, 'region', country.code)
                          setIsRegionDropdownOpen(null)
                          setCountrySearch('')
                        }}
                        role='option'
                        aria-selected={phone.region === country.code}
                      >
                        <div className='flex items-center'>
                          <span className='text-lg leading-none mr-2'>{country.flag}</span>
                          <span className='font-normal block truncate'>
                            {country.name} ({country.code})
                          </span>
                        </div>
                        {phone.region === country.code && (
                          <span className='text-white absolute inset-y-0 right-0 flex items-center pr-3 group-hover:text-white'>
                            <svg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type='tel'
                value={phone.number}
                onChange={e => onChange('phones', idx, 'number', e.target.value)}
                className='block w-full flex-grow px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'
                placeholder='Número'
                maxLength={15}
              />
              <select
                value={phone.type}
                onChange={e => onChange('phones', idx, 'type', e.target.value)}
                className={selectClass + ' max-w-[120px]'}
              >
                <option value='personal'>Personal</option>
                <option value='trabajo'>Trabajo</option>
                <option value='casa'>Casa</option>
                <option value='otro'>Otro</option>
              </select>
              {phones.length > 1 && (
                <button type='button' className='ml-2 text-red-500' onClick={() => onRemove && onRemove('phones', idx)}>
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </fieldset>
      {/* Correos */}
      <fieldset className='border border-gray-300 p-4 rounded-md'>
        <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
          Correos
          <button type='button' className='ml-2 text-primary' onClick={() => onAdd && onAdd('emails')}>
            + Agregar
          </button>
        </legend>
        <div className='space-y-3 mt-2'>
          {emails.map((email, idx) => (
            <div key={idx} className='flex items-center gap-2 relative'>
              <input
                type='email'
                value={email.address}
                onChange={e => onChange('emails', idx, 'address', e.target.value)}
                className={inputClass}
                placeholder='usuario@ejemplo.com'
                maxLength={60}
              />
              <select
                value={email.type}
                onChange={e => onChange('emails', idx, 'type', e.target.value)}
                className={selectClass + ' max-w-[120px]'}
              >
                <option value='personal'>Personal</option>
                <option value='trabajo'>Trabajo</option>
                <option value='otro'>Otro</option>
              </select>
              <input
                type='text'
                value={email.alias || ''}
                onChange={e => onChange('emails', idx, 'alias', e.target.value)}
                className={inputClass + ' max-w-[120px]'}
                placeholder='Alias'
                maxLength={30}
              />
              {emails.length > 1 && (
                <button type='button' className='ml-2 text-red-500' onClick={() => onRemove && onRemove('emails', idx)}>
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </fieldset>
      {/* Redes sociales */}
      <fieldset className='border border-gray-300 p-4 rounded-md'>
        <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
          Redes sociales
          <button type='button' className='ml-2 text-primary' onClick={() => onAdd && onAdd('socialNetworks')}>
            + Agregar
          </button>
        </legend>
        <div className='space-y-3 mt-2'>
          {socials.map((sn, idx) => (
            <div key={idx} className='flex items-center gap-2 relative'>
              <input
                type='text'
                value={sn.type}
                onChange={e => onChange('socialNetworks', idx, 'type', e.target.value)}
                className={inputClass + ' max-w-[120px]'}
                placeholder='Tipo (Ej: LinkedIn)'
                maxLength={20}
              />
              <input
                type='text'
                value={sn.username}
                onChange={e => onChange('socialNetworks', idx, 'username', e.target.value)}
                className={inputClass}
                placeholder='Usuario o enlace'
                maxLength={60}
              />
              {socials.length > 1 && (
                <button
                  type='button'
                  className='ml-2 text-red-500'
                  onClick={() => onRemove && onRemove('socialNetworks', idx)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default EditComunicacionForm
