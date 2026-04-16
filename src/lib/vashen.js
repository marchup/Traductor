// ============================================
// VASHÉN LANGUAGE SYSTEM v1.0 - FASE 1
// ============================================

// ============================================
// RAÍCES (25 totales)
// ============================================
const ROOTS = {
  // Originales (10)
  THA: { meaning: 'clima/tormenta', field: 'clima', variants: ['THAL', 'THAR'] },
  VAS: { meaning: 'mar/agua', field: 'mar', variants: ['VASH'] },
  MOR: { meaning: 'peligro/muerte', field: 'peligro', variants: ['MORA'] },
  SHE: { meaning: 'tierra/suelo', field: 'tierra', variants: ['SHEL'] },
  NAL: { meaning: 'hombre/persona', field: 'humano', variants: ['NALA'] },
  KOR: { meaning: 'fuerza/poder', field: 'fuerza', variants: ['KORA'] },
  ZEL: { meaning: 'luz/esperanza', field: 'luz', variants: ['ZELA'] },
  RAK: { meaning: 'movimiento/viaje', field: 'movimiento', variants: ['RAKA'] },
  DRA: { meaning: 'habla/comunicación', field: 'habla', variants: ['DRAL'] },
  SEL: { meaning: 'silencio/paz', field: 'silencio', variants: ['SELA'] },
  
  // Nuevas (15)
  VOR: { meaning: 'fuego/calor', field: 'elemento', variants: ['VORA'] },
  LUM: { meaning: 'agua/río', field: 'elemento', variants: ['LUMA'] },
  VEN: { meaning: 'viento/aire', field: 'elemento', variants: ['VENA'] },
  NOK: { meaning: 'noche/oscuridad', field: 'tiempo', variants: ['NOKA'] },
  DIA: { meaning: 'día/luz solar', field: 'tiempo', variants: ['DIAR'] },
  KAL: { meaning: 'montaña/roca', field: 'geografía', variants: ['KALA'] },
  SIL: { meaning: 'bosque/árbol', field: 'naturaleza', variants: ['SILA'] },
  BES: { meaning: 'animal/bestia', field: 'fauna', variants: ['BESA'] },
  AST: { meaning: 'estrella/cielo', field: 'astronomía', variants: ['ASTA'] },
  SOM: { meaning: 'sueño/muerte', field: 'abstracto', variants: ['SOMA'] },
  TEM: { meaning: 'tiempo/edad', field: 'abstracto', variants: ['TEMA'] },
  SAB: { meaning: 'saber/conocer', field: 'conocimiento', variants: ['SABA'] },
  CRE: { meaning: 'creer/fe', field: 'espiritualidad', variants: ['CREA'] },
  CON: { meaning: 'construir/hacer', field: 'acción', variants: ['CONA'] },
  EKO: { meaning: 'memoria/eco', field: 'abstracto', variants: ['EKOA'] }
};

// ============================================
// SUFIJOS (5)
// ============================================
const SUFFIXES = {
  OS: { type: 'entidad', desc: 'ser/entidad' },      // THALOS = tormenta
  AN: { type: 'objeto', desc: 'objeto/lugar' },       // VASAN = barco
  EN: { type: 'abstracto', desc: 'concepto' },       // SELEN = silencio
  IS: { type: 'estado', desc: 'cualidad/estado' },    // MORIS = peligroso
  AK: { type: 'evento', desc: 'acción/evento' }       // MORAK = caída
};

// ============================================
// CONECTORES (12)
// ============================================
const CONNECTORS = {
  'el': 'ELA',
  'la': 'ELA',
  'los': 'ELAS',
  'las': 'ELAS',
  'de': 'DEL',
  'del': 'DEL',
  'a': 'A',
  'al': 'A',
  'y': 'E',
  'o': 'O',
  'en': 'EN',
  'con': 'KON',
  'sin': 'SIN',
  'por': 'PRA',
  'para': 'PRA',
  'un': 'UN',
  'una': 'UN',
  'tierra': 'TERA'
};

// ============================================
// NÚMEROS (0-10)
// ============================================
const NUMBERS = {
  '0': 'NUL', '1': 'UNI', '2': 'DORA', '3': 'TREN',
  '4': 'KORA', '5': 'VINA', '6': 'SHEX', '7': 'SELN',
  '8': 'OKAR', '9': 'NOKA', '10': 'DEKA'
};

// ============================================
// DICCIONARIO FIJO VASHÉN
// ============================================
export const INITIAL_DICTIONARY = [
  // Conectores obligatorios
  { spanish: 'el', vashen: 'ELA' },
  { spanish: 'la', vashen: 'ELA' },
  { spanish: 'de', vashen: 'DEL' },
  { spanish: 'y', vashen: 'E' },
  
  // Palabras clave del juego (migradas si coherentes)
  { spanish: 'mar', vashen: 'VASH' },
  { spanish: 'tormenta', vashen: 'THALOS' },
  { spanish: 'barco', vashen: 'VASAN' },
  { spanish: 'isla', vashen: 'SHELAN' },
  { spanish: 'viento', vashen: 'VENOS' },
  { spanish: 'luz', vashen: 'ZELOS' },
  { spanish: 'oscuridad', vashen: 'NOKIS' },
  { spanish: 'padre', vashen: 'NALAN' },
  { spanish: 'eco', vashen: 'EKOS' },
  { spanish: 'memoria', vashen: 'EKON' }
];

// ============================================
// REGLAS FONÉTICAS
// ============================================
function applyPhoneticRules(root, suffix) {
  let result = root + suffix;
  
  // Regla 1: Evitar AA → A
  result = result.replace(/AA/g, 'A');
  
  // Regla 2: Evitar AE → E
  result = result.replace(/AE/g, 'E');
  
  // Regla 3: Evitar EA → fusionar
  result = result.replace(/EA/g, 'E');
  
  // Regla 4: Evitar dobles consonantes al inicio
  result = result.replace(/^([A-Z])\1/, '$1');
  
  return result;
}

// ============================================
// HASH DETERMINISTA
// ============================================
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
// SELECCIONAR RAÍZ POR CAMPO SEMÁNTICO
// ============================================
function selectRoot(spanishWord, prng) {
  const word = spanishWord.toLowerCase();
  
  // Mapeo semántico básico
  const semanticMap = {
    'mar': 'VAS', 'agua': 'VAS', 'océano': 'VAS', 'ola': 'LUM',
    'tormenta': 'THA', 'viento': 'VEN', 'lluvia': 'THA', 'nieve': 'THA',
    'fuego': 'VOR', 'calor': 'VOR', 'quemar': 'VOR',
    'tierra': 'SHE', 'suelo': 'SHE', 'arena': 'SHE',
    'montaña': 'KAL', 'roca': 'KAL', 'piedra': 'KAL',
    'árbol': 'SIL', 'bosque': 'SIL', 'planta': 'SIL',
    'hombre': 'NAL', 'persona': 'NAL', 'gente': 'NAL',
    'animal': 'BES', 'pez': 'BES', 'ave': 'BES',
    'noche': 'NOK', 'oscuridad': 'NOK', 'negro': 'NOK',
    'día': 'DIA', 'sol': 'DIA', 'luz': 'ZEL',
    'estrella': 'AST', 'cielo': 'AST', 'nube': 'VEN',
    'tiempo': 'TEM', 'edad': 'TEM', 'año': 'TEM',
    'muerte': 'SOM', 'sueño': 'SOM', 'morir': 'SOM',
    'saber': 'SAB', 'conocer': 'SAB', 'pensar': 'SAB',
    'hablar': 'DRA', 'decir': 'DRA', 'voz': 'DRA',
    'construir': 'CON', 'hacer': 'CON', 'crear': 'CON',
    'fuerza': 'KOR', 'poder': 'KOR', 'fuerte': 'KOR',
    'movimiento': 'RAK', 'ir': 'RAK', 'venir': 'RAK',
    'silencio': 'SEL', 'paz': 'SEL', 'calma': 'SEL',
    'peligro': 'MOR', 'miedo': 'MOR', 'daño': 'MOR',
    'fe': 'CRE', 'creer': 'CRE', 'esperanza': 'ZEL',
    'memoria': 'EKO', 'recuerdo': 'EKO', 'eco': 'EKO'
  };
  
  // Buscar coincidencia semántica
  for (const [key, root] of Object.entries(semanticMap)) {
    if (word.includes(key)) return root;
  }
  
  // Si no hay coincidencia, seleccionar aleatoriamente pero determinista
  const rootKeys = Object.keys(ROOTS);
  return rootKeys[Math.floor(prng() * rootKeys.length)];
}

// ============================================
// GENERAR PALABRA VASHÉN
// ============================================
function generateVashenWord(spanishWord, usedWords = new Set()) {
  const hash = fnv1aHash(spanishWord);
  const prng = createPRNG(hash);
  
  // Seleccionar raíz
  const rootKey = selectRoot(spanishWord, prng);
  const root = ROOTS[rootKey];
  
  // Seleccionar variante de raíz
  const variant = root.variants[Math.floor(prng() * root.variants.length)];
  
  // Seleccionar sufijo
  const suffixKeys = Object.keys(SUFFIXES);
  const suffix = suffixKeys[Math.floor(prng() * suffixKeys.length)];
  
  // Aplicar reglas fonéticas
  let result = applyPhoneticRules(variant, suffix);
  
  // Verificar colisión
  let attempts = 0;
  while (usedWords.has(result) && attempts < 10) {
    // Cambiar sufijo
    const newSuffix = suffixKeys[Math.floor(prng() * suffixKeys.length)];
    result = applyPhoneticRules(variant, newSuffix);
    attempts++;
  }
  
  return result;
}

// ============================================
// NORMALIZACIÓN
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
// TRADUCCIÓN PRINCIPAL
// ============================================
export async function translateToVashen(text, getEntry, saveEntry) {
  const normalized = normalizeText(text);
  if (!normalized) return { original: text, translated: '', words: [] };
  
  const tokens = normalized.match(/[a-zñ]+|[^a-zñ]+/g) || [];
  const results = [];
  const outputTokens = [];
  const usedVashen = new Set(INITIAL_DICTIONARY.map(e => e.vashen));
  
  for (const token of tokens) {
    // Espacios y puntuación
    if (!/[a-zñ]/.test(token)) {
      outputTokens.push(token);
      continue;
    }
    
    const cleanWord = token;
    
    // 1. Buscar en BD
    const existing = await getEntry(cleanWord);
    if (existing) {
      usedVashen.add(existing.vashen_text);
      results.push({ spanish: cleanWord, vashen: existing.vashen_text, isNew: false });
      outputTokens.push(existing.vashen_text);
      continue;
    }
    
    // 2. Buscar en diccionario inicial
    const fixed = INITIAL_DICTIONARY.find(e => e.spanish === cleanWord);
    if (fixed) {
      const hash = fnv1aHash(cleanWord).toString(16);
      await saveEntry(cleanWord, fixed.vashen, hash);
      usedVashen.add(fixed.vashen);
      results.push({ spanish: cleanWord, vashen: fixed.vashen, isNew: true, isFixed: true });
      outputTokens.push(fixed.vashen);
      continue;
    }
    
    // 3. Verificar si es número
    if (NUMBERS[cleanWord]) {
      results.push({ spanish: cleanWord, vashen: NUMBERS[cleanWord], isNew: false, isNumber: true });
      outputTokens.push(NUMBERS[cleanWord]);
      continue;
    }
    
    // 4. Verificar si es conector
    if (CONNECTORS[cleanWord]) {
      results.push({ spanish: cleanWord, vashen: CONNECTORS[cleanWord], isNew: false, isConnector: true });
      outputTokens.push(CONNECTORS[cleanWord]);
      continue;
    }
    
    // 5. Generar nueva palabra
    const vashen = generateVashenWord(cleanWord, usedVashen);
    const hash = fnv1aHash(cleanWord).toString(16);
    await saveEntry(cleanWord, vashen, hash);
    usedVashen.add(vashen);
    results.push({ spanish: cleanWord, vashen, isNew: true });
    outputTokens.push(vashen);
  }
  
  return {
    original: text,
    translated: outputTokens.join(''),
    words: results
  };
}

// ============================================
// INICIALIZAR
// ============================================
export async function initializeDictionary(saveEntry, getEntry) {
  console.log('Inicializando diccionario Vashén...');
  
  for (const entry of INITIAL_DICTIONARY) {
    const existing = await getEntry(entry.spanish);
    if (!existing) {
      const hash = fnv1aHash(entry.spanish).toString(16);
      await saveEntry(entry.spanish, entry.vashen, hash);
      console.log(`  ✓ ${entry.spanish} → ${entry.vashen}`);
    }
  }
  
  console.log('Diccionario Vashén inicializado.');
}
