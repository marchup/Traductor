// ============================================
// SANJOTANES GENERATOR v3.0 - DETERMINISTA CON DICCIONARIO
// ============================================

// Pool fijo de sílabas para generación automática
const SYLLABLES = [
  "sha", "vek", "tor", "nal", "kel", "var", "zen", "ruk", "thal", "mor",
  "shel", "dren", "vak", "nor", "esh", "lir", "vos", "kan", "zel"
];

// ============================================
// DICCIONARIO INICIAL FIJO (NO MODIFICABLE)
// ============================================
export const INITIAL_DICTIONARY = [
  // Personas
  { spanish: "gabriel", sanjotanes: "ghavren" },
  { spanish: "julian", sanjotanes: "julnash" },
  { spanish: "ana", sanjotanes: "anvek" },
  
  // Comunicación
  { spanish: "radio", sanjotanes: "kelvar" },
  { spanish: "voz", sanjotanes: "vek" },
  { spanish: "señal", sanjotanes: "shanor" },
  { spanish: "mensaje", sanjotanes: "velkar" },
  { spanish: "escuchar", sanjotanes: "shavel" },
  { spanish: "hablar", sanjotanes: "dravel" },
  
  // Mar y clima
  { spanish: "mar", sanjotanes: "vash" },
  { spanish: "agua", sanjotanes: "nalvek" },
  { spanish: "tormenta", sanjotanes: "tromnash" },
  { spanish: "viento", sanjotanes: "shelvar" },
  { spanish: "nube", sanjotanes: "morvek" },
  { spanish: "lluvia", sanjotanes: "velnash" },
  { spanish: "niebla", sanjotanes: "norash" },
  
  // Lugares y fenómenos
  { spanish: "isla", sanjotanes: "narek" },
  { spanish: "fosa", sanjotanes: "drahkel" },
  { spanish: "profundidad", sanjotanes: "thalnorek" },
  { spanish: "luz", sanjotanes: "vekra" },
  { spanish: "oscuridad", sanjotanes: "norsh" },
  
  // Barco y equipamiento
  { spanish: "barco", sanjotanes: "drelvak" },
  { spanish: "motor", sanjotanes: "karnel" },
  { spanish: "combustible", sanjotanes: "velkor" },
  { spanish: "casco", sanjotanes: "dranvek" },
  { spanish: "mapa", sanjotanes: "selnak" },
  { spanish: "brujula", sanjotanes: "thalvek" },
  
  // Familia y tiempo
  { spanish: "padre", sanjotanes: "drahven" },
  { spanish: "hijo", sanjotanes: "venrak" },
  { spanish: "recuerdo", sanjotanes: "shorvak" },
  { spanish: "tiempo", sanjotanes: "kelnor" },
  { spanish: "pasado", sanjotanes: "norvak" },
  { spanish: "presente", sanjotanes: "velnor" },
  
  // Estados y acciones
  { spanish: "ayuda", sanjotanes: "sharnel" },
  { spanish: "peligro", sanjotanes: "drashor" },
  { spanish: "perdido", sanjotanes: "norlash" },
  { spanish: "buscar", sanjotanes: "velshen" },
  { spanish: "encontrar", sanjotanes: "sharnok" },
  
  // Saludos y preguntas
  { spanish: "hola", sanjotanes: "kelshen" },
  { spanish: "quien", sanjotanes: "norvek" },
  { spanish: "donde", sanjotanes: "velrak" },
  { spanish: "estas", sanjotanes: "shavrek" },
  { spanish: "escuchas", sanjotanes: "shavelnor" },
  
  // Respuestas cortas
  { spanish: "si", sanjotanes: "vek" },
  { spanish: "no", sanjotanes: "nash" },
  { spanish: "ven", sanjotanes: "vel" },
  { spanish: "espera", sanjotanes: "sharen" },
  { spanish: "rapido", sanjotanes: "karnash" }
];

// ============================================
// PASO 1: NORMALIZACIÓN
// ============================================
export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zñ\s!?.,;:-]/g, '')
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
export async function initializeDictionary(saveEntry, getEntry) {
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
