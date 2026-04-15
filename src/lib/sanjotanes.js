import CryptoJS from 'crypto-js'

const CONSONANT_MAP = {
  't': ['t', 'th', 'tr'], 'r': ['r', 'gh'], 'm': ['m', 'mn'],
  'n': ['n', 'nh'], 's': ['s', 'sh'], 'g': ['g', 'gh'],
  'b': ['b', 'v'], 'd': ['d', 'dh'], 'p': ['p', 'ph'],
  'c': ['c', 'ch', 'k'], 'k': ['k', 'kh'], 'l': ['l', 'lh'],
  'v': ['v', 'w'], 'f': ['f', 'ph'], 'j': ['j', 'jh'],
  'h': ['h', 'hh'], 'ñ': ['ñ', 'n'], 'q': ['q', 'qu'],
  'x': ['x', 'ks'], 'z': ['z', 'ts'], 'y': ['y', 'i']
}

const VOWEL_MAP = {
  'a': ['a', 'ah', 'aa'], 'e': ['e', 'eh'],
  'i': ['i', 'ih'], 'o': ['o', 'ao'], 'u': ['u', 'ou']
}

export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zñ\s!?]/g, '')
    .trim()
}

export function generateHash(text) {
  return CryptoJS.SHA1(text).toString().substring(0, 16)
}

function hashToSeed(hash) {
  let seed = 0
  for (let i = 0; i < hash.length; i++) {
    seed = ((seed << 5) - seed) + hash.charCodeAt(i)
    seed = seed & 0xFFFFFFFF
  }
  return Math.abs(seed)
}

function createPRNG(seed) {
  let s = seed
  return () => {
    s = Math.sin(s * 12.9898 + 78.233) * 43758.5453
    return s - Math.floor(s)
  }
}

function syllabify(word) {
  const vowels = 'aeiouáéíóúü'
  const syllables = []
  let current = ''
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    current += char
    
    if (vowels.includes(char) && i < word.length - 1) {
      const next = word[i + 1]
      const afterNext = word[i + 2]
      
      if (!vowels.includes(next)) {
        if (i + 2 < word.length && vowels.includes(afterNext)) {
          syllables.push(current)
          current = ''
        } else if (i + 2 >= word.length) {
          current += next
          syllables.push(current)
          current = ''
          i++
        }
      }
    }
  }
  
  if (current) syllables.push(current)
  
  if (syllables.length === 0 && word.length > 0) {
    for (let i = 0; i < word.length; i += 2) {
      syllables.push(word.substring(i, i + 2))
    }
  }
  
  return syllables.filter(s => s.length > 0)
}

function transformSyllable(syllable, prng) {
  let result = ''
  for (const char of syllable) {
    if (CONSONANT_MAP[char]) {
      const variants = CONSONANT_MAP[char]
      result += variants[Math.floor(prng() * variants.length)]
    } else if (VOWEL_MAP[char]) {
      const variants = VOWEL_MAP[char]
      result += variants[Math.floor(prng() * variants.length)]
    } else {
      result += char
    }
  }
  return result
}

export function generateSanjotanes(spanishWord, hash) {
  const seed = hashToSeed(hash)
  const prng = createPRNG(seed)
  const syllables = syllabify(spanishWord)
  
  if (syllables.length === 0) return spanishWord
  
  const transformed = syllables.map(syl => transformSyllable(syl, prng))
  let result = transformed.slice(0, 4).join('')
  result = result.replace(/[^a-z]/gi, '').toLowerCase()
  
  return result.length > 0 ? result : 'x' + hash.substring(0, 4)
}

export async function translateToSanjotanes(text, getEntry, saveEntry) {
  const normalized = normalizeText(text)
  if (!normalized) return { original: text, translated: '', words: [] }
  
  const words = normalized.split(/\s+/)
  const results = []
  
  for (const word of words) {
    if (!word) continue
    
    const match = word.match(/^([a-zñ]+)([!?]?)$/)
    if (!match) {
      results.push({ spanish: word, sanjotanes: word, isNew: false })
      continue
    }
    
    const [, cleanWord, punctuation] = match
    const existing = await getEntry(cleanWord)
    
    if (existing) {
      results.push({
        spanish: cleanWord,
        sanjotanes: existing.sanjotanes_text + punctuation,
        hash: existing.hash,
        isNew: false
      })
    } else {
      const hash = generateHash(cleanWord)
      const sanjotanes = generateSanjotanes(cleanWord, hash)
      await saveEntry(cleanWord, sanjotanes, hash)
      
      results.push({
        spanish: cleanWord,
        sanjotanes: sanjotanes + punctuation,
        hash: hash,
        isNew: true
      })
    }
  }
  
  return {
    original: text,
    translated: results.map(r => r.sanjotanes).join(' '),
    words: results
  }
}
