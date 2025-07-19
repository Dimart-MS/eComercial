# eComercial - Sistema de Gestión de Contactos

## 📋 Descripción del Proyecto

**eComercial** es una aplicación web moderna para la gestión integral de contactos comerciales, desarrollada con Next.js 14, TypeScript y Material-UI. El sistema permite administrar prospectos, clientes, proveedores y colaboradores con funcionalidades avanzadas de búsqueda, filtrado y validación.

### 🎯 Características Principales

- **Gestión de Contactos**: CRUD completo con validaciones robustas
- **Sistema de Autenticación**: Login/registro con validación Zod
- **Interfaz Responsiva**: Diseño adaptativo con Material-UI y Tailwind CSS
- **Búsqueda Avanzada**: Filtros dinámicos y ordenamiento multi-columna
- **Validación en Tiempo Real**: Esquemas Zod con mensajes personalizados
- **Arquitectura Modular**: Componentes reutilizables y escalables

### 🏗️ Arquitectura del Sistema

```
maqueta-eComercial/
├── src/
│   ├── @core/           # Componentes y utilidades core
│   ├── @layouts/        # Layouts de la aplicación
│   ├── @menu/          # Sistema de navegación
│   ├── app/            # Páginas Next.js 14 (App Router)
│   ├── components/     # Componentes reutilizables
│   ├── views/          # Vistas principales
│   ├── utils/          # Utilidades y validaciones
│   └── types/          # Definiciones TypeScript
├── public/             # Archivos estáticos
└── docs/              # Documentación técnica
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm, yarn o pnpm
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd maqueta-eComercial
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con las configuraciones necesarias
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run start        # Servidor de producción

# Calidad de código
npm run lint         # Verificar linting
npm run lint:fix     # Corregir errores de linting
npm run format       # Formatear código con Prettier

# Utilidades
npm run build:icons  # Generar bundle de iconos
```

## 📚 Documentación Técnica

### Estructura de Módulos

#### 1. Sistema de Validación (`src/utils/validators.ts`)
- **Propósito**: Centraliza todas las validaciones del proyecto
- **Características**: 
  - Patrones regex optimizados
  - Validadores atómicos reutilizables
  - Esquemas compuestos con Zod
  - Mensajes de error personalizados
- **Uso**: Importar validadores específicos en formularios

#### 2. Gestión de Contactos (`src/views/user/`)
- **Tabla de Contactos** (`Table.tsx`): Vista principal con filtros y búsqueda
- **Formularios de Edición**: Módulos especializados por tipo de información
- **Validaciones**: Integración con sistema de validación centralizado

#### 3. Sistema de Autenticación (`src/views/auth/`)
- **Login** (`Login.tsx`): Autenticación con email/usuario
- **Registro** (`Register.tsx`): Creación de cuentas con validaciones
- **Recuperación** (`ForgotPassword.tsx`): Recuperación de contraseñas

### Guía de Desarrollo

#### Crear un Nuevo Formulario

1. **Definir el esquema de validación** en `src/utils/validators.ts`:
```typescript
export const miFormularioSchema = z.object({
  campo1: requiredString('Campo 1'),
  campo2: email('Email'),
  // ... más campos
})
```

2. **Crear el componente** en `src/views/forms/`:
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
 * - Acceso: /ruta-del-formulario
 * - Conexión: Integra con API de backend
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */
```

3. **Integrar con el sistema de navegación** usando `useUserNavigation`

#### Personalización de Temas

El sistema utiliza Material-UI con temas personalizables:

- **Variables globales**: `src/configs/themeConfig.ts`
- **Colores primarios**: `src/configs/primaryColorConfig.ts`
- **Overrides**: `src/@core/theme/overrides/`

### Estándares de Código

#### Convenciones de Nomenclatura

- **Componentes**: PascalCase (`MiComponente.tsx`)
- **Funciones**: camelCase (`miFuncion`)
- **Constantes**: UPPER_SNAKE_CASE (`MI_CONSTANTE`)
- **Tipos**: PascalCase (`MiTipo`)

#### Estructura de Comentarios

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
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */
```

### Despliegue

#### Desarrollo
```bash
npm run dev
```

#### Producción
```bash
npm run build
npm run start
```

#### Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL=

# Autenticación
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# APIs externas
API_BASE_URL=
```

## 🔧 Mantenimiento

### Actualización de Dependencias

```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar dependencias específicas
npm install paquete@latest
```

### Extensión del Sistema

1. **Nuevos módulos**: Crear en `src/views/` siguiendo la estructura existente
2. **Nuevas validaciones**: Agregar en `src/utils/validators.ts`
3. **Nuevos tipos**: Definir en `src/types/`
4. **Nuevos componentes**: Crear en `src/components/`

### Troubleshooting

#### Problemas Comunes

1. **Error de iconos**: Ejecutar `npm run build:icons`
2. **Error de TypeScript**: Verificar tipos en `src/types/`
3. **Error de validación**: Revisar esquemas en `src/utils/validators.ts`

## 📄 Licencia

Este proyecto es propiedad de **SITIC León** y tiene licencia comercial privada.

## 👥 Equipo de Desarrollo

- **Desarrollado por**: Equipo eComercial - SITIC León
- **Versión actual**: 0.1.0
- **Última actualización**: Diciembre 2024

## 📞 Soporte

Para soporte técnico o consultas sobre el desarrollo:
- **Email**: desarrollo@siticleon.com
- **Documentación**: `/docs/` en el repositorio
- **Issues**: Crear issue en el repositorio del proyecto
