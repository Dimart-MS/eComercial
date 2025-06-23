import React from 'react'

import type { UserSettings } from '@/types/user'

interface EditConfiguracionFormData {
  status: string // string para el select, se puede castear a UserStatus
  settings: UserSettings
}

interface EditConfiguracionFormProps {
  data: EditConfiguracionFormData
  onChange: (field: 'status' | keyof UserSettings, value: string | boolean) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'

const selectClass = `${inputClass} appearance-none`

const EditConfiguracionForm: React.FC<EditConfiguracionFormProps> = ({ data, onChange }) => {
  return (
    <div className='space-y-4'>
      <div className='max-w-sm'>
        <label htmlFor='status' className='block text-sm font-medium text-gray-700 mb-1'>
          Estado del Contacto
        </label>
        <div className='relative'>
          <select
            id='status'
            value={data.status ?? ''}
            onChange={e => onChange('status', e.target.value)}
            className={selectClass}
          >
            <option value='activo'>Habilitado (Activo)</option>
            <option value='inactivo'>Inhabilitado (Inactivo)</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>
      <div className='max-w-md'>
        <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>
          Categoría
        </label>
        <input
          type='text'
          id='category'
          value={data.settings.category ?? ''}
          onChange={e => onChange('category', e.target.value)}
          className={inputClass}
          placeholder='Ej: VIP, Cliente Regular'
          autoComplete='off'
        />
      </div>
      <div className='flex items-center'>
        <input
          id='marketingCampaign'
          name='marketingCampaign'
          type='checkbox'
          checked={!!data.settings.marketingCampaign}
          onChange={e => onChange('marketingCampaign', e.target.checked)}
          className='h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary'
        />
        <label htmlFor='marketingCampaign' className='ml-2 block text-sm text-gray-900'>
          Activar Campaña MKT
        </label>
      </div>
    </div>
  )
}

export default EditConfiguracionForm
