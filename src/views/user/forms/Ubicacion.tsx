import React from 'react'

import type { UserAddress } from '@/types/user'

const estadosMexico = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas'
]

const paises = ['México', 'Estados Unidos', 'Canadá', 'España', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Brasil']

interface EditUbicacionFormProps {
  data: UserAddress[]
  onChange: (addresses: UserAddress[]) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'

const smallInputClass =
  'block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-xs text-gray-900'

const selectClass = `${inputClass} appearance-none`

const EditUbicacionForm: React.FC<EditUbicacionFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const handleFieldChange = (idx: number, field: keyof UserAddress, value: string) => {
    const updated = [...data]

    updated[idx] = { ...updated[idx], [field]: value }
    onChange(updated)
  }

  return (
    <div className='space-y-3'>
      {data.map((address, idx) => (
        <fieldset key={idx} className='border border-gray-300 p-4 rounded-md relative'>
          {data.length > 1 && (
            <button
              type='button'
              className='absolute top-2 right-2 text-red-500'
              onClick={() => onRemove(idx)}
              title='Eliminar dirección'
            >
              ×
            </button>
          )}
          <legend className='text-sm font-medium text-gray-700 px-1 flex items-center'>
            Ubicación {data.length > 1 ? idx + 1 : ''}
          </legend>
          <div>
            <label htmlFor={`street-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
              Calle
            </label>
            <input
              type='text'
              id={`street-${idx}`}
              value={address.street ?? ''}
              onChange={e => handleFieldChange(idx, 'street', e.target.value)}
              className={inputClass}
              placeholder='Ej: Av. Reforma'
            />
          </div>
          <div className='grid grid-cols-5 gap-3'>
            <div className='col-span-2'>
              <label htmlFor={`extNum-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
                No. Ext.
              </label>
              <input
                type='text'
                id={`extNum-${idx}`}
                value={address.extNum ?? address.noExt ?? ''}
                onChange={e => handleFieldChange(idx, 'extNum', e.target.value)}
                className={smallInputClass}
                maxLength={6}
                placeholder='1234'
                inputMode='numeric'
                pattern='[0-9]*'
              />
            </div>
            <div className='col-span-2'>
              <label htmlFor={`intNum-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
                No. Int.
              </label>
              <input
                type='text'
                id={`intNum-${idx}`}
                value={address.intNum ?? address.noInt ?? ''}
                onChange={e => handleFieldChange(idx, 'intNum', e.target.value)}
                className={smallInputClass}
                maxLength={6}
                placeholder='Opcional'
                inputMode='numeric'
                pattern='[0-9]*'
              />
            </div>
            <div className='col-span-1'>
              <label htmlFor={`zipCode-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
                C.P.
              </label>
              <input
                type='text'
                id={`zipCode-${idx}`}
                value={address.zipCode ?? address.zip ?? ''}
                onChange={e => handleFieldChange(idx, 'zipCode', e.target.value)}
                className={smallInputClass}
                maxLength={6}
                placeholder='00000'
                inputMode='numeric'
                pattern='[0-9]*'
              />
            </div>
          </div>
          <div>
            <label htmlFor={`neighborhood-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
              Colonia
            </label>
            <input
              type='text'
              id={`neighborhood-${idx}`}
              value={address.neighborhood ?? address.colony ?? ''}
              onChange={e => handleFieldChange(idx, 'neighborhood', e.target.value)}
              className={inputClass}
              placeholder='Ej: Centro'
            />
          </div>
          <div>
            <label htmlFor={`municipality-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
              Municipio
            </label>
            <input
              type='text'
              id={`municipality-${idx}`}
              value={address.municipality ?? ''}
              onChange={e => handleFieldChange(idx, 'municipality', e.target.value)}
              className={inputClass}
              placeholder='Ej: Benito Juárez'
            />
          </div>
          <div className='max-w-md'>
            <label htmlFor={`city-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
              Ciudad
            </label>
            <input
              type='text'
              id={`city-${idx}`}
              value={address.city ?? ''}
              onChange={e => handleFieldChange(idx, 'city', e.target.value)}
              className={inputClass}
              placeholder='Ej: Ciudad de México'
            />
          </div>
          <div className='max-w-md'>
            <label htmlFor={`state-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
              Estado
            </label>
            <select
              id={`state-${idx}`}
              value={address.state ?? ''}
              onChange={e => handleFieldChange(idx, 'state', e.target.value)}
              className={selectClass}
            >
              <option value=''>Seleccionar...</option>
              {estadosMexico.map(estado => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
          <div className='max-w-md'>
            <label htmlFor={`country-${idx}`} className='block text-xs font-medium text-gray-600 mb-1'>
              País
            </label>
            <select
              id={`country-${idx}`}
              value={address.country ?? ''}
              onChange={e => handleFieldChange(idx, 'country', e.target.value)}
              className={selectClass}
            >
              <option value=''>Seleccionar...</option>
              {paises.map(pais => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      ))}
      <button type='button' className='bg-primary text-white px-3 py-1 rounded' onClick={onAdd}>
        + Agregar dirección
      </button>
    </div>
  )
}

export default EditUbicacionForm
