import { useState, useEffect } from 'react'
import { saveLexiconEntry, getAllLexicon } from '../lib/supabase'
import { INITIAL_DICTIONARY } from '../lib/vashen'

export default function AddWord() {
  const [spanish, setSpanish] = useState('')
  const [vashen, setVashen] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [existingWords, setExistingWords] = useState([])

  useEffect(() => {
    const loadExisting = async () => {
      const data = await getAllLexicon()
      setExistingWords(data)
    }
    loadExisting()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!spanish.trim() || !vashen.trim()) {
      setMessage({ type: 'error', text: 'Ambos campos son obligatorios' })
      return
    }

    const cleanSpanish = spanish.toLowerCase().trim()
    const cleanVashen = vashen.toUpperCase().trim()

    const existsInFixed = INITIAL_DICTIONARY.find(e => e.spanish === cleanSpanish)
    if (existsInFixed) {
      setMessage({ type: 'error', text: `"${cleanSpanish}" ya existe como "${existsInFixed.vashen}"` })
      return
    }

    const spanishExists = existingWords.find(e => e.spanish_text === cleanSpanish)
    if (spanishExists) {
      setMessage({ type: 'error', text: `"${cleanSpanish}" ya existe` })
      return
    }

    const vashenExists = existingWords.find(e => e.vashen_text === cleanVashen)
    if (vashenExists) {
      setMessage({ type: 'error', text: `"${cleanVashen}" ya está usado por "${vashenExists.spanish_text}"` })
      return
    }

    const vashenInFixed = INITIAL_DICTIONARY.find(e => e.vashen === cleanVashen)
    if (vashenInFixed) {
      setMessage({ type: 'error', text: `"${cleanVashen}" ya está usado por "${vashenInFixed.spanish}"` })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const hash = cleanSpanish.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0).toString(16)

      const result = await saveLexiconEntry(cleanSpanish, cleanVashen, hash)
      
      if (result) {
        setMessage({ type: 'success', text: `✓ "${cleanSpanish}" → "${cleanVashen}" guardado` })
        setExistingWords([...existingWords, result])
        setSpanish('')
        setVashen('')
      } else {
        setMessage({ type: 'error', text: 'Error al guardar' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <h3 className="text-gold-500 font-semibold mb-4">Agregar Palabra al Diccionario</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Español</label>
            <input
              type="text"
              value={spanish}
              onChange={(e) => setSpanish(e.target.value)}
              placeholder="ej: capitán"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Vashén (MAYÚSCULAS)</label>
            <input
              type="text"
              value={vashen}
              onChange={(e) => setVashen(e.target.value.toUpperCase())}
              placeholder="ej: NALAN"
              className="input-field"
            />
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
    </div>
  )
}
