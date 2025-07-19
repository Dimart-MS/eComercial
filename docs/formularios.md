# Documentación de Formularios y Validaciones

## 📋 Sistema de Validación Unificado

### Propósito
El sistema de validación centralizado en `src/utils/validators.ts` proporciona validaciones consistentes y reutilizables para toda la aplicación, siguiendo el principio DRY (Don't Repeat Yourself).

### Arquitectura de Validación

```
┌─────────────────────────────────────┐
│        PATRONES REGEX               │
│  (REGEX_PATTERNS)                   │
├─────────────────────────────────────┤
│     VALIDADORES ATÓMICOS            │
│  (requiredString, email, phone)     │
├─────────────────────────────────────┤
│     ESQUEMAS COMPUESTOS             │
│  (addressSchema, documentSchema)    │
├─────────────────────────────────────┤
│   ESQUEMAS DE FORMULARIOS           │
│  (registrationSchema, loginSchema)  │
└─────────────────────────────────────┘
```

## 🔍 Patrones de Validación

### Expresiones Regulares Base

```typescript
export const REGEX_PATTERNS = {
  // Contraseñas
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_DIGIT: /[0-9]/,
  PASSWORD_SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>_\-\[\]=+;'/`~]/,
  
  // Campos básicos
  ONLY_NUMBERS: /^[0-9]+$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  ZIP_CODE: /^[0-9]{5,6}$/,
  USERNAME: /^[a-zA-Z0-9_.-]+$/,
  EMAIL: /^[^\s@\d][^\s@]*@[^\s@]+\.[^\s@]+$/
}
```

### Validadores Atómicos

#### Campos de Texto
```typescript
// Campo requerido básico
export const requiredString = (fieldName = 'Este campo') =>
  z.string().trim().min(1, { message: `${fieldName} es requerido.` })

// Campo opcional
export const optionalString = (maxLength = 100, fieldName = 'Campo') =>
  z.string().trim().max(maxLength, { message: `Máximo ${maxLength} caracteres.` }).optional()
```

#### Validaciones Especializadas
```typescript
// Email con formato estándar
export const email = (fieldName = 'Email') =>
  requiredString(fieldName)
    .email({ message: 'Formato de email inválido.' })
    .refine(val => REGEX_PATTERNS.EMAIL.test(val), { 
      message: 'Formato de email inválido.' 
    })

// Teléfono internacional (10-15 dígitos)
export const phone = (fieldName = 'Teléfono') =>
  requiredString(fieldName)
    .regex(REGEX_PATTERNS.ONLY_NUMBERS, { message: 'Solo números.' })
    .min(10, { message: 'Mínimo 10 dígitos.' })
    .max(15, { message: 'Máximo 15 dígitos.' })

// Nombres con caracteres acentuados
export const name = (fieldName = 'Nombre') =>
  requiredString(fieldName)
    .min(2, { message: 'Mínimo 2 caracteres.' })
    .max(60, { message: 'Máximo 60 caracteres.' })
    .regex(REGEX_PATTERNS.ONLY_LETTERS, { message: 'Solo letras y espacios.' })
```

## 📝 Formularios Principales

### 1. Formulario de Registro (`src/views/Register.tsx`)

#### Campos Incluidos
- **username**: string (3-30 caracteres, alfanumérico)
- **email**: string (formato email estándar)
- **password**: string (8+ caracteres, mayúscula, minúscula, número, especial)
- **confirmPassword**: string (debe coincidir con password)
- **agreeTerms**: boolean (debe ser true)

#### Validaciones Específicas
```typescript
export const registrationSchema = z
  .object({
    username: username(),
    email: email(),
    password: password(),
    confirmPassword: requiredString('Confirmar contraseña'),
    agreeTerms: z.boolean().refine(value => value === true, { 
      message: 'Debes aceptar los términos y condiciones.' 
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword']
  })
```

#### Flujo de Navegación
- **Acceso**: `/register`
- **Validación**: En tiempo real con Zod
- **Envío**: POST a `/api/auth/register`
- **Redirección**: `/login` en éxito, error en formulario

### 2. Formulario de Login (`src/views/Login.tsx`)

#### Campos Incluidos
- **emailOrUsername**: string (email o username válido)
- **password**: string (requerido)
- **rememberMe**: boolean (opcional)

#### Validaciones Específicas
```typescript
export const loginSchema = z.object({
  emailOrUsername: emailOrUsername('Email o usuario'),
  password: requiredString('Contraseña'),
  rememberMe: z.boolean().optional()
})
```

#### Flujo de Navegación
- **Acceso**: `/login`
- **Validación**: En tiempo real
- **Envío**: POST a `/api/auth/login`
- **Redirección**: `/panel` en éxito, error en formulario

### 3. Formulario de Comunicación (`src/views/user/forms/Comunicacion.tsx`)

#### Campos Incluidos
- **phones**: Array de objetos con region, number, type
- **emails**: Array de objetos con address, type
- **socialNetworks**: Array de objetos con platform, username

#### Validaciones Específicas
```typescript
// Validación de teléfonos
const phoneValidation = (value: string) => {
  const schema = phone('Teléfono')
  return schema.safeParse(value)
}

// Validación de emails
const emailValidation = (value: string) => {
  const schema = email('Email')
  return schema.safeParse(value)
}
```

#### Características Especiales
- **Campos dinámicos**: Agregar/eliminar teléfonos y emails
- **Dropdown de países**: Con códigos de región
- **Validación en tiempo real**: Por campo individual
- **Estados de error**: Independientes por campo

### 4. Formulario de Ubicación (`src/views/user/forms/Ubicacion.tsx`)

#### Campos Incluidos
- **street**: string (requerido)
- **extNum**: string (requerido, solo números)
- **intNum**: string (opcional)
- **zipCode**: string (5-6 dígitos)
- **neighborhood**: string (requerido)
- **municipality**: string (requerido)
- **city**: string (requerido)
- **state**: string (requerido)
- **country**: string (requerido)

#### Validaciones Específicas
```typescript
export const addressSchema = z.object({
  street: requiredString('Calle'),
  extNum: requiredString('No. Ext.').regex(REGEX_PATTERNS.ONLY_NUMBERS, { 
    message: 'Solo números.' 
  }),
  intNum: optionalString(),
  zipCode: zipCode(),
  neighborhood: requiredString('Colonia'),
  municipality: requiredString('Municipio'),
  city: requiredString('Ciudad'),
  state: requiredString('Estado'),
  country: requiredString('País')
})
```

## 🔧 Implementación de Validaciones

### Uso en Componentes

#### 1. Importar Validadores
```typescript
import { 
  email, 
  phone, 
  requiredString,
  registrationSchema 
} from '@/utils/validators'
```

#### 2. Validación en Tiempo Real
```typescript
const validateField = (field: string, value: any) => {
  let validationSchema: z.ZodSchema<any> | null = null

  switch (field) {
    case 'email':
      validationSchema = email()
      break
    case 'phone':
      validationSchema = phone()
      break
    default:
      break
  }

  if (!validationSchema) return

  const result = validationSchema.safeParse(value)
  setErrors((prev: any) => ({
    ...prev,
    [field]: result.success ? undefined : result.error.errors[0].message
  }))
}
```

#### 3. Validación de Formulario Completo
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const {
  control,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(registrationSchema),
  mode: 'onChange'
})
```

## 📊 Mensajes de Error

### Estructura de Mensajes

```typescript
export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido.',
  INVALID_EMAIL: 'Formato de email inválido.',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden.',
  INVALID_PHONE: 'Formato de teléfono inválido.',
  INVALID_ZIP_CODE: 'Código postal inválido.',
  TERMS_REQUIRED: 'Debes aceptar los términos y condiciones.'
} as const
```

### Personalización de Mensajes

```typescript
// Mensaje personalizado por campo
export const requiredString = (fieldName = 'Este campo') =>
  z.string().trim().min(1, { 
    message: `${fieldName} es requerido.` 
  })

// Mensaje con contexto
export const password = (fieldName = 'Contraseña') =>
  requiredString(fieldName)
    .min(8, { message: 'Debe tener al menos 8 caracteres.' })
    .regex(REGEX_PATTERNS.PASSWORD_UPPERCASE, { 
      message: 'Debe contener al menos una mayúscula (A-Z).' 
    })
```

## 🎯 Casos de Uso Específicos

### Validación de Contraseñas

```typescript
// Política de contraseñas
export const password = (fieldName = 'Contraseña') =>
  requiredString(fieldName)
    .min(8, { message: 'Debe tener al menos 8 caracteres.' })
    .regex(REGEX_PATTERNS.PASSWORD_UPPERCASE, { 
      message: 'Debe contener al menos una mayúscula (A-Z).' 
    })
    .regex(REGEX_PATTERNS.PASSWORD_LOWERCASE, { 
      message: 'Debe contener al menos una minúscula (a-z).' 
    })
    .regex(REGEX_PATTERNS.PASSWORD_DIGIT, { 
      message: 'Debe contener al menos un número (0-9).' 
    })
    .regex(REGEX_PATTERNS.PASSWORD_SPECIAL_CHAR, { 
      message: 'Debe contener al menos un carácter especial (!@#...).' 
    })
```

### Validación de Documentos

```typescript
export const documentSchema = z.object({
  fileName: requiredString('Nombre del archivo').max(60, { 
    message: 'Máximo 60 caracteres.' 
  }),
  fileType: requiredString('Tipo de archivo').regex(REGEX_PATTERNS.FILE_TYPE, {
    message: 'Tipo de archivo no permitido.'
  }),
  url: requiredString('Archivo'),
  observation: optionalString(200, 'Observaciones'),
  uploadedAt: date('Fecha de carga')
})
```

### Validaciones Cruzadas

```typescript
// Validación de confirmación de contraseña
.refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword']
})

// Validación de email o username
export const emailOrUsername = (fieldName = 'Email o usuario') =>
  z.union([email(fieldName), username(fieldName)])
    .refine(val => typeof val === 'string', { 
      message: `${fieldName} inválido.` 
    })
```

## 🚀 Mejores Prácticas

### 1. Reutilización de Validadores
- Usar validadores atómicos para construir esquemas complejos
- Mantener consistencia en mensajes de error
- Documentar patrones regex para mantenimiento

### 2. Validación en Tiempo Real
- Implementar validación `onChange` para mejor UX
- Mostrar errores inmediatamente al usuario
- Limpiar errores cuando el campo es válido

### 3. Manejo de Estados
- Separar estados de error por campo
- Usar estados de carga para operaciones asíncronas
- Implementar estados de éxito/error globales

### 4. Accesibilidad
- Asociar mensajes de error con campos usando `aria-describedby`
- Proporcionar feedback visual claro
- Mantener navegación por teclado

## 🔍 Testing de Validaciones

### Ejemplos de Tests

```typescript
// Test de validación de email
describe('email validation', () => {
  it('should accept valid email', () => {
    const result = email().safeParse('test@example.com')
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = email().safeParse('invalid-email')
    expect(result.success).toBe(false)
  })
})
```

### Casos de Prueba Recomendados

1. **Campos requeridos**: Valores vacíos, espacios en blanco
2. **Formatos específicos**: Emails, teléfonos, códigos postales
3. **Límites de longitud**: Mínimos y máximos
4. **Caracteres especiales**: Acentos, símbolos, números
5. **Validaciones cruzadas**: Confirmación de contraseñas
6. **Casos edge**: Valores límite, caracteres especiales

---

**Documentación generada por**: Equipo eComercial - SITIC León  
**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024 
