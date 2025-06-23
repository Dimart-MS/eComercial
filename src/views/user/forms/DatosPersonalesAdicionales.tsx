import React from 'react'

import type { UserPersonalInfo } from '@/types/user'

interface EditDatosPersonalesFormProps {
  data: UserPersonalInfo
  onChange: (field: keyof UserPersonalInfo, value: string) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'

const selectClass = `${inputClass} appearance-none`

const EditDatosPersonalesForm: React.FC<EditDatosPersonalesFormProps> = ({ data, onChange }) => {
  return (
    <div className='space-y-4'>
      <div className='max-w-xs'>
        <label htmlFor='gender' className='block text-sm font-medium text-gray-700 mb-1'>
          Género
        </label>
        <div className='relative'>
          <select
            id='gender'
            value={data.gender ?? ''}
            onChange={e => onChange('gender', e.target.value)}
            className={selectClass}
          >
            <option value=''>Seleccionar...</option>
            <option value='hombre'>Hombre</option>
            <option value='mujer'>Mujer</option>
            <option value='otro'>Otro</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>
      <div className='max-w-xs'>
        <label htmlFor='birthDate' className='block text-sm font-medium text-gray-700 mb-1'>
          Fecha de Nacimiento
        </label>
        <input
          type='date'
          id='birthDate'
          value={data.birthDate || ''}
          onChange={e => onChange('birthDate', e.target.value)}
          className={inputClass}
        />
      </div>
      <div className='max-w-md'>
        <label htmlFor='profession' className='block text-sm font-medium text-gray-700 mb-1'>
          Profesión
        </label>
        <input
          type='text'
          id='profession'
          value={data.profession || ''}
          onChange={e => onChange('profession', e.target.value)}
          className={inputClass}
          placeholder='Profesión'
        />
      </div>
      <div className='max-w-sm'>
        <label htmlFor='education' className='block text-sm font-medium text-gray-700 mb-1'>
          Escolaridad
        </label>
        <div className='relative'>
          <select
            id='education'
            value={data.education || ''}
            onChange={e => onChange('education', e.target.value)}
            className={selectClass}
          >
            <option value=''>Seleccionar...</option>
            <option value='primaria'>Primaria</option>
            <option value='secundaria'>Secundaria</option>
            <option value='bachillerato'>Bachillerato</option>
            <option value='licenciatura'>Licenciatura</option>
            <option value='posgrado'>Posgrado</option>
            <option value='otro'>Otro</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>
      <div className='max-w-sm'>
        <label htmlFor='maritalStatus' className='block text-sm font-medium text-gray-700 mb-1'>
          Estado Civil
        </label>
        <div className='relative'>
          <select
            id='maritalStatus'
            value={data.maritalStatus || ''}
            onChange={e => onChange('maritalStatus', e.target.value)}
            className={selectClass}
          >
            <option value=''>Seleccionar...</option>
            <option value='soltero(a)'>Soltero(a)</option>
            <option value='casado(a)'>Casado(a)</option>
            <option value='divorciado(a)'>Divorciado(a)</option>
            <option value='viudo(a)'>Viudo(a)</option>
            <option value='otro'>Otro</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDatosPersonalesForm
