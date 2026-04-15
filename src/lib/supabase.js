import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getLexiconEntry(spanishText) {
  const { data, error } = await supabase
    .from('lexicon')
    .select('*')
    .eq('spanish_text', spanishText.toLowerCase())
    .limit(1)  // ← Cambiar .single() por .limit(1)
  
  // Si hay error real (no "no encontrado"), loguearlo
  if (error) {
    console.error('Error fetching lexicon:', error)
    return null
  }
  
  // Devolver el primer elemento o null
  return data && data.length > 0 ? data[0] : null
}

export async function saveLexiconEntry(spanishText, sanjotanesText, hash) {
  const { data, error } = await supabase
    .from('lexicon')
    .insert([{
      spanish_text: spanishText.toLowerCase(),
      sanjotanes_text: sanjotanesText,
      hash: hash,
      locked: true
    }])
    .select()
  
  if (error) {
    console.error('Error saving lexicon:', error)
    return null
  }
  return data[0]
}

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

export async function searchLexicon(query) {
  const { data, error } = await supabase
    .from('lexicon')
    .select('*')
    .or(`spanish_text.ilike.%${query}%,sanjotanes_text.ilike.%${query}%`)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error searching lexicon:', error)
    return []
  }
  return data
}
