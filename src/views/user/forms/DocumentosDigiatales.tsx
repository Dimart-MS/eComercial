import React, { useRef } from 'react'

import type { UserDocument } from '@/types/user'

interface EditDocumentosFormProps {
  data: UserDocument[]
  onChange: (docs: UserDocument[]) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

const inputClass =
  'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900'

const EditDocumentosForm: React.FC<EditDocumentosFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0]

    if (!file) return
    const reader = new FileReader()

    reader.onload = ev => {
      const url = ev.target?.result as string
      const updated = [...data]

      updated[idx] = {
        ...updated[idx],
        fileName: file.name,
        fileType: file.type,
        url,
        uploadedAt: new Date().toISOString()
      }
      onChange(updated)
    }

    reader.readAsDataURL(file)
  }

  const handleFieldChange = (idx: number, field: keyof UserDocument, value: string) => {
    const updated = [...data]

    updated[idx] = { ...updated[idx], [field]: value }
    onChange(updated)
  }

  return (
    <div className='space-y-6'>
      {data.map((doc, idx) => (
        <div key={idx} className='border p-3 rounded-md mb-2 relative'>
          <button type='button' className='absolute top-2 right-2 text-red-500' onClick={() => onRemove(idx)}>
            ×
          </button>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Archivo</label>
            <input
              type='file'
              accept='.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx'
              className={inputClass}
              ref={fileInputRef}
              onChange={e => handleFileChange(e, idx)}
            />
          </div>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Nombre del archivo</label>
            <input
              type='text'
              value={doc.fileName}
              onChange={e => handleFieldChange(idx, 'fileName', e.target.value)}
              className={inputClass}
              placeholder='Nombre personalizado'
              maxLength={60}
            />
          </div>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Tipo de archivo</label>
            <select
              value={doc.fileType}
              onChange={e => handleFieldChange(idx, 'fileType', e.target.value)}
              className={inputClass}
            >
              <option value=''>Seleccionar...</option>
              <option value='application/pdf'>PDF</option>
              <option value='image/jpeg'>Imagen JPG</option>
              <option value='image/png'>Imagen PNG</option>
              <option value='application/msword'>Word</option>
              <option value='application/vnd.ms-excel'>Excel</option>
              <option value='otro'>Otro</option>
            </select>
          </div>
          <div className='mb-2'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Observaciones</label>
            <textarea
              value={doc.observation || ''}
              onChange={e => handleFieldChange(idx, 'observation', e.target.value)}
              className={inputClass}
              placeholder='Ejemplo: Cuenta con 2 meses adicionales por promoción'
              maxLength={200}
            />
          </div>
        </div>
      ))}
      <button type='button' className='bg-primary text-white px-3 py-1 rounded' onClick={onAdd}>
        + Agregar documento
      </button>
    </div>
  )
}

export default EditDocumentosForm
