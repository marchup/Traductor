
// Especificación completa implementada
// ============================================

// ============================================
// 1. RAÍCES SEMÁNTICAS (25 - CANON)
// ============================================
export const ROOTS = {
  // Clima / Mar (4)
  THA: { meaning: 'clima/tormenta', field: 'clima', variants: ['THA', 'THAL', 'THAR'] },
  VAS: { meaning: 'mar/agua', field: 'mar', variants: ['VAS', 'VASH', 'VASN'] },
  VEN: { meaning: 'viento/aire', field: 'clima', variants: ['VEN', 'VENA', 'VEND'] },
  LUM: { meaning: 'agua/río', field: 'mar', variants: ['LUM', 'LUN', 'LUR'] },
  
  // Tierra / Geografía (3)
  SHE: { meaning: 'tierra/suelo', field: 'tierra', variants: ['SHE', 'SHEL', 'SHEN'] },
  KAL: { meaning: 'montaña/roca', field: 'geografia', variants: ['KAL', 'KALA', 'KAR'] },
  SIL: { meaning: 'bosque/árbol', field: 'naturaleza', variants: ['SIL', 'SILA', 'SIR'] },
  
  // Humanos / Vida (3)
  NAL: { meaning: 'hombre/persona', field: 'humano', variants: ['NAL', 'NALA', 'NAR'] },
  BES: { meaning: 'animal/bestia', field: 'fauna', variants: ['BES', 'BESA', 'BER'] },
  SOM: { meaning: 'sueño/muerte', field: 'abstracto', variants: ['SOM', 'SOMA', 'SON'] },
  
  // Fuerzas / Elementos (3)
  VOR: { meaning: 'fuego/calor', field: 'elemento', variants: ['VOR', 'VORA', 'VORN'] },
  MOR: { meaning: 'peligro/muerte', field: 'peligro', variants: ['MOR', 'MORA', 'MORN'] },
  KOR: { meaning: 'fuerza/poder', field: 'fuerza', variants: ['KOR', 'KORA', 'KORN'] },
  
  // Luz / Tiempo (3)
  ZEL: { meaning: 'luz/esperanza', field: 'luz', variants: ['ZEL', 'ZELA', 'ZEN'] },
  NOK: { meaning: 'noche/oscuridad', field: 'tiempo', variants: ['NOK', 'NOKA', 'NOR'] },
  DIA: { meaning: 'día/luz solar', field: 'tiempo', variants: ['DIA', 'DIAR', 'DIN'] },
  TEM: { meaning: 'tiempo/edad', field: 'abstracto', variants: ['TEM', 'TEMA', 'TER'] },
  
  // Conocimiento / Acción (4)
  SAB: { meaning: 'saber/conocer', field: 'conocimiento', variants: ['SAB', 'SABA', 'SAR'] },
  CRE: { meaning: 'creer/fe', field: 'espiritualidad', variants: ['CRE', 'CREA', 'CER'] },
  CON: { meaning: 'construir/hacer', field: 'accion', variants: ['CON', 'CONA', 'COR'] },
  DRA: { meaning: 'habla/comunicación', field: 'habla', variants: ['DRA', 'DRAL', 'DAR'] },
  
  // Movimiento / Estado (3)
  RAK: { meaning: 'movimiento/viaje', field: 'movimiento', variants: ['RAK', 'RAKA', 'RAR'] },
  SEL: { meaning: 'silencio/paz', field: 'silencio', variants: ['SEL', 'SELA', 'SER'] },
  EKO: { meaning: 'memoria/eco', field: 'abstracto', variants: ['EKO', 'EKOA', 'EOR'] },
  AST: { meaning: 'estrella/cielo', field: 'astronomia', variants: ['AST', 'ASTA', 'ASR'] }
};

// ============================================
// 2. SUFIJOS DE SUSTANTIVOS (5 - CANON)
// ============================================
export const NOUN_SUFFIXES = {
  OS: { type: 'entidad', desc: 'ser/entidad viviente', weight: 1.0 },
  AN: { type: 'objeto', desc: 'objeto o lugar físico', weight: 1.2 },
  EN: { type: 'abstracto', desc: 'concepto abstracto', weight: 0.9 },
  IS: { type: 'estado', desc: 'cualidad o estado', weight: 0.8 },
  AK: { type: 'evento', desc: 'acción o evento puntual', weight: 1.1 }
};

// ============================================
// 3. EXTENSIONES VERBALES (3 - CANON)
// ============================================
export const VERB_EXTENSIONS = {
  EN: { type: 'continuidad', desc: 'acción continua/progresiva' },
  OR: { type: 'intencion', desc: 'acción dirigida/intencional' },
  AK: { type: 'intensidad', desc: 'acción intensa/perfectiva' }
};

// ============================================
// 4. CONECTORES (15 fijos - CANON)
// ============================================
export const CONNECTORS = {
  // Artículos
  'el': 'ELA',
  'la': 'ELA',
  'los': 'ELAS',
  'las': 'ELAS',
  'un': 'UN',
  'una': 'UN',
  
  // Preposiciones principales
  'de': 'DEL',
  'del': 'DEL',
  'a': 'A',
  'al': 'A',
  'en': 'EN',
  'con': 'KON',
  'sin': 'SIN',
  'por': 'PRA',
  'para': 'PRA',
  
  // Preposiciones adicionales (especificación)
  'desde': 'DES',
  'hasta': 'HAS',
  'sobre': 'SOB',
  
  // Conjunciones
  'y': 'E',
  'o': 'O',
  
  // Locativo especial
  'tierra': 'TERA'
};

// ============================================
// 5. NÚMEROS (0-10 + sistema de composición)
// ============================================
export const NUMBERS = {
  '0': 'NUL',
  '1': 'UNI',
  '2': 'DORA',
  '3': 'TREN',
  '4': 'KORA',
  '5': 'VINA',
  '6': 'SHEX',
  '7': 'SELN',
  '8': 'OKAR',
  '9': 'NOKA',
  '10': 'DEKA'
};

export function composeNumber(n) {
  if (n <= 10) return NUMBERS[String(n)] || 'NUL';
  if (n < 20) return 'DEKA' + NUMBERS[String(n - 10)];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const units = n % 10;
    return NUMBERS[String(tens)] + 'DEKA' + (units > 0 ? NUMBERS[String(units)] : '');
  }
  return 'NUL';
}

// ============================================
// 6. REGLAS FONÉTICAS (CANON)
// ============================================
export function applyPhoneticRules(base, suffix) {
  let result = base + suffix;
  result = result.replace(/AA/g, 'A');
  result = result.replace(/AE/g, 'E');
  result = result.replace(/EA/g, 'A');
  result = result.replace(/AO/g, 'O');
  result = result.replace(/OA/g, 'A');
  result = result.replace(/EE/g, 'E');
  result = result.replace(/OO/g, 'O');
  return result;
}

// ============================================
// 7. MAPEO SEMÁNTICO ESTRICTO (CANON)
// ============================================
const SEMANTIC_MAP = {
  // MAR / AGUA (VAS, LUM)
  'mar': 'VAS', 'oceano': 'VAS', 'agua': 'VAS', 'ola': 'LUM',
  'rio': 'LUM', 'lago': 'VAS', 'charco': 'LUM', 'lluvia': 'THA',
  'rocio': 'THA', 'nieve': 'THA', 'hielo': 'THA', 'vapor': 'VEN',
  'niebla': 'VEN',
  
  // VIENTO / CLIMA (VEN, THA)
  'viento': 'VEN', 'aire': 'VEN', 'brisa': 'VEN', 'tormenta': 'THA',
  'huracan': 'THA', 'tempestad': 'THA', 'trueno': 'THA', 'relampago': 'THA',
  
  // FUEGO / CALOR (VOR)
  'fuego': 'VOR', 'calor': 'VOR', 'llama': 'VOR', 'brasas': 'VOR',
  'quemar': 'VOR', 'arder': 'VOR', 'ceniza': 'VOR',
  
  // TIERRA / GEOGRAFÍA (SHE, KAL, SIL)
  'tierra': 'SHE', 'suelo': 'SHE', 'arena': 'SHE', 'barro': 'SHE',
  'piedra': 'KAL', 'roca': 'KAL', 'montana': 'KAL', 'cerro': 'KAL',
  'isla': 'SHE', 'peninsula': 'SHE', 'costa': 'SHE', 'playa': 'SHE',
  'arbol': 'SIL', 'bosque': 'SIL', 'madera': 'SIL', 'hoja': 'SIL',
  'raiz': 'SIL', 'flor': 'SIL',
  
  // HUMANOS / VIDA (NAL, BES, SOM)
  'hombre': 'NAL', 'mujer': 'NAL', 'persona': 'NAL', 'gente': 'NAL',
  'hijo': 'NAL', 'padre': 'NAL', 'madre': 'NAL', 'familia': 'NAL',
  'capitan': 'NAL', 'lider': 'NAL', 'jefe': 'NAL', 'comandante': 'NAL',
  'animal': 'BES', 'pez': 'BES', 'pajaro': 'BES', 'bestia': 'BES',
  'muerte': 'SOM', 'morir': 'SOM', 'muerto': 'SOM', 'sueno': 'SOM',
  'pesadilla': 'SOM', 'fantasma': 'SOM',
  
  // PELIGRO / FUERZA (MOR, KOR)
  'peligro': 'MOR', 'miedo': 'MOR', 'terror': 'MOR', 'dano': 'MOR',
  'dolor': 'MOR', 'herida': 'MOR', 'enfermedad': 'MOR', 'plaga': 'MOR',
  'fuerza': 'KOR', 'poder': 'KOR', 'fuerte': 'KOR', 'bravo': 'KOR',
  'guerrero': 'KOR', 'arma': 'KOR', 'escudo': 'KOR',
  
  // LUZ / OSCURIDAD (ZEL, NOK, DIA)
  'luz': 'ZEL', 'claridad': 'ZEL', 'esperanza': 'ZEL', 'estrella': 'AST',
  'sol': 'DIA', 'dia': 'DIA', 'amanecer': 'DIA', 'atardecer': 'DIA',
  'noche': 'NOK', 'oscuridad': 'NOK', 'negro': 'NOK', 'sombra': 'NOK',
  'luna': 'AST',
  
  // CONOCIMIENTO / PERCEPCIÓN (SAB, DRA, CRE)
  'saber': 'SAB', 'conocer': 'SAB', 'sabio': 'SAB', 'pensar': 'SAB',
  'idea': 'SAB', 'mente': 'SAB',
  'observar': 'SAB', 'ver': 'SAB', 'mirar': 'ZEL', 'percibir': 'SAB',
  'recuerdo': 'EKO', 'memoria': 'EKO',
  'hablar': 'DRA', 'decir': 'DRA', 'voz': 'DRA', 'palabra': 'DRA',
  'idioma': 'DRA', 'nombre': 'DRA', 'llamar': 'DRA',
  'creer': 'CRE', 'fe': 'CRE', 'dios': 'CRE', 'santo': 'CRE',
  'oracion': 'CRE', 'altar': 'CRE',
  
  // ACCIÓN / CONSTRUCCIÓN (CON, RAK)
  'hacer': 'CON', 'construir': 'CON', 'crear': 'CON', 'fabricar': 'CON',
  'casa': 'CON', 'edificio': 'CON', 'puente': 'CON', 'muelle': 'CON',
  'barco': 'VAS', 'nave': 'VAS', 'vela': 'VEN',
  'ir': 'RAK', 'venir': 'RAK', 'mover': 'RAK', 'viajar': 'RAK',
  'caminar': 'RAK', 'navegar': 'VAS', 'zarpar': 'RAK', 'llegar': 'RAK',
  
  // SILENCIO / PAZ (SEL)
  'silencio': 'SEL', 'paz': 'SEL', 'calma': 'SEL', 'quieto': 'SEL',
  'tranquilo': 'SEL', 'descanso': 'SEL',
  
  // TIEMPO (TEM)
  'tiempo': 'TEM', 'ahora': 'TEM', 'antes': 'TEM', 'despues': 'TEM',
  'ayer': 'TEM', 'manana': 'TEM', 'siempre': 'TEM', 'nunca': 'TEM',
  'ano': 'TEM', 'edad': 'TEM', 'epoca': 'TEM', 'siglo': 'TEM'
};

// ============================================
// 8. DETECTAR TIPO DE PALABRA
// ============================================
const VERB_INDICATORS = ['ar', 'er', 'ir', 'ando', 'iendo', 'ado', 'ido'];
const ADJECTIVE_INDICATORS = ['oso', 'osa', 'able', 'ible', 'ente', 'ante'];

export function detectWordType(word) {
  const w = word.toLowerCase();
  if (VERB_INDICATORS.some(end => w.endsWith(end))) return 'verb';
  if (ADJECTIVE_INDICATORS.some(end => w.endsWith(end))) return 'adjective';
  if (/^\\d+$/.test(w)) return 'number';
  if (CONNECTORS[w]) return 'connector';
  return 'noun';
}

// ============================================
// 9. SELECCIONAR RAÍZ (JERARQUÍA CANON)
// ============================================
export function selectRoot(spanishWord, wordType) {
  const w = spanishWord.toLowerCase().trim();
  
  if (SEMANTIC_MAP[w]) {
    return { root: SEMANTIC_MAP[w], method: 'exact', field: ROOTS[SEMANTIC_MAP[w]].field };
  }
  
  for (const [key, root] of Object.entries(SEMANTIC_MAP)) {
    if (w.includes(key)) {
      return { root, method: 'partial', field: ROOTS[root].field };
    }
  }
  
  let fallbackRoot = 'SHE';
  if (wordType === 'verb') fallbackRoot = 'RAK';
  else if (wordType === 'adjective') fallbackRoot = 'IS';
  else if (w.length < 4) fallbackRoot = 'NAL';
  
  const hash = w.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const rootKeys = Object.keys(ROOTS);
  const selectedRoot = rootKeys[hash % rootKeys.length];
  
  return { root: selectedRoot, method: 'derived', field: ROOTS[selectedRoot].field };
}

// ============================================
// 10. GENERAR PREFIJO
// ============================================
export function generatePrefix(rootKey) {
  return rootKey.substring(0, 2);
}

// ============================================
// 11. SELECCIONAR SUFIJO
// ============================================
export function selectSuffix(wordType, context) {
  if (wordType === 'verb') {
    return { suffix: 'EN', type: 'verb', desc: VERB_EXTENSIONS['EN'].desc };
  }
  if (wordType === 'adjective') {
    return { suffix: 'IS', type: 'noun', desc: NOUN_SUFFIXES['IS'].desc };
  }
  if (context.isLiving) return { suffix: 'OS', type: 'noun', desc: NOUN_SUFFIXES['OS'].desc };
  if (context.isPlace) return { suffix: 'AN', type: 'noun', desc: NOUN_SUFFIXES['AN'].desc };
  if (context.isAbstract) return { suffix: 'EN', type: 'noun', desc: NOUN_SUFFIXES['EN'].desc };
  if (context.isEvent) return { suffix: 'AK', type: 'noun', desc: NOUN_SUFFIXES['AK'].desc };
  return { suffix: 'AN', type: 'noun', desc: NOUN_SUFFIXES['AN'].desc };
}

// ============================================
// 12. GENERAR PALABRA VASHÉN
// ============================================
export function generateVashenWord(spanishWord, wordType, context) {
  const { root: rootKey, method, field } = selectRoot(spanishWord, wordType);
  const root = ROOTS[rootKey];
  
  const hash = spanishWord.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const variantIndex = hash % root.variants.length;
  const variant = root.variants[variantIndex];
  
  const { suffix, type: suffixType } = selectSuffix(wordType, context || {});
  const result = applyPhoneticRules(variant, suffix);
  
  return {
    vashen: result,
    root: rootKey,
    variant: variant,
    suffix: suffix,
    method: method,
    field: field,
    type: wordType
  };
}

// ============================================
// 13. DICCIONARIO INICIAL (PALABRAS FIJAS - ACTUALIZADO)
// ============================================
export const FIXED_DICTIONARY = [
  // Conectores (15 fijos)
  { spanish: 'el', vashen: 'ELA', type: 'connector', locked: true },
  { spanish: 'la', vashen: 'ELA', type: 'connector', locked: true },
  { spanish: 'los', vashen: 'ELAS', type: 'connector', locked: true },
  { spanish: 'las', vashen: 'ELAS', type: 'connector', locked: true },
  { spanish: 'de', vashen: 'DEL', type: 'connector', locked: true },
  { spanish: 'y', vashen: 'E', type: 'connector', locked: true },
  { spanish: 'o', vashen: 'O', type: 'connector', locked: true },
  { spanish: 'en', vashen: 'EN', type: 'connector', locked: true },
  { spanish: 'con', vashen: 'KON', type: 'connector', locked: true },
  { spanish: 'sin', vashen: 'SIN', type: 'connector', locked: true },
  { spanish: 'por', vashen: 'PRA', type: 'connector', locked: true },
  { spanish: 'para', vashen: 'PRA', type: 'connector', locked: true },
  { spanish: 'un', vashen: 'UN', type: 'connector', locked: true },
  { spanish: 'una', vashen: 'UN', type: 'connector', locked: true },
  { spanish: 'desde', vashen: 'DES', type: 'connector', locked: true },
  { spanish: 'hasta', vashen: 'HAS', type: 'connector', locked: true },
  { spanish: 'sobre', vashen: 'SOB', type: 'connector', locked: true },
  
  // Palabras del juego (canon) + nuevas
  { spanish: 'mar', vashen: 'VASH', root: 'VAS', type: 'noun', locked: true },
  { spanish: 'oceano', vashen: 'VASN', root: 'VAS', type: 'noun', locked: true },
  { spanish: 'tormenta', vashen: 'THALOS', root: 'THA', type: 'noun', locked: true },
  { spanish: 'viento', vashen: 'VENOS', root: 'VEN', type: 'noun', locked: true },
  { spanish: 'tierra', vashen: 'SHELAN', root: 'SHE', type: 'noun', locked: true },
  { spanish: 'isla', vashen: 'SHELAN', root: 'SHE', type: 'noun', locked: true },
  { spanish: 'hombre', vashen: 'NALOS', root: 'NAL', type: 'noun', locked: true },
  { spanish: 'padre', vashen: 'NALAN', root: 'NAL', type: 'noun', locked: true },
  { spanish: 'luz', vashen: 'ZELOS', root: 'ZEL', type: 'noun', locked: true },
  { spanish: 'oscuridad', vashen: 'NOKIS', root: 'NOK', type: 'noun', locked: true },
  { spanish: 'eco', vashen: 'EKOS', root: 'EKO', type: 'noun', locked: true },
  { spanish: 'memoria', vashen: 'EKON', root: 'EKO', type: 'noun', locked: true },
  { spanish: 'muerte', vashen: 'SOMOS', root: 'SOM', type: 'noun', locked: true },
  { spanish: 'silencio', vashen: 'SELEN', root: 'SEL', type: 'noun', locked: true },
  { spanish: 'fuego', vashen: 'VOROS', root: 'VOR', type: 'noun', locked: true },
  { spanish: 'agua', vashen: 'LUMEN', root: 'LUM', type: 'noun', locked: true },
  { spanish: 'barco', vashen: 'VASAN', root: 'VAS', type: 'noun', locked: true },
  { spanish: 'nave', vashen: 'VASAN', root: 'VAS', type: 'noun', locked: true },
  { spanish: 'estrella', vashen: 'ASTOS', root: 'AST', type: 'noun', locked: true },
  { spanish: 'noche', vashen: 'NOKEN', root: 'NOK', type: 'noun', locked: true },
  { spanish: 'dia', vashen: 'DIAR', root: 'DIA', type: 'noun', locked: true },
  
  // NUEVAS PALABRAS CLAVE
  { spanish: 'capitan', vashen: 'NALOS', root: 'NAL', type: 'noun', locked: true },
  { spanish: 'observa', vashen: 'SABEN', root: 'SAB', type: 'verb', locked: true },
  { spanish: 'puente', vashen: 'CONAN', root: 'CON', type: 'noun', locked: true }
];

// Alias para compatibilidad
export const INITIAL_DICTIONARY = FIXED_DICTIONARY;

// ============================================
// 14. NORMALIZACIÓN DE TEXTO
// ============================================
export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-zñ\\s!?.,;:-]/g, '')
    .trim();
}

// ============================================
// 15. TOKENIZAR TEXTO
// ============================================
export function tokenize(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  return normalized.split(/(\\s+)/).filter(token => token.length > 0);
}

// ============================================
// 16. TRADUCCIÓN PRINCIPAL
// ============================================
export async function translateToVashen(text, getEntry, saveEntry) {
  const tokens = tokenize(text);
  if (tokens.length === 0) {
    return { original: text, translated: '', words: [] };
  }

  const results = [];
  const outputTokens = [];
  const processedWords = new Set();

  for (const token of tokens) {
    if (/^\\s+$/.test(token)) {
      outputTokens.push(token);
      continue;
    }
    if (!/[a-zñ]/.test(token)) {
      outputTokens.push(token);
      continue;
    }

    const cleanWord = token.toLowerCase();
    
    const fixed = FIXED_DICTIONARY.find(e => e.spanish === cleanWord);
    if (fixed) {
      const existing = await getEntry(cleanWord);
      if (!existing) {
        await saveEntry(cleanWord, fixed.vashen, fixed.root || 'canon', true);
      }
      if (!processedWords.has(cleanWord)) {
        results.push({
          spanish: cleanWord,
          vashen: fixed.vashen,
          type: fixed.type,
          root: fixed.root,
          isCanon: true,
          isNew: !existing
        });
        processedWords.add(cleanWord);
      }
      outputTokens.push(fixed.vashen);
      continue;
    }

    const existing = await getEntry(cleanWord);
    if (existing) {
      if (!processedWords.has(cleanWord)) {
        results.push({
          spanish: cleanWord,
          vashen: existing.vashen_text,
          type: 'stored',
          isCanon: false,
          isNew: false
        });
        processedWords.add(cleanWord);
      }
      outputTokens.push(existing.vashen_text);
      continue;
    }

    const wordType = detectWordType(cleanWord);

    if (wordType === 'number') {
      const num = parseInt(cleanWord, 10);
      const vashenNum = composeNumber(num);
      await saveEntry(cleanWord, vashenNum, 'number', true);
      if (!processedWords.has(cleanWord)) {
        results.push({
          spanish: cleanWord,
          vashen: vashenNum,
          type: 'number',
          isNumber: true,
          isNew: true
        });
        processedWords.add(cleanWord);
      }
      outputTokens.push(vashenNum);
      continue;
    }

    if (CONNECTORS[cleanWord]) {
      const vashen = CONNECTORS[cleanWord];
      await saveEntry(cleanWord, vashen, 'connector', true);
      if (!processedWords.has(cleanWord)) {
        results.push({
          spanish: cleanWord,
          vashen: vashen,
          type: 'connector',
          isConnector: true,
          isNew: true
        });
        processedWords.add(cleanWord);
      }
      outputTokens.push(vashen);
      continue;
    }

    const generated = generateVashenWord(cleanWord, wordType, {});
    const vashen = generated.vashen;
    await saveEntry(cleanWord, vashen, generated.root, false);

    if (!processedWords.has(cleanWord)) {
      results.push({
        spanish: cleanWord,
        vashen: vashen,
        type: wordType,
        root: generated.root,
        suffix: generated.suffix,
        method: generated.method,
        field: generated.field,
        isNew: true
      });
      processedWords.add(cleanWord);
    }
    outputTokens.push(vashen);
  }

  return {
    original: text,
    translated: outputTokens.join(''),
    words: results
  };
}

// ============================================
// 17. INICIALIZAR DICCIONARIO
// ============================================
export async function initializeDictionary(saveEntry, getEntry) {
  console.log('Inicializando diccionario Vashén v2.0...');
  
  for (const entry of FIXED_DICTIONARY) {
    const existing = await getEntry(entry.spanish);
    if (!existing) {
      await saveEntry(
        entry.spanish,
        entry.vashen,
        entry.root || 'canon',
        entry.locked
      );
      console.log(`  ✓ ${entry.spanish} → ${entry.vashen}`);
    }
  }
  
  console.log('Diccionario Vashén inicializado.');
}
