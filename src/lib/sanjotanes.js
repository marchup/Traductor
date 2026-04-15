// ============================================
// SANJOTANES GENERATOR v3.2 - CONECTORES CORTOS + ANTI-COLISIONES
// ============================================

const SYLLABLES = [
  "sha", "vek", "tor", "nal", "kel", "var", "zen", "ruk", "thal", "mor",
  "shel", "dren", "vak", "nor", "esh", "lir", "vos", "kan", "zel"
];

// Palabras funcionales que deben ser CORTAS (1 sílaba)
const FUNCTION_WORDS = [
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'en', 'de', 'a', 'con', 'por', 'para', 'sin', 'sobre',
  'al', 'del',  // ← AGREGADOS
  'y', 'o', 'pero', 'si', 'que', 'como', 'cuando',
  'es', 'está', 'estoy', 'son', 'soy', 'era', 'fue',
  'mi', 'tu', 'su', 'mis', 'tus', 'sus',
  'me', 'te', 'se', 'lo', 'le', 'nos', 'os'
];

// ============================================
// DICCIONARIO INICIAL FIJO (NO MODIFICABLE)
// ============================================
export const INITIAL_DICTIONARY = [
  // Conectores/agregados manualmente para consistencia
  { spanish: "al", sanjotanes: "nal" },
  { spanish: "del", sanjotanes: "ruk" },
  
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

// Sílabas CORTAS para palabras funcionales
const SHORT_SYLLABLES = ["sha", "vek", "tor", "nal", "kel", "var", "zen", "ruk", "mor", "vos"];

// Cache de palabras sanjotanes ya usadas
function getUsedSanjotanesSet() {
  return new Set(INITIAL_DICTIONARY.map(e => e.sanjotanes));
}

export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zñ\s!?.,;:-]/g, '')
    .trim();
}

function fnv1aHash(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0);
}

function createPRNG(seed) {
  let localSeed = seed;
  return function() {
    localSeed = (localSeed * 9301 + 49297) % 233280;
    return localSeed / 233280;
  };
}

// ============================================
// GENERACIÓN CON ANTI-COLISIONES
// ============================================
export function generateSanjotanesWord(spanishWord, usedSet = new Set()) {
  const normalized = spanishWord.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  if (!normalized) return '';
  
  const isFunctionWord = FUNCTION_WORDS.includes(normalized);
  const hash = fnv1aHash(normalized);
  const prng = createPRNG(hash);
  
  const syllableCount = isFunctionWord ? 1 : (Math.floor(prng() * 2) + 2);
  const pool = isFunctionWord ? SHORT_SYLLABLES : SYLLABLES;
  
  let result = '';
  let lastIndex = -1;
  let attempts = 0;
  
  do {
    result = '';
    lastIndex = -1;
    
    for (let i = 0; i < syllableCount; i++) {
      let index;
      do {
        index = Math.floor(prng() * pool.length);
      } while (index === lastIndex && pool.length > 1);
      
      lastIndex = index;
      result += pool[index];
    }
    
    // Agregar sufijo si colisiona (para palabras largas)
    if (usedSet.has(result) && !isFunctionWord && attempts < 5) {
      result += pool[Math.floor(prng() * pool.length)];
    }
    
    attempts++;
  } while (usedSet.has(result) && attempts < 10);
  
  return result;
}

export async function translateToSanjotanes(text, getEntry, saveEntry) {
  const normalized = normalizeText(text);
  if (!normalized) return { original: text, translated: '', words: [] };
  
  const tokens = normalized.match(/[a-zñ]+|[^a-zñ]+/g) || [];
  
  const results = [];
  const outputTokens = [];
  const usedSanjotanes = getUsedSanjotanesSet();
  
  // Agregar palabras ya procesadas en esta sesión
  for (const token of tokens) {
    if (!/[a-zñ]/.test(token)) {
      outputTokens.push(token);
      continue;
    }
    
    const cleanWord = token;
    const existing = await getEntry(cleanWord);
    
    if (existing) {
      usedSanjotanes.add(existing.sanjotanes_text);
      results.push({
        spanish: cleanWord,
        sanjotanes: existing.sanjotanes_text,
        hash: existing.hash,
        isNew: false,
        isFixed: false,
        isFunction: FUNCTION_WORDS.includes(cleanWord)
      });
      outputTokens.push(existing.sanjotanes_text);
    } else {
      const fixedEntry = INITIAL_DICTIONARY.find(entry => entry.spanish === cleanWord);
      
      if (fixedEntry) {
        const hash = fnv1aHash(cleanWord).toString(16);
        await saveEntry(cleanWord, fixedEntry.sanjotanes, hash);
        usedSanjotanes.add(fixedEntry.sanjotanes);
        
        results.push({
          spanish: cleanWord,
          sanjotanes: fixedEntry.sanjotanes,
          hash: hash,
          isNew: true,
          isFixed: true,
          isFunction: FUNCTION_WORDS.includes(cleanWord)
        });
        outputTokens.push(fixedEntry.sanjotanes);
      } else {
        // Generar con verificación de colisiones
        const sanjotanes = generateSanjotanesWord(cleanWord, usedSanjotanes);
        const hash = fnv1aHash(cleanWord).toString(16);
        
        await saveEntry(cleanWord, sanjotanes, hash);
        usedSanjotanes.add(sanjotanes);
        
        results.push({
          spanish: cleanWord,
          sanjotanes: sanjotanes,
          hash: hash,
          isNew: true,
          isFixed: false,
          isFunction: FUNCTION_WORDS.includes(cleanWord)
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
