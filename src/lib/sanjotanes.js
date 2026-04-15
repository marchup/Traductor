// ============================================
// SANJOTANES GENERATOR v3.0 - DETERMINISTA CON DICCIONARIO
// ============================================

// Pool fijo de sílabas
const SYLLABLES = [
  "sha", "vek", "tor", "nal", "kel", "var", "zen", "ruk", "thal", "mor",
  "shel", "dren", "vak", "nor", "esh", "lir", "vos", "kan", "zel"
];

// Diccionario inicial fijo (NO MODIFICABLE)
export const INITIAL_DICTIONARY = [
  { spanish: "gabriel", sanjotanes: "ghavren" },
  { spanish: "julian", sanjotanes: "julnash" },
  { spanish: "radio", sanjotanes: "kelvar" },
  { spanish: "tormenta", sanjotanes: "tromnash" },
  { spanish: "mar", sanjotanes: "vash" },
  { spanish: "isla", sanjotanes: "narek" },
  { spanish: "barco", sanjotanes: "drelvak" },
  { spanish: "señal", sanjotanes: "shanor" },
  { spanish: "voz", sanjotanes: "vek" },
  { spanish: "padre", sanjotanes: "drahven" }
];

// ============================================
// PASO 1: NORMALIZACIÓN
// ============================================
export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-zñ\s!?.,;:-]/g, '') // Mantener letras, espacios y puntuación básica
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
  return Math.abs(hash >>> 0);
}

// ============================================
// PASO 3: GENERADOR PRNG DETERMINISTA
// ============================================
function createPRNG(seed) {
  let localSeed = seed;
  return function() {
    localSeed = (localSeed * 9301 + 49297) % 233280;
    return localSeed / 233280;
  };
}

// ============================================
// PASO 4: GENERACIÓN DE PALABRA NUEVA
// ============================================
export function generateSanjotanesWord(spanishWord) {
  const normalized = spanishWord.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  if (!normalized) return '';
  
  const hash = fnv1aHash(normalized);
  const prng = createPRNG(hash);
  
  // 2 o 3 sílabas
  const syllableCount = Math.floor(prng() * 2) + 2;
  
  let result = '';
  let lastIndex = -1;
  
  for (let i = 0; i < syllableCount; i++) {
    let index;
    // Evitar repetir la misma sílaba consecutiva
    do {
      index = Math.floor(prng() * SYLLABLES.length);
    } while (index === lastIndex && SYLLABLES.length > 1);
    
    lastIndex = index;
    result += SYLLABLES[index];
  }
  
  return result;
}

// ============================================
// FUNCIÓN PRINCIPAL DE TRADUCCIÓN
// ============================================
export async function translateToSanjotanes(text, getEntry, saveEntry) {
  const normalized = normalizeText(text);
  if (!normalized) return { original: text, translated: '', words: [] };
  
  // Separar palabras pero mantener espacios y puntuación
  // Regex: palabras (letras) o (espacios/puntuación individuales)
  const tokens = normalized.match(/[a-zñ]+|[^a-zñ]+/g) || [];
  
  const results = [];
  const outputTokens = [];
  
  for (const token of tokens) {
    // Si es espacio o puntuación, pasar directo
    if (!/[a-zñ]/.test(token)) {
      outputTokens.push(token);
      continue;
    }
    
    const cleanWord = token;
    
    // 1. BUSCAR EN BASE DE DATOS PRIMERO
    const existing = await getEntry(cleanWord);
    
    if (existing) {
      results.push({
        spanish: cleanWord,
        sanjotanes: existing.sanjotanes_text,
        hash: existing.hash,
        isNew: false,
        isFixed: false
      });
      outputTokens.push(existing.sanjotanes_text);
    } else {
      // 2. VERIFICAR SI ESTÁ EN DICCIONARIO INICIAL
      const fixedEntry = INITIAL_DICTIONARY.find(
        entry => entry.spanish === cleanWord
      );
      
      if (fixedEntry) {
        // Guardar en BD para futuras consultas
        const hash = fnv1aHash(cleanWord).toString(16);
        await saveEntry(cleanWord, fixedEntry.sanjotanes, hash);
        
        results.push({
          spanish: cleanWord,
          sanjotanes: fixedEntry.sanjotanes,
          hash: hash,
          isNew: true,
          isFixed: true
        });
        outputTokens.push(fixedEntry.sanjotanes);
      } else {
        // 3. GENERAR NUEVA PALABRA
        const sanjotanes = generateSanjotanesWord(cleanWord);
        const hash = fnv1aHash(cleanWord).toString(16);
        
        // Guardar en BD
        await saveEntry(cleanWord, sanjotanes, hash);
        
        results.push({
          spanish: cleanWord,
          sanjotanes: sanjotanes,
          hash: hash,
          isNew: true,
          isFixed: false
        });
        outputTokens.push(sanjotanes);
      }
    }
  }
  
  return {
    original: text,
    translated: outputTokens.join(''),
    words: results
  };
}

// ============================================
// INICIALIZAR DICCIONARIO (llamar al inicio)
// ============================================
export async function initializeDictionary(saveEntry) {
  console.log('Inicializando diccionario Sanjotanes...');
  
  for (const entry of INITIAL_DICTIONARY) {
    const existing = await getEntry(entry.spanish);
    if (!existing) {
      const hash = fnv1aHash(entry.spanish).toString(16);
      await saveEntry(entry.spanish, entry.sanjotanes, hash);
      console.log(`  ✓ ${entry.spanish} → ${entry.sanjotanes}`);
    }
  }
  
  console.log('Diccionario inicializado.');
}
