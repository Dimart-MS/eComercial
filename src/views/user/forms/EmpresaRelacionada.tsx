import React from 'react'

import type { RelatedCompany } from '@/types/user'

interface EditEmpresaRelacionadaFormProps {
  data: RelatedCompany[]
  onChange: (companies: RelatedCompany[]) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'

const EditEmpresaRelacionadaForm: React.FC<EditEmpresaRelacionadaFormProps> = ({ data, onChange }) => {
  const handleFieldChange = (idx: number, field: keyof RelatedCompany, value: string) => {
    const updated = [...data]

    updated[idx] = { ...updated[idx], [field]: value }
    onChange(updated)
  }

  const handleAdd = () => {
    onChange([...data, { companyName: '', position: '' }])
  }

  const handleRemove = (idx: number) => {
    const updated = [...data]

    updated.splice(idx, 1)
    onChange(updated)
  }

  return (
    <div className='space-y-6'>
      {data.map((company, idx) => (
        <div key={idx} className='border p-3 rounded-md mb-2 relative'>
          <button type='button' className='absolute top-2 right-2 text-red-500' onClick={() => handleRemove(idx)}>
            ×
          </button>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Nombre de la empresa</label>
            <input
              type='text'
              value={company.companyName}
              onChange={e => handleFieldChange(idx, 'companyName', e.target.value)}
              className={inputClass}
              placeholder='Ej: Sistemas integrales en Tecnologias de Información y Consultoría León, S.C.'
              maxLength={80}
            />
          </div>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Puesto/Cargo</label>
            <input
              type='text'
              value={company.position}
              onChange={e => handleFieldChange(idx, 'position', e.target.value)}
              className={inputClass}
              placeholder='Ej: Gerente General'
              maxLength={40}
            />
          </div>
        </div>
      ))}
      <button type='button' className='bg-primary text-white px-3 py-1 rounded' onClick={handleAdd}>
        + Agregar empresa
      </button>
    </div>
  )
}

export default EditEmpresaRelacionadaForm
