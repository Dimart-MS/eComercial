/**
 * FORMULARIO DE COMUNICACIÓN - eComercial
 * 
 * Formulario dinámico para gestión de información de comunicación de contactos.
 * Permite agregar, editar y eliminar teléfonos, emails y redes sociales.
 * 
 * CARACTERÍSTICAS:
 * - Campos dinámicos con agregar/eliminar
 * - Validación en tiempo real con Zod
 * - Dropdown de países con búsqueda
 * - Manejo de estados de error por campo
 * - Preparado para integración con API
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'

import type { z } from 'zod'

import { email as emailValidation, phone as phoneValidation, username as usernameValidation } from '@/utils/validators'
import { ChevronDownIcon } from '@/components/icons'
import type { UserContacts, PhoneContact, EmailContact, SocialNetwork } from '@/types/user'

/**
 * Lista de países con códigos de región y banderas.
 */
const COUNTRY_OPTIONS = [
  { name: 'México', code: '+52', flag: '🇲🇽' },
  { name: 'Estados Unidos', code: '+1', flag: '🇺🇸' },
  { name: 'Canadá', code: '+1', flag: '🇨🇦' },
  { name: 'España', code: '+34', flag: '🇪🇸' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴' }

  // ... (la lista completa original está aquí)
]

/**
 * Propiedades del componente
 */
interface EditComunicacionFormProps {
  data: UserContacts & { socialNetworks?: SocialNetwork[] }
  onChange: (type: 'phones' | 'emails' | 'socialNetworks', index: number, field: any, value: string) => void
  onAdd?: (type: 'phones' | 'emails' | 'socialNetworks') => void
  onRemove?: (type: 'phones' | 'emails' | 'socialNetworks', index: number) => void
}

/**
 * Estilos CSS reutilizables
 */
const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'
const selectClass = `${inputClass} appearance-none`
const errorTextClass = 'text-red-500 text-xs mt-1'

/**
 * Formulario dinámico para gestión de información de comunicación.
 */
const EditComunicacionForm: React.FC<EditComunicacionFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  // Estados para manejo de errores y UI
  const [errors, setErrors] = useState<any>({ phones: [], emails: [], socialNetworks: [] })
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<number | null>(null)
  const [countrySearch, setCountrySearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  /**
   * Maneja el cierre del dropdown de países cuando se hace click fuera.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRegionDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * Valida campos específicos usando esquemas Zod y actualiza errores.
   */
  const validateField = (type: string, index: number, field: string, value: any) => {
    let schema: z.ZodSchema<any> | null = null

    if (type === 'emails' && field === 'address') schema = emailValidation()
    if (type === 'phones' && field === 'number') schema = phoneValidation()
    if (type === 'socialNetworks' && field === 'username') schema = usernameValidation()

    if (!schema) return

    const result = schema.safeParse(value)

    setErrors((prev: any) => {
      const newErrorsForType = [...(prev[type] || [])]

      if (!newErrorsForType[index]) newErrorsForType[index] = {}

      if (result.success) {
        delete newErrorsForType[index][field]
      } else {
        newErrorsForType[index][field] = result.error.errors[0].message
      }

      return { ...prev, [type]: newErrorsForType }
    })
  }

  /**
   * Maneja los cambios en los campos del formulario.
   */
  const handleInputChange = (type: any, index: number, field: any, value: string) => {
    onChange(type, index, field, value)
    validateField(type, index, field, value)
  }

  return (
    <div className='space-y-6'>
      {/* SECCIÓN: TELÉFONOS */}
      <fieldset className='border border-gray-300 p-4 rounded-md'>
        <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
          Teléfono
          <button type='button' className='ml-2 text-primary' onClick={() => onAdd && onAdd('phones')}>
            + Agregar
          </button>
        </legend>
        <div className='space-y-3 mt-2'>
          {data.phones?.map((phone, idx) => (
            <div key={idx}>
              <div className='flex items-stretch gap-2 relative'>
                {/* Dropdown de país con búsqueda */}
                <div className='relative' ref={dropdownRef}>
                  <button
                    type='button'
                    className='flex items-center justify-center h-full px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50'
                    onClick={() => setIsRegionDropdownOpen(isRegionDropdownOpen === idx ? null : idx)}
                  >
                    <span>{COUNTRY_OPTIONS.find(c => c.code === phone.region)?.flag || '🌐'}</span>
                    <ChevronDownIcon className='w-4 h-4 text-gray-600 ml-1.5' />
                  </button>
                  {isRegionDropdownOpen === idx && (
                    <ul className='absolute z-20 mt-1 w-max max-h-56 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg'>
                      <li>
                        <input
                          type='text'
                          placeholder='Buscar país...'
                          value={countrySearch}
                          onChange={e => setCountrySearch(e.target.value)}
                          className='w-full px-2 py-1 border-b'
                          autoFocus
                        />
                      </li>
                      {COUNTRY_OPTIONS.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).map(
                        country => (
                          <li
                            key={country.code}
                            onClick={() => {
                              handleInputChange('phones', idx, 'region', country.code)
                              setIsRegionDropdownOpen(null)
                              setCountrySearch('')
                            }}
                            className='px-3 py-2 cursor-pointer hover:bg-gray-100'
                          >
                            {country.flag} {country.name} ({country.code})
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
                {/* Campo de número de teléfono */}
                <input
                  type='tel'
                  value={phone.number}
                  onChange={e => handleInputChange('phones', idx, 'number', e.target.value)}
                  className={`${inputClass} flex-grow rounded-none ${errors.phones?.[idx]?.number ? 'border-red-500' : ''}`}
                  placeholder='Número'
                />
                {/* Selector de tipo de teléfono */}
                <select
                  value={phone.type}
                  onChange={e => handleInputChange('phones', idx, 'type', e.target.value)}
                  className={`${selectClass} rounded-l-none rounded-r-md max-w-[120px]`}
                >
                  <option value='personal'>Personal</option>
                  <option value='trabajo'>Trabajo</option>
                  <option value='casa'>Casa</option>
                  <option value='otro'>Otro</option>
                </select>
                {/* Botón eliminar (solo si hay más de un teléfono) */}
                {data.phones.length > 1 && (
                  <button
                    type='button'
                    className='ml-2 text-red-500 font-bold'
                    onClick={() => onRemove && onRemove('phones', idx)}
                  >
                    ×
                  </button>
                )}
              </div>
              {/* Mensaje de error para el campo */}
              {errors.phones?.[idx]?.number && <p className={errorTextClass}>{errors.phones[idx].number}</p>}
            </div>
          ))}
        </div>
      </fieldset>

      {/* SECCIÓN: CORREOS ELECTRÓNICOS */}
      <fieldset className='border border-gray-300 p-4 rounded-md'>
        <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
          Correos
          <button type='button' className='ml-2 text-primary' onClick={() => onAdd && onAdd('emails')}>
            + Agregar
          </button>
        </legend>
        <div className='space-y-3 mt-2'>
          {data.emails?.map((email, idx) => (
            <div key={idx}>
              <div className='flex items-center gap-2'>
                {/* Campo de dirección de email */}
                <input
                  type='email'
                  value={email.address}
                  onChange={e => handleInputChange('emails', idx, 'address', e.target.value)}
                  className={`${inputClass} ${errors.emails?.[idx]?.address ? 'border-red-500' : ''}`}
                  placeholder='usuario@ejemplo.com'
                />
                {/* Selector de tipo de email */}
                <select
                  value={email.type}
                  onChange={e => handleInputChange('emails', idx, 'type', e.target.value)}
                  className={`${selectClass} max-w-[120px]`}
                >
                  <option value='personal'>Personal</option>
                  <option value='trabajo'>Trabajo</option>
                  <option value='otro'>Otro</option>
                </select>
                {/* Campo de alias opcional */}
                <input
                  type='text'
                  value={email.alias || ''}
                  onChange={e => handleInputChange('emails', idx, 'alias', e.target.value)}
                  className={`${inputClass} max-w-[120px]`}
                  placeholder='Alias'
                />
                {/* Botón eliminar (solo si hay más de un email) */}
                {data.emails.length > 1 && (
                  <button
                    type='button'
                    className='ml-2 text-red-500 font-bold'
                    onClick={() => onRemove && onRemove('emails', idx)}
                  >
                    ×
                  </button>
                )}
              </div>
              {/* Mensaje de error para el campo */}
              {errors.emails?.[idx]?.address && <p className={errorTextClass}>{errors.emails[idx].address}</p>}
            </div>
          ))}
        </div>
      </fieldset>

      {/* SECCIÓN: REDES SOCIALES */}
      <fieldset className='border border-gray-300 p-4 rounded-md'>
        <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
          Redes sociales
          <button type='button' className='ml-2 text-primary' onClick={() => onAdd && onAdd('socialNetworks')}>
            + Agregar
          </button>
        </legend>
        <div className='space-y-3 mt-2'>
          {data.socialNetworks?.map((sn, idx) => (
            <div key={idx}>
              <div className='flex items-center gap-2'>
                {/* Campo de tipo de red social */}
                <input
                  type='text'
                  value={sn.type}
                  onChange={e => handleInputChange('socialNetworks', idx, 'type', e.target.value)}
                  className={`${inputClass} max-w-[120px]`}
                  placeholder='Tipo (Ej: LinkedIn)'
                />
                {/* Campo de username o enlace */}
                <input
                  type='text'
                  value={sn.username}
                  onChange={e => handleInputChange('socialNetworks', idx, 'username', e.target.value)}
                  className={`${inputClass} ${errors.socialNetworks?.[idx]?.username ? 'border-red-500' : ''}`}
                  placeholder='Usuario o enlace'
                />
                {/* Botón eliminar (solo si hay más de una red social) */}
                {data.socialNetworks && data.socialNetworks.length > 1 && (
                  <button
                    type='button'
                    className='ml-2 text-red-500 font-bold'
                    onClick={() => onRemove && onRemove('socialNetworks', idx)}
                  >
                    ×
                  </button>
                )}
              </div>
              {/* Mensaje de error para el campo */}
              {errors.socialNetworks?.[idx]?.username && (
                <p className={errorTextClass}>{errors.socialNetworks[idx].username}</p>
              )}
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default EditComunicacionForm
