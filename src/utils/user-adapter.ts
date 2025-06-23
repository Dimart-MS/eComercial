import type { UserType, UserAddress, UserDocument, RelatedCompany } from '@/types/user'
import { UserRole, UserStatus } from '@/types/user'

/**
 * Transforma un objeto de usuario de la API a la estructura de UserType utilizada en la aplicación.
 * @param apiUser - El objeto de usuario tal como viene del JSON.
 * @returns El objeto de usuario adaptado a UserType.
 */
export const mapApiToUser = (apiUser: any): UserType => {
  return {
    id: apiUser.id,
    name: apiUser.name,
    lastName: apiUser.lastName,
    avatarUrl: apiUser.avatarSrc || `https://i.pravatar.cc/150?u=${apiUser.id}`, // Fallback avatar
    role: (apiUser.category as UserRole) || UserRole.Prospecto,
    status: apiUser.status === 'activo' ? UserStatus.Active : UserStatus.Inactive,

    // Mapeo de campos anidados con valores por defecto para evitar errores
    contacts: {
      emails: apiUser.contacts?.emails || [],
      phones: apiUser.contacts?.phones || []
    },
    personalInfo: {
      gender: apiUser.gender || 'No especificado',
      birthDate: apiUser.birthDate || 'N/A',
      profession: apiUser.profession || 'N/A',
      education: apiUser.education || 'N/A',
      maritalStatus: apiUser.maritalStatus || 'N/A'
    },
    settings: {
      category: apiUser.category || 'General',
      marketingCampaign: apiUser.marketingCampaign || false
    },
    addresses: (apiUser.addresses || []).map(
      (addr: any): UserAddress => ({
        street: addr.street,
        extNum: addr.noExt,
        intNum: addr.noInt,
        zipCode: addr.zip,
        neighborhood: addr.colony,
        municipality: addr.municipality,
        city: addr.city,
        state: addr.state,
        country: addr.country
      })
    ),
    profile: {
      influencesDecisions: apiUser.profile?.decisionInfluence === 'Sí',
      mainActivities: apiUser.profile?.activities || '',
      opportunityAreas: apiUser.profile?.opportunityAreas || '',
      recommendations: apiUser.profile?.recommendations || '',
      notes: apiUser.profile?.notes || ''
    },
    documents: (apiUser.documents || []).map(
      (doc: any): UserDocument => ({
        fileName: doc.fileName,
        fileType: doc.fileType,
        uploadedAt: doc.uploadedAt,
        observation: doc.note,
        url: doc.url || '#' // Placeholder URL
      })
    ),
    relatedCompanies: (apiUser.companies || []).map(
      (company: any): RelatedCompany => ({
        companyName: company.name || '',
        position: company.position || ''
      })
    ),

    // Campos de acceso rápido para la tabla
    email: apiUser.contacts?.emails?.[0]?.address || 'Sin correo',
    companyName: apiUser.companies?.[0]?.name || 'Sin empresa'
  }
}
