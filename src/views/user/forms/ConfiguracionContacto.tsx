'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { requiredString } from '@/utils/validators'

import type { UserSettings } from '@/types/user'

interface EditConfiguracionFormData {
  status: string
  settings: UserSettings
}

interface EditConfiguracionFormProps {
  data: EditConfiguracionFormData
  onChange: (field: 'status' | keyof UserSettings, value: string | boolean) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'
const errorTextClass = 'text-red-500 text-xs mt-1'

const EditConfiguracionForm: React.FC<EditConfiguracionFormProps> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<any>({});

  const validateField = (field: string, value: any) => {
    let validationSchema: z.ZodSchema<any> | null = null;

    if (field === 'category') {
      validationSchema = requiredString('La categoría');
    }

    if (!validationSchema) return;

    const result = validationSchema.safeParse(value);
    setErrors((prev: any) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.errors[0].message
    }));
  };

  const handleInputChange = (field: keyof UserSettings, value: string | boolean) => {
    onChange(field, value);
    validateField(field, value);
  };

  return (
    <div className='space-y-4'>
      <div className='max-w-sm'>
        <label htmlFor='status' className='block text-sm font-medium text-gray-700 mb-1'>
          Estado del Contacto
        </label>
        <select
          id='status'
          value={data.status ?? ''}
          onChange={e => onChange('status', e.target.value)}
          className={`${inputClass} appearance-none`}
        >
          <option value='activo'>Habilitado (Activo)</option>
          <option value='inactivo'>Inhabilitado (Inactivo)</option>
        </select>
      </div>
      <div className='max-w-md'>
        <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>
          Categoría
        </label>
        <input
          type='text'
          id='category'
          value={data.settings.category ?? ''}
          onChange={e => handleInputChange('category', e.target.value)}
          className={`${inputClass} ${errors.category ? 'border-red-500' : ''}`}
          placeholder='Ej: VIP, Cliente Regular'
          autoComplete='off'
        />
        {errors.category && <p className={errorTextClass}>{errors.category}</p>}
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