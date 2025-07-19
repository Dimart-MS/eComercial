# Guía de Despliegue y Configuración

## 🚀 Configuración del Entorno

### Prerrequisitos del Sistema

#### Requisitos Mínimos
- **Node.js**: 18.0.0 o superior
- **npm**: 8.0.0 o superior (o yarn/pnpm)
- **Git**: 2.30.0 o superior
- **RAM**: 4GB mínimo, 8GB recomendado
- **Espacio en disco**: 2GB mínimo

#### Verificación de Instalación
```bash
# Verificar versiones
node --version    # Debe ser >= 18.0.0
npm --version     # Debe ser >= 8.0.0
git --version     # Debe ser >= 2.30.0
```

### Configuración Inicial

#### 1. Clonación del Repositorio
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd maqueta-eComercial

# Verificar la estructura
ls -la
```

#### 2. Instalación de Dependencias
```bash
# Usando npm (recomendado)
npm install

# Usando yarn
yarn install

# Usando pnpm
pnpm install
```

#### 3. Configuración de Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar variables de entorno
nano .env.local
```

**Variables de Entorno Requeridas:**
```env
# Entorno
NODE_ENV=development

# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/ecomercial

# Autenticación
NEXTAUTH_SECRET=tu-secreto-super-seguro-aqui
NEXTAUTH_URL=http://localhost:3000

# APIs externas
API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Configuración de correo
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password-de-aplicacion

# Configuración de archivos
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## 🔧 Configuración de Desarrollo

### Scripts Disponibles

#### Scripts de Desarrollo
```bash
# Servidor de desarrollo
npm run dev          # http://localhost:3000

# Construcción para desarrollo
npm run build:dev    # Construcción optimizada para desarrollo

# Limpieza de caché
npm run clean        # Limpiar .next y node_modules
```

#### Scripts de Calidad de Código
```bash
# Verificación de linting
npm run lint         # Verificar errores de ESLint

# Corrección automática
npm run lint:fix     # Corregir errores automáticamente

# Formateo de código
npm run format       # Formatear con Prettier

# Verificación de tipos
npm run type-check   # Verificar tipos TypeScript
```

#### Scripts de Utilidades
```bash
# Generar bundle de iconos
npm run build:icons  # Generar CSS de iconos

# Análisis de dependencias
npm run analyze      # Analizar bundle size

# Generar documentación
npm run docs         # Generar documentación automática
```

### Configuración de Herramientas

#### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    // Reglas personalizadas
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-console': 'warn'
  }
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["./src/@core/*"],
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/@layouts/*"],
      "@menu/*": ["./src/@menu/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 🌐 Configuración de Producción

### Preparación para Producción

#### 1. Optimización de Build
```bash
# Construcción optimizada
npm run build

# Análisis del bundle
npm run analyze
```

#### 2. Configuración de Servidor
```bash
# Servidor de producción
npm run start

# Con variables de entorno de producción
NODE_ENV=production npm run start
```

#### 3. Configuración de Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Configuración para archivos estáticos
    location /_next/static {
        alias /path/to/your/app/.next/static;
        expires 365d;
        access_log off;
    }
}
```

### Variables de Entorno de Producción

```env
# Entorno
NODE_ENV=production

# Base de datos de producción
DATABASE_URL=postgresql://user:password@prod-db:5432/ecomercial

# Autenticación
NEXTAUTH_SECRET=secreto-super-seguro-de-produccion
NEXTAUTH_URL=https://tu-dominio.com

# APIs externas
API_BASE_URL=https://api.tu-dominio.com
NEXT_PUBLIC_API_URL=https://api.tu-dominio.com

# Configuración de correo de producción
SMTP_HOST=smtp.tu-proveedor.com
SMTP_PORT=587
SMTP_USER=no-reply@tu-dominio.com
SMTP_PASS=password-seguro

# Configuración de archivos
UPLOAD_DIR=/var/www/uploads
MAX_FILE_SIZE=10485760

# Configuración de caché
REDIS_URL=redis://localhost:6379
```

## 🐳 Configuración con Docker

### Dockerfile
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar bundle de iconos
RUN npm run build:icons

# Construir la aplicación
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/ecomercial
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=ecomercial
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Comandos Docker
```bash
# Construir imagen
docker build -t ecomercial .

# Ejecutar con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Detener servicios
docker-compose down
```

## 🔒 Configuración de Seguridad

### Configuración de HTTPS
```javascript
// next.config.mjs
const nextConfig = {
  // Configuración de seguridad
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  }
}
```

### Configuración de CORS
```javascript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Configuración de CORS
  response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}

export const config = {
  matcher: '/api/:path*'
}
```

## 📊 Monitoreo y Logs

### Configuración de Logs
```javascript
// utils/logger.ts
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'ecomercial' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export default logger
```

### Configuración de Monitoreo
```javascript
// utils/monitoring.ts
import { performance } from 'perf_hooks'

export const measurePerformance = (name: string) => {
  const start = performance.now()
  
  return () => {
    const end = performance.now()
    const duration = end - start
    
    console.log(`${name} took ${duration.toFixed(2)}ms`)
    
    // Enviar métricas a sistema de monitoreo
    if (process.env.METRICS_ENDPOINT) {
      fetch(process.env.METRICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, duration, timestamp: Date.now() })
      }).catch(console.error)
    }
  }
}
```

## 🔄 Actualización y Mantenimiento

### Scripts de Actualización
```bash
#!/bin/bash
# update.sh

echo "🔄 Iniciando actualización del sistema..."

# Hacer backup de la base de datos
echo "📦 Creando backup de la base de datos..."
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Detener la aplicación
echo "⏹️ Deteniendo la aplicación..."
docker-compose down

# Actualizar código
echo "📥 Actualizando código..."
git pull origin main

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Construir aplicación
echo "🔨 Construyendo aplicación..."
npm run build

# Reiniciar servicios
echo "🚀 Reiniciando servicios..."
docker-compose up -d

# Verificar estado
echo "✅ Verificando estado..."
sleep 10
curl -f http://localhost:3000/api/health || echo "❌ Error en la verificación"

echo "🎉 Actualización completada!"
```

### Mantenimiento Programado
```bash
# Limpieza de logs antiguos
find /var/log/ecomercial -name "*.log" -mtime +30 -delete

# Limpieza de archivos temporales
find /tmp -name "ecomercial-*" -mtime +7 -delete

# Optimización de base de datos
psql $DATABASE_URL -c "VACUUM ANALYZE;"

# Verificación de espacio en disco
df -h | grep -E "(/$|/var|/tmp)"
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Error de Memoria
```bash
# Aumentar memoria para Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# O en el script de package.json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

#### Error de Puerto en Uso
```bash
# Verificar puertos en uso
lsof -i :3000

# Matar proceso
kill -9 $(lsof -t -i:3000)
```

#### Error de Base de Datos
```bash
# Verificar conexión
psql $DATABASE_URL -c "SELECT 1;"

# Verificar logs
docker-compose logs db
```

#### Error de Build
```bash
# Limpiar caché
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Logs de Diagnóstico
```bash
# Ver logs de la aplicación
docker-compose logs -f app

# Ver logs de Next.js
tail -f .next/server.log

# Ver logs de errores
tail -f logs/error.log

# Ver métricas de rendimiento
tail -f logs/performance.log
```

---

**Documentación generada por**: Equipo eComercial - SITIC León  
**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024 
