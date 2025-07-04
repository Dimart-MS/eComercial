'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { requiredString, zipCode as zipCodeValidation } from '@/utils/validators'
import type { UserAddress } from '@/types/user'

const estadosMexico = ['Aguascalientes', 'Baja California', '...', 'Zacatecas']
const paises = ['México', 'Estados Unidos', 'Canadá', '...', 'Brasil']

interface EditUbicacionFormProps {
  data: UserAddress[]
  onChange: (addresses: UserAddress[]) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

const inputClass = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'
const errorTextClass = 'text-red-500 text-xs mt-1'

const EditUbicacionForm: React.FC<EditUbicacionFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const [errors, setErrors] = useState<any[]>([]);

  const validateField = (index: number, field: keyof UserAddress, value: any) => {
    let schema: z.ZodSchema<any> | null = null;
    if (field === 'zipCode') {
      schema = zipCodeValidation();
    } else if (['street', 'extNum', 'neighborhood', 'municipality', 'city', 'state', 'country'].includes(field)) {
      schema = requiredString(field.charAt(0).toUpperCase() + field.slice(1));
    }

    if (!schema) return;

    const result = schema.safeParse(value);
    setErrors(prev => {
      const newErrors = [...prev];
      if (!newErrors[index]) newErrors[index] = {};
      if (result.success) {
        delete newErrors[index][field];
      } else {
        newErrors[index][field] = result.error.errors[0].message;
      }
      return newErrors;
    });
  };

  const handleFieldChange = (idx: number, field: keyof UserAddress, value: string) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
    validateField(idx, field, value);
  };

  return (
    <div className='space-y-3'>
      {data.map((address, idx) => (
        <fieldset key={idx} className='border border-gray-300 p-4 rounded-md relative'>
          {data.length > 1 && <button type='button' className='absolute top-2 right-2 text-red-500 font-bold' onClick={() => onRemove(idx)}>×</button>}
          <legend className='text-sm font-medium text-gray-700 px-1'>Ubicación {idx + 1}</legend>
          
          {Object.keys(address).map(field => {
            const key = field as keyof UserAddress;
            if (key === 'intNum') return null; // Omitir No. Int. por ahora

            return (
              <div key={key} className="my-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type='text'
                  value={address[key] ?? ''}
                  onChange={e => handleFieldChange(idx, key, e.target.value)}
                  className={`${inputClass} ${errors[idx]?.[key] ? 'border-red-500' : ''}`}
                />
                {errors[idx]?.[key] && <p className={errorTextClass}>{errors[idx][key]}</p>}
              </div>
            )
          })}

        </fieldset>
      ))}
      <button type='button' className='mt-3 text-sm text-primary' onClick={onAdd}>+ Agregar Dirección</button>
    </div>
  )
}

export default EditUbicacionForm