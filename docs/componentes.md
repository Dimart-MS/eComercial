# Documentación de Componentes Principales

## 📋 Sistema de Componentes

### Propósito
El sistema de componentes de eComercial está diseñado para ser modular, reutilizable y escalable, siguiendo principios de diseño atómico y composición.

### Arquitectura de Componentes

```
┌─────────────────────────────────────┐
│        COMPONENTES DE VISTA         │
│  (Views, Pages, Layouts)            │
├─────────────────────────────────────┤
│      COMPONENTES DE NEGOCIO         │
│  (Forms, Tables, Cards)             │
├─────────────────────────────────────┤
│      COMPONENTES DE PRESENTACIÓN    │
│  (UI Components, Icons)             │
├─────────────────────────────────────┤
│        COMPONENTES BASE             │
│  (Core Components, Utils)           │
└─────────────────────────────────────┘
```

## 🏗️ Componentes Principales

### 1. Tabla de Contactos (`src/views/user/Table.tsx`)

#### Propósito
Componente principal para la gestión y visualización de contactos comerciales con funcionalidades avanzadas de filtrado, ordenamiento y búsqueda.

#### Características
- **Carga de datos**: Desde JSON (preparado para API)
- **Filtros dinámicos**: Por tipo de contacto (Prospecto, Cliente, Proveedor, etc.)
- **Ordenamiento multi-columna**: Nombre, apellido, email, teléfono, empresa
- **Búsqueda global**: En tiempo real en nombre, apellido y email
- **Hover cards informativos**: Información detallada al hacer hover
- **Estados de carga y error**: Manejo robusto de estados
- **Navegación a detalles**: Click para ver información completa

#### Tipos de Datos
```typescript
type TableBodyRowType = {
  id: string
  avatarSrc?: string
  name: string
  lastName?: string
  username?: string
  email: string
  contacts?: {
    alias?: string
    phones?: Array<{
      region: string
      number: string
      type: string
    }>
    emails?: Array<{
      address: string
      type: string
    }>
  }
  companies?: Array<{
    name: string
    position?: string
  }>
  category?: string
  status: 'activo' | 'inactivo'
  profile?: {
    decisionInfluence?: string
    activities?: string
    opportunityAreas?: string
    recommendations?: string
    notes?: string
  }
}
```

#### Funcionalidades Principales

##### Sistema de Filtrado
```typescript
const filteredAndSortedRows = useMemo(() => {
  const result = rowsData.filter(row => {
    const matchesGlobal = !globalSearch || 
      row.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      (row.lastName || '').toLowerCase().includes(globalSearch.toLowerCase()) ||
      row.email.toLowerCase().includes(globalSearch.toLowerCase())

    const matchesType = !typeFilter || row.category === typeFilter
    const matchesStatus = !statusFilter || row.status === statusFilter

    return matchesGlobal && matchesType && matchesStatus
  })
  
  // Aplicar ordenamiento
  if (sortConfig.column && sortConfig.direction) {
    // Lógica de ordenamiento
  }
  
  return result
}, [rowsData, globalSearch, typeFilter, statusFilter, sortConfig])
```

##### Sistema de Ordenamiento
```typescript
const handleSort = (column: SortColumn) => {
  setSortConfig(prev => {
    if (prev.column === column) {
      if (prev.direction === 'asc') {
        return { column, direction: 'desc' }
      } else if (prev.direction === 'desc') {
        return { column: null, direction: null }
      }
    }
    return { column, direction: 'asc' }
  })
}
```

##### Hover Cards Informativos
```typescript
const UserHoverCard = ({ row, open, anchorEl }) => (
  <Popper
    open={open}
    anchorEl={anchorEl}
    placement='right-start'
    transition
    modifiers={[
      {
        name: 'offset',
        options: { offset: [0, 10] }
      }
    ]}
    sx={{ zIndex: 1300 }}
  >
    {/* Contenido del hover card */}
  </Popper>
)
```

#### Flujo de Navegación
- **Acceso**: `/panel/contactos`
- **Filtrado**: Pestañas por tipo de contacto
- **Búsqueda**: Campo de búsqueda global
- **Detalles**: Click en fila → `/panel/contactos/user/[id]`
- **Acciones**: Botones de importar, exportar, nuevo contacto

### 2. Formularios de Usuario (`src/views/user/forms/`)

#### Estructura de Formularios

##### Comunicación (`Comunicacion.tsx`)
- **Propósito**: Gestión de teléfonos, emails y redes sociales
- **Campos dinámicos**: Agregar/eliminar contactos
- **Validaciones**: Email, teléfono, username
- **Características**: Dropdown de países, validación en tiempo real

##### Datos Personales (`DatosPersonalesAdicionales.tsx`)
- **Propósito**: Información personal del contacto
- **Campos**: Género, fecha de nacimiento, profesión
- **Validaciones**: Campos requeridos, formatos específicos

##### Configuración (`ConfiguracionContacto.tsx`)
- **Propósito**: Configuración y categorización del contacto
- **Campos**: Categoría, preferencias, configuración
- **Validaciones**: Selección requerida

##### Ubicación (`Ubicacion.tsx`)
- **Propósito**: Gestión de direcciones múltiples
- **Campos**: Calle, números, código postal, ciudad, estado, país
- **Validaciones**: Código postal, números de casa
- **Características**: Múltiples direcciones, validación por dirección

##### Empresa Relacionada (`EmpresaRelacionada.tsx`)
- **Propósito**: Empresas asociadas al contacto
- **Campos**: Nombre de empresa, posición
- **Validaciones**: Campos requeridos
- **Características**: Múltiples empresas

##### Documentos (`DocumentosDigiatales.tsx`)
- **Propósito**: Gestión de documentos digitales
- **Campos**: Nombre, tipo, archivo, observaciones
- **Validaciones**: Tipos de archivo permitidos, tamaño
- **Características**: Upload de archivos, preview

#### Patrón de Implementación

```typescript
/**
 * FORMULARIO DE EJEMPLO - eComercial
 * 
 * Descripción del propósito del formulario
 * 
 * CAMPOS INCLUIDOS:
 * - campo1: string (requerido, 2-60 caracteres)
 * - campo2: email (formato estándar)
 * 
 * VALIDACIONES:
 * - Validación en tiempo real con Zod
 * - Mensajes de error personalizados
 * 
 * FLUJO DE NAVEGACIÓN:
 * - Acceso: /panel/contactos/user/[id]
 * - Conexión: Integra con API de backend
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

const EditFormComponent: React.FC<EditFormProps> = ({ data, onChange }) => {
  const [errors, setErrors] = useState<any>({})

  const validateField = (field: string, value: any) => {
    let validationSchema: z.ZodSchema<any> | null = null

    switch (field) {
      case 'campo1':
        validationSchema = requiredString('Campo 1')
        break
      case 'campo2':
        validationSchema = email('Email')
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

  const handleInputChange = (field: string, value: string) => {
    onChange(field, value)
    validateField(field, value)
  }

  return (
    <div className="space-y-4">
      {/* Campos del formulario */}
    </div>
  )
}
```

### 3. Sistema de Autenticación

#### Login (`src/views/Login.tsx`)

##### Características
- **Autenticación flexible**: Email o username
- **Validación en tiempo real**: Con Zod
- **Estados de carga**: Durante autenticación
- **Manejo de errores**: Mensajes específicos
- **Recordar sesión**: Checkbox opcional

##### Implementación
```typescript
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const onSubmit = async (data: LoginData) => {
    try {
      // Lógica de autenticación
      await signIn(data)
      router.push('/panel')
    } catch (error) {
      setError('root', { message: 'Credenciales inválidas' })
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campos del formulario */}
      </form>
    </AuthLayout>
  )
}
```

#### Registro (`src/views/Register.tsx`)

##### Características
- **Validación robusta**: Contraseñas seguras, confirmación
- **Términos y condiciones**: Checkbox requerido
- **Validación cruzada**: Confirmación de contraseña
- **Estados de progreso**: Indicadores visuales

### 4. Layouts y Navegación

#### VerticalLayout (`src/@layouts/VerticalLayout.tsx`)

##### Propósito
Layout principal de la aplicación con navegación vertical y contenido dinámico.

##### Características
- **Navegación vertical**: Menú lateral colapsable
- **Header responsive**: Con búsqueda y acciones de usuario
- **Footer**: Información de la aplicación
- **Contenido dinámico**: Área principal adaptable

##### Estructura
```typescript
const VerticalLayout = ({ children, settings, saveSettings }) => {
  return (
    <LayoutWrapper>
      <VerticalNav
        navWidth={navWidth}
        navVisible={navVisible}
        navCollapsed={navCollapsed}
        toggleNavVisibility={toggleNavVisibility}
        setNavCollapsed={setNavCollapsed}
        collapsedNavWidth={collapsedNavWidth}
        navigationBorderWidth={navigationBorderWidth}
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        navMenuContent={navMenuContent}
        navMenuBranding={navMenuBranding}
        navMenuFooter={navMenuFooter}
        afterNavMenuContent={afterNavMenuContent}
        beforeNavMenuContent={beforeNavMenuContent}
      />
      <LayoutContent
        navWidth={navWidth}
        navVisible={navVisible}
        navCollapsed={navCollapsed}
        collapsedNavWidth={collapsedNavWidth}
        navigationBorderWidth={navigationBorderWidth}
        settings={settings}
        hidden={hidden}
        scrollToTop={scrollToTop}
        saveSettings={saveSettings}
        footerContent={footerContent}
        verticalLayoutProps={verticalLayoutProps}
      >
        {children}
      </LayoutContent>
    </LayoutWrapper>
  )
}
```

#### Sistema de Menú (`src/@menu/`)

##### Características
- **Menú dinámico**: Basado en configuración
- **Submenús**: Navegación jerárquica
- **Iconos**: Sistema de iconos unificado
- **Estados activos**: Indicadores visuales
- **Responsive**: Adaptación móvil

##### Configuración
```typescript
const navigation = [
  {
    title: 'Dashboard',
    path: '/panel',
    icon: 'ri-home-line',
    children: []
  },
  {
    title: 'Contactos',
    path: '/panel/contactos',
    icon: 'ri-user-line',
    children: [
      {
        title: 'Lista',
        path: '/panel/contactos'
      },
      {
        title: 'Nuevo',
        path: '/panel/contactos/nuevo'
      }
    ]
  }
]
```

### 5. Componentes de UI

#### Card Statistics (`src/components/card-statistics/`)

##### Propósito
Tarjetas informativas para mostrar estadísticas y métricas.

##### Tipos
- **Vertical**: Estadísticas con icono vertical
- **Horizontal**: Estadísticas con icono horizontal
- **Con gráficos**: Integración con ApexCharts

##### Implementación
```typescript
const Vertical = ({ title, stats, icon, color, trend }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            <Icon icon={icon} fontSize="1.75rem" />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{stats}</Typography>
            <Typography variant="body2">{title}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
```

#### Form Components (`src/components/Form.tsx`)

##### Propósito
Componente base para formularios con manejo de eventos.

##### Características
- **Prevención de envío**: Por defecto
- **Manejo de eventos**: Personalizable
- **Accesibilidad**: Atributos ARIA
- **Flexibilidad**: Props extendibles

## 🔗 Interacciones Entre Componentes

### Flujo de Datos

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AuthContext   │───▶│   Login Form    │───▶│   Dashboard     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  UserContext    │    │  Validators     │    │  Contact Table  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  UserDetail     │    │  Form Fields    │    │  Navigation     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Comunicación Entre Componentes

#### 1. Context API
```typescript
// AuthContext para autenticación global
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false
})

// Uso en componentes
const { user, login, logout } = useContext(AuthContext)
```

#### 2. Props Drilling
```typescript
// Paso de datos a través de componentes
<ParentComponent>
  <ChildComponent data={data} onChange={handleChange} />
</ParentComponent>
```

#### 3. Custom Hooks
```typescript
// Hook para navegación de usuario
const { navigateToContactDetail } = useUserNavigation()

// Uso en componentes
const handleRowClick = (userId: string) => {
  navigateToContactDetail(userId)
}
```

## 🎨 Sistema de Estilos

### Capas de Estilos

#### 1. Tailwind CSS
- **Utilidades**: Clases utilitarias para estilos rápidos
- **Responsive**: Breakpoints automáticos
- **Customización**: Variables CSS personalizadas

#### 2. Material-UI
- **Componentes**: Biblioteca de componentes
- **Temas**: Sistema de temas personalizable
- **Overrides**: Personalización de componentes

#### 3. CSS Modules
- **Estilos específicos**: Para componentes únicos
- **Scoping**: Estilos encapsulados
- **Composición**: Reutilización de estilos

### Configuración de Temas

```typescript
// Configuración de tema principal
const theme = createTheme({
  palette: {
    primary: {
      main: '#9155FD'
    },
    secondary: {
      main: '#8A8D93'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})
```

## 🚀 Mejores Prácticas

### 1. Composición de Componentes
- Usar composición sobre herencia
- Crear componentes pequeños y reutilizables
- Mantener responsabilidades únicas

### 2. Manejo de Estado
- Usar Context API para estado global
- Usar useState para estado local
- Implementar useReducer para estado complejo

### 3. Performance
- Usar React.memo para componentes pesados
- Implementar lazy loading para rutas
- Optimizar re-renders con useMemo y useCallback

### 4. Accesibilidad
- Usar elementos semánticos
- Implementar navegación por teclado
- Proporcionar textos alternativos

### 5. Testing
- Testear componentes individualmente
- Mockear dependencias externas
- Verificar interacciones de usuario

## 🔧 Extensibilidad

### Agregar Nuevos Componentes

1. **Crear el componente** en la ubicación apropiada
2. **Definir tipos TypeScript** en `src/types/`
3. **Implementar validaciones** si es necesario
4. **Agregar documentación** siguiendo el estándar
5. **Crear tests** para el componente

### Patrón de Documentación

```typescript
/**
 * NOMBRE DEL COMPONENTE - eComercial
 * 
 * Descripción del propósito y funcionalidad
 * 
 * CARACTERÍSTICAS:
 * - Lista de características principales
 * - Funcionalidades específicas
 * 
 * PROPIEDADES:
 * - prop1: tipo - descripción
 * - prop2: tipo - descripción
 * 
 * EJEMPLO DE USO:
 * ```tsx
 * <MiComponente prop1="valor" prop2={true} />
 * ```
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */
```

---

**Documentación generada por**: Equipo eComercial - SITIC León  
**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024 
