#!/usr/bin/env node

/**
 * SCRIPT DE VALIDACIÓN DE DOCUMENTACIÓN - eComercial
 * 
 * Valida que todos los archivos principales tengan documentación adecuada
 * siguiendo los estándares establecidos.
 * 
 * @author Equipo eComercial - SITIC León
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Archivos principales que deben tener documentación
const MAIN_FILES = [
  'src/utils/validators.ts',
  'src/views/Login.tsx',
  'src/views/Register.tsx',
  'src/views/user/Table.tsx',
  'src/views/user/forms/Comunicacion.tsx',
  'src/views/user/forms/DatosPersonalesAdicionales.tsx',
  'src/views/user/forms/ConfiguracionContacto.tsx',
  'src/views/user/forms/Ubicacion.tsx',
  'src/views/user/forms/EmpresaRelacionada.tsx',
  'src/views/user/forms/DocumentosDigiatales.tsx'
];

// Patrones de documentación requeridos
const DOCUMENTATION_PATTERNS = [
  /@author Equipo eComercial - SITIC León/,
  /@version \d+\.\d+\.\d+/,
  /CAMPOS INCLUIDOS:/,
  /VALIDACIONES:/,
  /FLUJO DE NAVEGACIÓN:/
];

/**
 * Valida que un archivo tenga la documentación requerida
 */
function validateFileDocumentation(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const missingPatterns = [];
    
    // Verificar si es un archivo TypeScript/TSX
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
      return { valid: true, file: filePath, reason: 'No es un archivo TypeScript' };
    }
    
    // Verificar patrones de documentación
    DOCUMENTATION_PATTERNS.forEach(pattern => {
      if (!pattern.test(content)) {
        missingPatterns.push(pattern.source);
      }
    });
    
    if (missingPatterns.length > 0) {
      return {
        valid: false,
        file: filePath,
        missing: missingPatterns,
        reason: 'Faltan patrones de documentación'
      };
    }
    
    return { valid: true, file: filePath };
  } catch (error) {
    return {
      valid: false,
      file: filePath,
      reason: `Error al leer archivo: ${error.message}`
    };
  }
}

/**
 * Función principal de validación
 */
function main() {
  console.log('🔍 Validando documentación del proyecto eComercial...\n');
  
  let totalFiles = 0;
  let validFiles = 0;
  let invalidFiles = [];
  
  MAIN_FILES.forEach(filePath => {
    totalFiles++;
    const result = validateFileDocumentation(filePath);
    
    if (result.valid) {
      validFiles++;
      console.log(`✅ ${filePath}`);
    } else {
      invalidFiles.push(result);
      console.log(`❌ ${filePath}`);
      console.log(`   Razón: ${result.reason}`);
      if (result.missing) {
        console.log(`   Faltan: ${result.missing.join(', ')}`);
      }
      console.log('');
    }
  });
  
  // Resumen
  console.log('\n📊 Resumen de Validación:');
  console.log(`Total de archivos: ${totalFiles}`);
  console.log(`Archivos válidos: ${validFiles}`);
  console.log(`Archivos con problemas: ${invalidFiles.length}`);
  
  if (invalidFiles.length > 0) {
    console.log('\n🚨 Archivos que necesitan documentación:');
    invalidFiles.forEach(file => {
      console.log(`- ${file.file}: ${file.reason}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 ¡Toda la documentación está correcta!');
    process.exit(0);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { validateFileDocumentation, main }; 
