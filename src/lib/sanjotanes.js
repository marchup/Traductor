// ============================================
// SANJOTANES GENERATOR v2.0 - DETERMINISTA PURO
// ============================================

// Pool fijo de sílabas - sonido marino/misterioso
const SYLLABLES = [
  "sha", "vek", "tor", "nal", "kel", "var", "zen", "ruk", "thal", "mor",
  "shel", "dren", "vak", "nor", "esh", "lir", "vos", "kan", "zel", "ruk",
  "tar", "nes", "vol", "kar", "sho", "mer", "val", "rok", "sin", "dov",
  "kesh", "lan", "vor", "tash", "ren", "mok", "sal", "kir", "ven", "tol"
];

// ============================================
// PASO 1: NORMALIZACIÓN
// ============================================
export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zñ\s!?]/g, '')
    .trim();
}

// ============================================
// PASO 2: HASH FNV-1a DETERMINISTA
// ============================================
function fnv1aHash(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0); // Unsigned 32-bit
}

// ============================================
// PASO 3: GENERADOR PRNG DETERMINISTA
// ============================================
function createPRNG(seed) {
  let localSeed = seed;
  return function() {
    // LCG (Linear Congruential Generator) - determinista
    localSeed = (localSeed * 9301 + 49297) % 233280;
    return localSeed / 233280;
  };
}

// ============================================
// PASO 4: GENERACIÓN DE PALABRA DESDE CERO
// ============================================
export function generateSanjotanes(spanishWord) {
  // 1. Normalizar input
  const normalized = normalizeText(spanishWord);
  
  if (!normalized) return '';
  
  // 2. Generar hash determinista
  const hash = fnv1aHash(normalized);
  
  // 3. Crear PRNG con el hash como seed
  const prng = createPRNG(hash);
  
  // 4. Decidir cantidad de sílabas (2 o 3)
  const syllableCount = Math.floor(prng() * 2) + 2; // 2 o 3
  
  // 5. Generar palabra seleccionando sílabas del pool
  let result = '';
  let usedIndices = new Set();
  
  for (let i = 0; i < syllableCount; i++) {
    let index;
    // Evitar repetir la misma sílaba inmediatamente
    do {
      index = Math.floor(prng() * SYLLABLES.length);
    } while (usedIndices.has(index) && usedIndices.size < SYLLABLES.length);
    
    usedIndices.add(index);
    result += SYLLABLES[index];
  }
  
  return result;
}

// ============================================
// PASO 5: HASH PARA BASE DE DATOS (SHA1 truncado)
// ============================================
export function generateHash(text) {
  // Usar FNV-1a como hash principal para consistencia
  const hash = fnv1aHash(normalizeText(text));
  return hash.toString(16).padStart(8, '0');
}

// ============================================
// FUNCIÓN PRINCIPAL DE TRADUCCIÓN
// ============================================
export async function translateToSanjotanes(text, getEntry, saveEntry) {
  const normalized = normalizeText(text);
  if (!normalized) return { original: text, translated: '', words: [] };
  
  // Dividir en palabras (manteniendo ! y ? adjuntos)
  const tokens = normalized.match(/[a-zñ]+|[!?]/g) || [];
  const results = [];
  let translatedTokens = [];
  
  for (const token of tokens) {
    // Si es puntuación, pasar directo
    if (/^[!?]$/.test(token)) {
      translatedTokens.push(token);
      continue;
    }
    
    const cleanWord = token;
    
    // Verificar si existe en lexicón
    const existing = await getEntry(cleanWord);
    
    if (existing) {
      results.push({
        spanish: cleanWord,
        sanjotanes: existing.sanjotanes_text,
        hash: existing.hash,
        isNew: false
      });
      translatedTokens.push(existing.sanjotanes_text);
    } else {
      // Generar nueva palabra desde CERO
      const sanjotanes = generateSanjotanes(cleanWord);
      const hash = generateHash(cleanWord);
      
      // Guardar en base de datos
      await saveEntry(cleanWord, sanjotanes, hash);
      
      results.push({
        spanish: cleanWord,
        sanjotanes: sanjotanes,
        hash: hash,
        isNew: true
      });
      translatedTokens.push(sanjotanes);
    }
  }
  
  return {
    original: text,
    translated: translatedTokens.join(''),
    words: results
  };
}

// ============================================
// TEST CASES (para verificación)
// ============================================
export function runTests() {
  const tests = ["hola", "gabriel", "tormenta", "radio", "isla"];
  console.log("=== TEST CASES SANJOTANES v2.0 ===");
  
  tests.forEach(word => {
    const result1 = generateSanjotanes(word);
    const result2 = generateSanjotanes(word);
    const hash = generateHash(word);
    
    console.log(`"${word}" → "${result1}" (hash: ${hash})`);
    console.log(`  Determinista: ${result1 === result2 ? '✅' : '❌'}`);
    console.log(`  Diferente input: ${result1 !== word ? '✅' : '❌'}`);
  });
}
