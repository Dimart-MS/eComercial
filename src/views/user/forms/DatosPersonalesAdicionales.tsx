'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { requiredString } from '@/utils/validators'

import type { UserPersonalInfo } from '@/types/user'

interface EditDatosPersonalesFormProps {
  data: UserPersonalInfo
  onChange: (field: keyof UserPersonalInfo, value: string) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'
const errorTextClass = 'text-red-500 text-xs mt-1'

const EditDatosPersonalesForm: React.FC<EditDatosPersonalesFormProps> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<any>({});

  const validateField = (field: string, value: any) => {
    let validationSchema: z.ZodSchema<any> | null = null;

    switch (field) {
      case 'gender':
        validationSchema = requiredString('El género');
        break;
      case 'birthDate':
        validationSchema = requiredString('La fecha de nacimiento');
        break;
      case 'profession':
        validationSchema = requiredString('La profesión');
        break;
      default:
        break;
    }

    if (!validationSchema) return;

    const result = validationSchema.safeParse(value);
    setErrors((prev: any) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.errors[0].message
    }));
  };

  const handleInputChange = (field: keyof UserPersonalInfo, value: string) => {
    onChange(field, value);
    validateField(field, value);
  };

  return (
    <div className='space-y-4'>
      <div className='max-w-xs'>
        <label htmlFor='gender' className='block text-sm font-medium text-gray-700 mb-1'>
          Género
        </label>
        <select
          id='gender'
          value={data.gender ?? ''}
          onChange={e => handleInputChange('gender', e.target.value)}
          className={`${inputClass} appearance-none ${errors.gender ? 'border-red-500' : ''}`}
        >
          <option value=''>Seleccionar...</option>
          <option value='hombre'>Hombre</option>
          <option value='mujer'>Mujer</option>
          <option value='otro'>Otro</option>
        </select>
        {errors.gender && <p className={errorTextClass}>{errors.gender}</p>}
      </div>
      <div className='max-w-xs'>
        <label htmlFor='birthDate' className='block text-sm font-medium text-gray-700 mb-1'>
          Fecha de Nacimiento
        </label>
        <input
          type='date'
          id='birthDate'
          value={data.birthDate || ''}
          onChange={e => handleInputChange('birthDate', e.target.value)}
          className={`${inputClass} ${errors.birthDate ? 'border-red-500' : ''}`}
        />
        {errors.birthDate && <p className={errorTextClass}>{errors.birthDate}</p>}
      </div>
      <div className='max-w-md'>
        <label htmlFor='profession' className='block text-sm font-medium text-gray-700 mb-1'>
          Profesión
        </label>
        <input
          type='text'
          id='profession'
          value={data.profession || ''}
          onChange={e => handleInputChange('profession', e.target.value)}
          className={`${inputClass} ${errors.profession ? 'border-red-500' : ''}`}
          placeholder='Profesión'
        />
        {errors.profession && <p className={errorTextClass}>{errors.profession}</p>}
      </div>
      {/* ... resto de los campos sin validación ... */}
    </div>
  )
}

export default EditDatosPersonalesForm