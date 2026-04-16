import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Obtener entrada del léxico
export async function getLexiconEntry(spanishText) {
  const { data, error } = await supabase
    .from('lexicon')
    .select('*')
    .eq('spanish_text', spanishText.toLowerCase())
    .limit(1)
  
  if (error) {
    console.error('Error fetching lexicon:', error)
    return null
  }
  
  return data && data.length > 0 ? data[0] : null
}

// Guardar entrada (nueva firma compatible con v2.0)
export async function saveLexiconEntry(spanishText, vashenText, rootOrHash, locked = false) {
  const { data, error } = await supabase
    .from('lexicon')
    .insert([{
      spanish_text: spanishText.toLowerCase(),
      vashen_text: vashenText,
      root: typeof rootOrHash === 'string' ? rootOrHash : null,
      hash: typeof rootOrHash === 'string' ? null : rootOrHash,
      locked: locked
    }])
    .select()
  
  if (error) {
    console.error('Error saving lexicon:', error)
    return null
  }
  return data[0]
}

// Obtener todo el léxico
export async function getAllLexicon() {
  const { data, error } = await supabase
    .from('lexicon')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching all lexicon:', error)
    return []
  }
  return data
}

// Buscar en léxico
export async function searchLexicon(query) {
  const { data, error } = await supabase
    .from('lexicon')
    .select('*')
    .or(`spanish_text.ilike.%${query}%,vashen_text.ilike.%${query}%`)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error searching lexicon:', error)
    return []
  }
  return data
}
