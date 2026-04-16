// VASHÉN LANGUAGE SYSTEM v2.0 - COHERENTE
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
// Regla: SOLO aplican a sustantivos
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
// Regla: SOLO aplican a verbos
export const VERB_EXTENSIONS = {
  EN: { type: 'continuidad', desc: 'acción continua/progresiva' },
  OR: { type: 'intencion', desc: 'acción dirigida/intencional' },
  AK: { type: 'intensidad', desc: 'acción intensa/perfectiva' }
};

// ============================================
// 4. CONECTORES (12 fijos - CANON)
// ============================================
export const CONNECTORS = {
  // Artículos
  'el': 'ELA',
  'la': 'ELA',
  'los': 'ELAS',
  'las': 'ELAS',
  'un': 'UN',
  'una': 'UN',
  
  // Preposiciones
  'de': 'DEL',
  'del': 'DEL',
  'a': 'A',
  'al': 'A',
  'en': 'EN',
  'con': 'KON',
  'sin': 'SIN',
  'por': 'PRA',
  'para': 'PRA',
  
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

// Composición para 11+: DEKA + UNI, etc.
export function composeNumber(n) {
  if (n <= 10) return NUMBERS[String(n)] || 'NUL';
  if (n < 20) return 'DEKA' + NUMBERS[String(n - 10)];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const units = n % 10;
    return NUMBERS[String(tens)] + 'DEKA' + (units > 0 ? NUMBERS[String(units)] : '');
  }
  return 'NUL'; // Por ahora solo 0-99
}

// ============================================
// 6. REGLAS FONÉTICAS (CANON)
// ============================================
// Evitar: AA, AE, EA, duplicación conflictiva
export function applyPhoneticRules(base, suffix) {
  let result = base + suffix;
  
  // Regla 1: AA → A
  result = result.replace(/AA/g, 'A');
  
  // Regla 2: AE → E
  result = result.replace(/AE/g, 'E');
  
  // Regla 3: EA → A (fusionar, priorizar vocal posterior)
  result = result.replace(/EA/g, 'A');
  
  // Regla 4: AO → O
  result = result.replace(/AO/g, 'O');
  
  // Regla 5: OA → A
  result = result.replace(/OA/g, 'A');
  
  // Regla 6: EE → E
  result = result.replace(/EE/g, 'E');
  
  // Regla 7: OO → O
  result = result.replace(/OO/g, 'O');
  
  return result;
}

// ============================================
// 7. MAPEO SEMÁNTICO ESTRICTO (CANON)
// ============================================
// Jerarquía: palabra exacta → campo semántico → raíz relacionada
const SEMANTIC_MAP = {
  // MAR / AGUA (VAS, LUM)
  'mar': 'VAS',
  'oceano': 'VAS',
  'agua': 'VAS',
  'ola': 'LUM',
  'rio': 'LUM',
  'lago': 'VAS',
  'charco': 'LUM',
  'lluvia': 'THA',
  'rocio': 'THA',
  'nieve': 'THA',
  'hielo': 'THA',
  'vapor': 'VEN',
  'niebla': 'VEN',
  
  // VIENTO / CLIMA (VEN, THA)
  'viento': 'VEN',
  'aire': 'VEN',
  'brisa': 'VEN',
  'tormenta': 'THA',
  'huracan': 'THA',
  'tempestad': 'THA',
  'trueno': 'THA',
  'relampago': 'THA',
  
  // FUEGO / CALOR (VOR)
  'fuego': 'VOR',
  'calor': 'VOR',
  'llama': 'VOR',
  'brasas': 'VOR',
  'quemar': 'VOR',
  'arder': 'VOR',
  'ceniza': 'VOR',
  
  // TIERRA / GEOGRAFÍA (SHE, KAL, SIL)
  'tierra': 'SHE',
  'suelo': 'SHE',
  'arena': 'SHE',
  'barro': 'SHE',
  'piedra': 'KAL',
  'roca': 'KAL',
  'montana': 'KAL',
  'cerro': 'KAL',
  'isla': 'SHE',
  'peninsula': 'SHE',
  'costa': 'SHE',
  'playa': 'SHE',
  'arbol': 'SIL',
  'bosque': 'SIL',
  'madera': 'SIL',
  'hoja': 'SIL',
  'raiz': 'SIL',
  'flor': 'SIL',
  
  // HUMANOS / VIDA (NAL, BES, SOM)
  'hombre': 'NAL',
  'mujer': 'NAL',
  'persona': 'NAL',
  'gente': 'NAL',
  'hijo': 'NAL',
  'padre': 'NAL',
  'madre': 'NAL',
  'familia': 'NAL',
  'animal': 'BES',
  'pez': 'BES',
  'pajaro': 'BES',
  'bestia': 'BES',
  'muerte': 'SOM',
  'morir': 'SOM',
  'muerto': 'SOM',
  'sueno': 'SOM',
  'pesadilla': 'SOM',
  'fantasma': 'SOM',
  
  // PELIGRO / FUERZA (MOR, KOR)
  'peligro': 'MOR',
  'miedo': 'MOR',
  'terror': 'MOR',
  'dano': 'MOR',
  'dolor': 'MOR',
  'herida': 'MOR',
  'enfermedad': 'MOR',
  'plaga': 'MOR',
  'fuerza': 'KOR',
  'poder': 'KOR',
  'fuerte': 'KOR',
  'bravo': 'KOR',
  'guerrero': 'KOR',
  'arma': 'KOR',
  'escudo': 'KOR',
  
  // LUZ / OSCURIDAD (ZEL, NOK, DIA)
  'luz': 'ZEL',
  'claridad': 'ZEL',
  'esperanza': 'ZEL',
  'estrella': 'AST',
  'sol': 'DIA',
  'dia': 'DIA',
  'amanecer': 'DIA',
  'atardecer': 'DIA',
  'noche': 'NOK',
  'oscuridad': 'NOK',
  'negro': 'NOK',
  'sombra': 'NOK',
  'luna': 'AST',
  
  // CONOCIMIENTO / HABLA (SAB, DRA, CRE)
  'saber': 'SAB',
  'conocer': 'SAB',
  'sabio': 'SAB',
  'pensar': 'SAB',
  'idea': 'SAB',
  'mente': 'SAB',
  'recuerdo': 'EKO',
  'memoria': 'EKO',
  'hablar': 'DRA',
  'decir': 'DRA',
  'voz': 'DRA',
  'palabra': 'DRA',
  'idioma': 'DRA',
  'nombre': 'DRA',
  'llamar': 'DRA',
  'creer': 'CRE',
  'fe': 'CRE',
  'dios': 'CRE',
  'santo': 'CRE',
  'oracion': 'CRE',
  'altar': 'CRE',
  
  // ACCIÓN / CONSTRUCCIÓN (CON, RAK)
  'hacer': 'CON',
  'construir': 'CON',
  'crear': 'CON',
  'fabricar': 'CON',
  'casa': 'CON',
  'barco': 'VAS',
  'nave': 'VAS',
  'vela': 'VEN',
  'ir': 'RAK',
  'venir': 'RAK',
  'mover': 'RAK',
  'viajar': 'RAK',
  'caminar': 'RAK',
  'navegar': 'VAS',
  'zarpar': 'RAK',
  'llegar': 'RAK',
  
  // SILENCIO / PAZ (SEL)
  'silencio': 'SEL',
  'paz': 'SEL',
  'calma': 'SEL',
  'quieto': 'SEL',
  'tranquilo': 'SEL',
  'descanso': 'SEL',
  
  // TIEMPO (TEM)
  'tiempo': 'TEM',
  'ahora': 'TEM',
  'antes': 'TEM',
  'despues': 'TEM',
  'ayer': 'TEM',
  'manana': 'TEM',
  'siempre': 'TEM',
  'nunca': 'TEM',
  'ano': 'TEM',
  'edad': 'TEM',
  'epoca': 'TEM',
  'siglo': 'TEM'
};

// ============================================
// 8. DETECTAR TIPO DE PALABRA
// ============================================
const VERB_INDICATORS = ['ar', 'er', 'ir', 'ando', 'iendo', 'ado', 'ido'];
const ADJECTIVE_INDICATORS = ['oso', 'osa', 'able', 'ible', 'ente', 'ante'];

export function detectWordType(word) {
  const w = word.toLowerCase();
  
  // Verbos (terminaciones comunes)
  if (VERB_INDICATORS.some(end => w.endsWith(end))) return 'verb';
  
  // Adjetivos
  if (ADJECTIVE_INDICATORS.some(end => w.endsWith(end))) return 'adjective';
  
  // Números
  if (/^\\d+$/.test(w)) return 'number';
  
  // Conectores
  if (CONNECTORS[w]) return 'connector';
  
  // Por defecto: sustantivo
  return 'noun';
}

// ============================================
// 9. SELECCIONAR RAÍZ (JERARQUÍA CANON)
// ============================================
// Orden: 1. Palabra exacta → 2. Campo semántico → 3. Derivación coherente
export function selectRoot(spanishWord, wordType) {
  const w = spanishWord.toLowerCase().trim();
  
  // 1. Buscar mapeo exacto
  if (SEMANTIC_MAP[w]) {
    return { root: SEMANTIC_MAP[w], method: 'exact', field: ROOTS[SEMANTIC_MAP[w]].field };
  }
  
  // 2. Buscar por inclusión (substring)
  for (const [key, root] of Object.entries(SEMANTIC_MAP)) {
    if (w.includes(key)) {
      return { root, method: 'partial', field: ROOTS[root].field };
    }
  }
  
  // 3. Selección por tipo de palabra (fallback coherente)
  let fallbackRoot = 'SHE'; // tierra como default
  
  if (wordType === 'verb') fallbackRoot = 'RAK'; // movimiento
  else if (wordType === 'adjective') fallbackRoot = 'IS'; // estado (usar sufijo IS)
  else if (w.length < 4) fallbackRoot = 'NAL'; // cosas pequeñas → humano
  
  // Determinista: usar hash de la palabra para seleccionar variante
  const hash = w.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const rootKeys = Object.keys(ROOTS);
  const selectedRoot = rootKeys[hash % rootKeys.length];
  
  return { root: selectedRoot, method: 'derived', field: ROOTS[selectedRoot].field };
}

// ============================================
// 10. GENERAR PREFIJO (2 primeras letras de raíz)
// ============================================
export function generatePrefix(rootKey) {
  return rootKey.substring(0, 2);
}

// ============================================
// 11. SELECCIONAR SUFIJO (según tipo y contexto)
// ============================================
export function selectSuffix(wordType, context) {
  if (wordType === 'verb') {
    // Verbos: usar extensiones verbales
    // Por defecto: EN (continuidad)
    return { suffix: 'EN', type: 'verb', desc: VERB_EXTENSIONS['EN'].desc };
  }
  
  if (wordType === 'adjective') {
    // Adjetivos: usar IS (estado/cualidad)
    return { suffix: 'IS', type: 'noun', desc: NOUN_SUFFIXES['IS'].desc };
  }
  
  // Sustantivos: seleccionar según semántica
  // Seres vivos → OS, Lugares/objetos → AN, Abstractos → EN
  if (context.isLiving) return { suffix: 'OS', type: 'noun', desc: NOUN_SUFFIXES['OS'].desc };
  if (context.isPlace) return { suffix: 'AN', type: 'noun', desc: NOUN_SUFFIXES['AN'].desc };
  if (context.isAbstract) return { suffix: 'EN', type: 'noun', desc: NOUN_SUFFIXES['EN'].desc };
  if (context.isEvent) return { suffix: 'AK', type: 'noun', desc: NOUN_SUFFIXES['AK'].desc };
  
  // Default: AN (objeto/lugar) - más común
  return { suffix: 'AN', type: 'noun', desc: NOUN_SUFFIXES['AN'].desc };
}

// ============================================
// 12. GENERAR PALABRA VASHÉN (CANON)
// ============================================
export function generateVashenWord(spanishWord, wordType, context) {
  // 1. Seleccionar raíz según jerarquía
  const { root: rootKey, method, field } = selectRoot(spanishWord, wordType);
  const root = ROOTS[rootKey];
  
  // 2. Seleccionar variante de raíz (determinista)
  const hash = spanishWord.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const variantIndex = hash % root.variants.length;
  const variant = root.variants[variantIndex];
  
  // 3. Seleccionar sufijo según tipo
  const { suffix, type: suffixType } = selectSuffix(wordType, context || {});
  
  // 4. Aplicar reglas fonéticas
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
// 13. DICCIONARIO INICIAL (PALABRAS FIJAS)
// ============================================
// Estas palabras son CANON y nunca cambian
export const FIXED_DICTIONARY = [
  // Conectores (obligatorios)
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
  
  // Palabras del juego (canon)
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
  { spanish: 'dia', vashen: 'DIAR', root: 'DIA', type: 'noun', locked: true }
];

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
// 15. TOKENIZAR TEXTO (CORREGIDO)
// ============================================
export function tokenize(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  // Separar por espacios manteniendo la estructura
  return normalized.split(/(\s+)/).filter(token => token.length > 0);
}

// ============================================
// 16. TRADUCCIÓN PRINCIPAL (CANON) - CORREGIDO
// ============================================
export async function translateToVashen(text, getEntry, saveEntry) {
  const tokens = tokenize(text);
  if (tokens.length === 0) {
    return { original: text, translated: '', words: [] };
  }

  const results = [];
  const outputTokens = [];
  const processedWords = new Set(); // Para evitar duplicados en la tabla

  for (const token of tokens) {
    // Mantener espacios y puntuación tal cual
    if (/^\s+$/.test(token)) {
      outputTokens.push(token);
      continue;
    }

    // Puntuación (mantenerla)
    if (!/[a-zñ]/.test(token)) {
      outputTokens.push(token);
      continue;
    }

    const cleanWord = token.toLowerCase();

    // 1. Buscar en diccionario fijo (CANON)
    const fixed = FIXED_DICTIONARY.find(e => e.spanish === cleanWord);
    if (fixed) {
      // Guardar en BD si no existe (para persistencia)
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

    // 2. Buscar en BD (palabras ya generadas)
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

    // 3. Detectar tipo y generar
    const wordType = detectWordType(cleanWord);

    // Números
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

    // Conectores (deberían estar en FIXED, pero por si acaso)
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

    // 4. Generar nueva palabra según especificación
    const generated = generateVashenWord(cleanWord, wordType, {});
    const vashen = generated.vashen;

    // Guardar en BD
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

  // Unir preservando espacios originales
  return {
    original: text,
    translated: outputTokens.join(''),
    words: results
  };
}

