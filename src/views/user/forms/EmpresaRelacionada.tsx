'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { requiredString } from '@/utils/validators'

import type { RelatedCompany } from '@/types/user'

interface EditEmpresaRelacionadaFormProps {
  data: RelatedCompany[]
  onChange: (companies: RelatedCompany[]) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'
const errorTextClass = 'text-red-500 text-xs mt-1'

const EditEmpresaRelacionadaForm: React.FC<EditEmpresaRelacionadaFormProps> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<any[]>([]);

  const validateField = (index: number, field: string, value: any) => {
    const validationSchema = requiredString(`El campo`);
    const result = validationSchema.safeParse(value);

    setErrors(prevErrors => {
      const newErrors = [...prevErrors];
      if (!newErrors[index]) newErrors[index] = {};

      if (result.success) {
        delete newErrors[index][field];
      } else {
        newErrors[index][field] = result.error.errors[0].message;
      }
      return newErrors;
    });
  };

  const handleFieldChange = (idx: number, field: keyof RelatedCompany, value: string) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
    validateField(idx, field, value);
  };

  const handleAdd = () => {
    onChange([...data, { companyName: '', position: '' }]);
  };

  const handleRemove = (idx: number) => {
    const updated = [...data];
    updated.splice(idx, 1);
    onChange(updated);

    const newErrors = [...errors];
    newErrors.splice(idx, 1);
    setErrors(newErrors);
  };

  return (
    <div className='space-y-6'>
      {data.map((company, idx) => (
        <div key={idx} className='border p-3 rounded-md mb-2 relative'>
          <button type='button' className='absolute top-2 right-2 text-red-500 font-bold' onClick={() => handleRemove(idx)}>
            ×
          </button>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Nombre de la empresa</label>
            <input
              type='text'
              value={company.companyName}
              onChange={e => handleFieldChange(idx, 'companyName', e.target.value)}
              className={`${inputClass} ${errors[idx]?.companyName ? 'border-red-500' : ''}`}
              placeholder='Ej: Sistemas integrales en Tecnologias de Información y Consultoría León, S.C.'
            />
            {errors[idx]?.companyName && <p className={errorTextClass}>{errors[idx].companyName}</p>}
          </div>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Puesto/Cargo</label>
            <input
              type='text'
              value={company.position}
              onChange={e => handleFieldChange(idx, 'position', e.target.value)}
              className={`${inputClass} ${errors[idx]?.position ? 'border-red-500' : ''}`}
              placeholder='Ej: Gerente General'
            />
            {errors[idx]?.position && <p className={errorTextClass}>{errors[idx].position}</p>}
          </div>
        </div>
      ))}
      <button type='button' className='text-sm text-primary' onClick={handleAdd}>
        + Agregar empresa
      </button>
    </div>
  )
}

export default EditEmpresaRelacionadaForm