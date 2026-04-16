import { useState, useEffect } from 'react'
import { translateToVashen, initializeDictionary } from '../lib/vashen'
import { getLexiconEntry, saveLexiconEntry } from '../lib/supabase'

export default function Translator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [initError, setInitError] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        console.log('Iniciando carga de diccionario...')
        await initializeDictionary(saveLexiconEntry, getLexiconEntry)
        console.log('Diccionario cargado correctamente')
        setInitialized(true)
      } catch (err) {
        console.error('Error inicializando diccionario:', err)
        setInitError(err.message)
        setInitialized(true)
      }
    }
    init()
  }, [])

  const handleTranslate = async () => {
    if (!input.trim() || !initialized) return
    
    setLoading(true)
    try {
      const translation = await translateToVashen(input, getLexiconEntry, saveLexiconEntry)
      setResult(translation)
    } catch (err) {
      console.error('Error en traducción:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <label className="block text-gold-500 font-semibold mb-2">
          Texto en Español
        </label>
        
        {initError && (
          <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-700 rounded text-yellow-200 text-sm">
            ⚠️ Error de conexión con base de datos.
          </div>
        )}
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe aquí para traducir a Vashén..."
          className="input-field h-32 resize-none"
        />
        <button
          onClick={handleTranslate}
          disabled={loading || !initialized}
          className="btn-primary mt-4 w-full disabled:opacity-50"
        >
          {!initialized ? 'Cargando...' : loading ? 'Traduciendo...' : 'Convertir a Vashén'}
        </button>
      </div>

      {result && (
        <div className="panel border-gold-500/30">
          <h3 className="text-gold-500 font-semibold mb-4">Resultado</h3>
          
          <div className="mb-4">
            <label className="text-sm text-gray-400">Original:</label>
            <p className="text-lg whitespace-pre-wrap">{result.original}</p>
          </div>
          
          <div className="border-t border-ocean-700 pt-4">
            <label className="text-sm text-gold-600">Vashén:</label>
            <p className="text-2xl font-mono text-gold-500 whitespace-pre-wrap">
              {result.translated}
            </p>
          </div>
          
          {result.words.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">
                Palabras procesadas:
              </h4>
              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b border-ocean-700">
                  <tr>
                    <th className="text-left py-2">Español</th>
                    <th className="text-left py-2">Vashén</th>
                    <th className="text-left py-2">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {result.words.map((word, idx) => (
                    <tr key={idx} className="border-b border-ocean-700/50">
                      <td className="py-2 text-gray-300">{word.spanish}</td>
                      <td className="py-2 font-mono text-gold-400">
                        {word.vashen}
                      </td>
                      <td className="py-2">
                        {word.isFixed ? (
                          <span className="text-purple-400 text-xs bg-purple-900/30 px-2 py-1 rounded">
                            FIJO
                          </span>
                        ) : word.isConnector ? (
                          <span className="text-yellow-400 text-xs bg-yellow-900/30 px-2 py-1 rounded">
                            CONECTOR
                          </span>
                        ) : word.isNumber ? (
                          <span className="text-cyan-400 text-xs bg-cyan-900/30 px-2 py-1 rounded">
                            NÚMERO
                          </span>
                        ) : word.isNew ? (
                          <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">
                            NUEVO
                          </span>
                        ) : (
                          <span className="text-blue-400 text-xs bg-blue-900/30 px-2 py-1 rounded">
                            LOCKED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
