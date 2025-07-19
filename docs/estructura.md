# Estructura del Proyecto eComercial

## 📁 Mapa de Directorios

```
maqueta-eComercial/
├── 📁 src/                          # Código fuente principal
│   ├── 📁 @core/                    # Componentes y utilidades core
│   │   ├── 📁 components/           # Componentes base reutilizables
│   │   ├── 📁 contexts/             # Contextos de React
│   │   ├── 📁 hooks/                # Hooks personalizados
│   │   ├── 📁 styles/               # Estilos globales
│   │   ├── 📁 svg/                  # Componentes SVG
│   │   ├── 📁 tailwind/             # Configuración Tailwind
│   │   ├── 📁 theme/                # Sistema de temas
│   │   ├── 📁 types.ts              # Tipos core
│   │   └── 📁 utils/                # Utilidades core
│   │
│   ├── 📁 @layouts/                 # Layouts de la aplicación
│   │   ├── 📁 components/           # Componentes de layout
│   │   ├── 📁 styles/               # Estilos de layouts
│   │   ├── 📁 utils/                # Utilidades de layout
│   │   ├── 📁 BlankLayout.tsx       # Layout para páginas sin navegación
│   │   ├── 📁 LayoutWrapper.tsx     # Wrapper principal de layouts
│   │   └── 📁 VerticalLayout.tsx    # Layout vertical con menú
│   │
│   ├── 📁 @menu/                    # Sistema de navegación
│   │   ├── 📁 components/           # Componentes de menú
│   │   ├── 📁 contexts/             # Contextos de navegación
│   │   ├── 📁 hooks/                # Hooks de navegación
│   │   ├── 📁 styles/               # Estilos de menú
│   │   ├── 📁 svg/                  # Iconos SVG del menú
│   │   ├── 📁 types.ts              # Tipos de navegación
│   │   ├── 📁 utils/                # Utilidades de menú
│   │   └── 📁 vertical-menu/        # Menú vertical
│   │
│   ├── 📁 app/                      # Páginas Next.js 14 (App Router)
│   │   ├── 📁 (blank-layout-pages)/ # Páginas sin layout (auth, error)
│   │   ├── 📁 panel/                # Panel principal de la aplicación
│   │   ├── 📁 globals.css           # Estilos globales
│   │   ├── 📁 layout.tsx            # Layout raíz
│   │   └── 📁 page.tsx              # Página principal
│   │
│   ├── 📁 components/               # Componentes reutilizables
│   │   ├── 📁 auth/                 # Componentes de autenticación
│   │   ├── 📁 card-statistics/      # Tarjetas de estadísticas
│   │   ├── 📁 icons/                # Iconos del sistema
│   │   ├── 📁 layout/               # Componentes de layout
│   │   ├── 📁 stepper-dot/          # Componente de pasos
│   │   ├── 📁 theme/                # Componentes de tema
│   │   ├── 📁 DirectionalIcon.tsx   # Iconos direccionales
│   │   ├── 📁 Form.tsx              # Componente base de formulario
│   │   ├── 📁 Illustrations.tsx     # Ilustraciones
│   │   ├── 📁 Link.tsx              # Componente de enlace
│   │   ├── 📁 Providers.tsx         # Proveedores de contexto
│   │   └── 📁 SocialIcons.tsx       # Iconos sociales
│   │
│   ├── 📁 configs/                  # Configuraciones del sistema
│   │   ├── 📁 primaryColorConfig.ts # Configuración de colores primarios
│   │   └── 📁 themeConfig.ts        # Configuración de temas
│   │
│   ├── 📁 constants/                # Constantes de la aplicación
│   │   └── 📁 index.tsx             # Constantes centralizadas
│   │
│   ├── 📁 contexts/                 # Contextos de React
│   │   ├── 📁 AuthContext.tsx       # Contexto de autenticación
│   │   └── 📁 ThemeModeContext.tsx  # Contexto de modo de tema
│   │
│   ├── 📁 hooks/                    # Hooks personalizados
│   │   └── 📁 useUserNavigation.ts  # Hook de navegación de usuario
│   │
│   ├── 📁 libs/                     # Librerías externas configuradas
│   │   ├── 📁 ApexCharts.tsx        # Configuración de gráficos
│   │   └── 📁 styles/               # Estilos de librerías
│   │
│   ├── 📁 types/                    # Definiciones TypeScript
│   │   ├── 📁 auth.ts               # Tipos de autenticación
│   │   ├── 📁 pages/                # Tipos de páginas
│   │   └── 📁 user.ts               # Tipos de usuario
│   │
│   ├── 📁 utils/                    # Utilidades y validaciones
│   │   ├── 📁 rgbaToHex.ts          # Conversión de colores
│   │   ├── 📁 user-adapter.ts       # Adaptador de datos de usuario
│   │   └── 📁 validators.ts         # Sistema de validación
│   │
│   ├── 📁 views/                    # Vistas principales
│   │   ├── 📁 account-settings/     # Configuración de cuenta
│   │   ├── 📁 card-basic/           # Tarjetas básicas
│   │   ├── 📁 dashboard/            # Dashboard principal
│   │   ├── 📁 form-layouts/         # Layouts de formularios
│   │   ├── 📁 pages/                # Páginas misceláneas
│   │   ├── 📁 user/                 # Gestión de usuarios
│   │   ├── 📁 ForgotPassword.tsx    # Recuperación de contraseña
│   │   ├── 📁 Login.tsx             # Página de login
│   │   ├── 📁 NotFound.tsx          # Página 404
│   │   └── 📁 Register.tsx          # Página de registro
│   │
│   └── 📁 index.tsx                 # Punto de entrada principal
│
├── 📁 public/                       # Archivos estáticos
│   ├── 📁 images/                   # Imágenes del sistema
│   │   ├── 📁 avatars/              # Avatares de usuarios
│   │   ├── 📁 cards/                # Imágenes de tarjetas
│   │   ├── 📁 illustrations/        # Ilustraciones
│   │   ├── 📁 logos/                # Logos del sistema
│   │   └── 📁 pages/                # Imágenes de páginas
│   ├── 📁 index.html                # HTML base
│   ├── 📁 next.svg                  # Logo de Next.js
│   ├── 📁 user.json                 # Datos de ejemplo de usuarios
│   └── 📁 vercel.svg                # Logo de Vercel
│
├── 📁 docs/                         # Documentación técnica
├── 📁 pages/                        # Páginas legacy (Next.js Pages Router)
├── 📄 .eslintrc.js                  # Configuración ESLint
├── 📄 .gitignore                    # Archivos ignorados por Git
├── 📄 .npmrc                        # Configuración de npm
├── 📄 .prettierrc.json              # Configuración Prettier
├── 📄 .stylelintrc.json             # Configuración Stylelint
├── 📄 next.config.mjs               # Configuración Next.js
├── 📄 package.json                  # Dependencias y scripts
├── 📄 postcss.config.mjs            # Configuración PostCSS
├── 📄 README.md                     # Documentación principal
├── 📄 tailwind.config.ts            # Configuración Tailwind CSS
└── 📄 tsconfig.json                 # Configuración TypeScript
```

## 🔗 Relación Entre Módulos

### Flujo de Navegación Principal

```
Login/Register → Panel Principal → Gestión de Contactos
     ↓                ↓                    ↓
AuthContext → VerticalLayout → UserDetailView
     ↓                ↓                    ↓
Validators → Menu System → Form Components
```

### Conexiones Clave

#### 1. Sistema de Autenticación
- **AuthContext** (`src/contexts/AuthContext.tsx`) → **Login/Register** (`src/views/`)
- **Validators** (`src/utils/validators.ts`) → **Formularios de Auth**
- **Navegación**: Login → Panel Principal → Logout

#### 2. Gestión de Contactos
- **Table** (`src/views/user/Table.tsx`) → **UserDetailView** (`src/views/user/UserDetailView.tsx`)
- **Form Components** (`src/views/user/forms/`) → **Validators** (`src/utils/validators.ts`)
- **Navegación**: Tabla → Detalle → Formularios de Edición

#### 3. Sistema de Temas
- **ThemeModeContext** (`src/contexts/ThemeModeContext.tsx`) → **Theme Config** (`src/configs/`)
- **Core Theme** (`src/@core/theme/`) → **Componentes MUI**
- **Tailwind Config** → **Estilos CSS**

## 🏗️ Arquitectura de Componentes

### Patrón de Diseño

El proyecto sigue un patrón de **Arquitectura por Capas** con separación clara de responsabilidades:

```
┌─────────────────────────────────────┐
│           PRESENTATION LAYER        │
│  (Views, Components, Layouts)       │
├─────────────────────────────────────┤
│           BUSINESS LOGIC LAYER      │
│  (Hooks, Contexts, Validators)      │
├─────────────────────────────────────┤
│           DATA LAYER                │
│  (Types, Adapters, Utils)           │
└─────────────────────────────────────┘
```

### Jerarquía de Componentes

#### Componentes de Alto Nivel
- **Layouts**: Estructura general de la aplicación
- **Views**: Páginas principales con lógica de negocio
- **Forms**: Formularios especializados

#### Componentes de Medio Nivel
- **Core Components**: Componentes base reutilizables
- **Menu System**: Sistema de navegación
- **Theme Components**: Componentes de tema

#### Componentes de Bajo Nivel
- **UI Components**: Componentes básicos de interfaz
- **Icons**: Iconos del sistema
- **Utils**: Utilidades y helpers

## 📊 Organización de Datos

### Estructura de Tipos

```typescript
// Tipos principales
User                    // Usuario completo
UserContacts           // Información de contacto
UserPersonalInfo       // Información personal
UserSettings           // Configuraciones
UserAddress            // Direcciones
RelatedCompany         // Empresas relacionadas
Document               // Documentos digitales

// Tipos de validación
ValidationSchema       // Esquemas Zod
ValidationResult       // Resultados de validación
```

### Flujo de Datos

1. **Entrada**: Formularios → Validación → Estado Local
2. **Procesamiento**: Hooks → Context → API
3. **Salida**: Estado → Componentes → UI

## 🎨 Sistema de Estilos

### Capas de Estilos

1. **Tailwind CSS**: Utilidades y estilos base
2. **Material-UI**: Componentes y temas
3. **CSS Modules**: Estilos específicos de componentes
4. **Styled Components**: Estilos dinámicos

### Configuración de Temas

- **Theme Config**: Variables globales de tema
- **Primary Colors**: Configuración de colores primarios
- **Overrides**: Personalización de componentes MUI
- **Responsive**: Adaptación a diferentes dispositivos

## 🔧 Configuración y Despliegue

### Archivos de Configuración

- **Next.js**: `next.config.mjs`
- **TypeScript**: `tsconfig.json`
- **Tailwind**: `tailwind.config.ts`
- **ESLint**: `.eslintrc.js`
- **Prettier**: `.prettierrc.json`
- **PostCSS**: `postcss.config.mjs`

### Variables de Entorno

```env
# Desarrollo
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Producción
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.ecomercial.com
```

## 📈 Escalabilidad

### Estrategias de Crecimiento

1. **Módulos Independientes**: Cada módulo puede crecer independientemente
2. **Componentes Reutilizables**: Sistema de componentes escalable
3. **Validaciones Centralizadas**: Sistema de validación unificado
4. **Temas Flexibles**: Sistema de temas adaptable

### Puntos de Extensión

- **Nuevos Módulos**: Crear en `src/views/`
- **Nuevas Validaciones**: Agregar en `src/utils/validators.ts`
- **Nuevos Componentes**: Crear en `src/components/`
- **Nuevos Tipos**: Definir en `src/types/`

---

**Documentación generada por**: Equipo eComercial - SITIC León  
**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024 
