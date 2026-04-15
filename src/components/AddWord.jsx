import { useState, useEffect } from 'react'
import { saveLexiconEntry, getAllLexicon } from '../lib/supabase'
import { INITIAL_DICTIONARY } from '../lib/sanjotanes'

export default function AddWord() {
  const [spanish, setSpanish] = useState('')
  const [sanjotanes, setSanjotanes] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [existingWords, setExistingWords] = useState([])

  // Cargar todas las palabras existentes al montar
  useEffect(() => {
    const loadExisting = async () => {
      const data = await getAllLexicon()
      setExistingWords(data)
    }
    loadExisting()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!spanish.trim() || !sanjotanes.trim()) {
      setMessage({ type: 'error', text: 'Ambos campos son obligatorios' })
      return
    }

    // Normalizar
    const cleanSpanish = spanish.toLowerCase().trim()
    const cleanSanjotanes = sanjotanes.toLowerCase().trim()

    // 1. Verificar si ya existe en diccionario fijo
    const existsInFixed = INITIAL_DICTIONARY.find(e => e.spanish === cleanSpanish)
    if (existsInFixed) {
      setMessage({ type: 'error', text: `"${cleanSpanish}" ya existe en el diccionario fijo como "${existsInFixed.sanjotanes}"` })
      return
    }

    // 2. Verificar si la palabra español YA EXISTE en BD
    const spanishExists = existingWords.find(e => e.spanish_text === cleanSpanish)
    if (spanishExists) {
      setMessage({ type: 'error', text: `"${cleanSpanish}" ya existe en la base de datos como "${spanishExists.sanjotanes_text}"` })
      return
    }

    // 3. Verificar si la palabra SANJOTANES YA ESTÁ USADA por otra español
    const sanjotanesExists = existingWords.find(e => e.sanjotanes_text === cleanSanjotanes)
    if (sanjotanesExists) {
      setMessage({ type: 'error', text: `"${cleanSanjotanes}" ya está siendo usado por "${sanjotanesExists.spanish_text}". Cada palabra Sanjotanes debe ser única.` })
      return
    }

    // 4. Verificar en diccionario fijo (sanjo -> español)
    const sanjotanesInFixed = INITIAL_DICTIONARY.find(e => e.sanjotanes === cleanSanjotanes)
    if (sanjotanesInFixed) {
      setMessage({ type: 'error', text: `"${cleanSanjotanes}" ya está siendo usado por "${sanjotanesInFixed.spanish}" en el diccionario fijo.` })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Generar hash simple
      const hash = cleanSpanish.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0).toString(16)

      const result = await saveLexiconEntry(cleanSpanish, cleanSanjotanes, hash)
      
      if (result) {
        setMessage({ type: 'success', text: `✓ "${cleanSpanish}" → "${cleanSanjotanes}" guardado correctamente` })
        setExistingWords([...existingWords, result])
        setSpanish('')
        setSanjotanes('')
      } else {
        setMessage({ type: 'error', text: 'Error al guardar en la base de datos' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  const generateRandom = () => {
    const syllables = ["sha", "vek", "tor", "nal", "kel", "var", "zen", "ruk", "thal", "mor", "shel", "dren", "vak", "nor", "esh", "lir", "vos", "kan", "zel"]
    const count = Math.floor(Math.random() * 2) + 2
    let result = ''
    for (let i = 0; i < count; i++) {
      result += syllables[Math.floor(Math.random() * syllables.length)]
    }
    setSanjotanes(result)
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <h3 className="text-gold-500 font-semibold mb-4">Agregar Palabra al Diccionario</h3>
        <p className="text-gray-400 text-sm mb-6">
          Define manualmente una palabra en español y su traducción en Sanjotanes. 
          Una vez guardada, será permanente (LOCKED).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Palabra en Español</label>
            <input
              type="text"
              value={spanish}
              onChange={(e) => setSpanish(e.target.value)}
              placeholder="ej: capitán"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Traducción Sanjotanes</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sanjotanes}
                onChange={(e) => setSanjotanes(e.target.value)}
                placeholder="ej: drakvel"
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={generateRandom}
                className="px-4 py-2 bg-ocean-700 hover:bg-ocean-600 rounded text-sm"
              >
                🎲 Aleatorio
              </button>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded text-sm ${
              message.type === 'success' 
                ? 'bg-green-900/50 border border-green-700 text-green-200' 
                : 'bg-red-900/50 border border-red-700 text-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar Palabra'}
          </button>
        </form>
      </div>

      <div className="panel bg-ocean-800/50">
        <h4 className="text-gold-500 font-semibold mb-2">ℹ️ Reglas de validación</h4>
        <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
          <li>No se pueden repetir palabras en español</li>
          <li>No se pueden repetir palabras en Sanjotanes (1:1 obligatorio)</li>
          <li>No se pueden modificar palabras del diccionario fijo</li>
          <li>Todo se guarda como LOCKED permanentemente</li>
        </ul>
      </div>
    </div>
  )
}
