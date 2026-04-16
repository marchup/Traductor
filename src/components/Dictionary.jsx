import { useState, useEffect } from 'react'
import { getAllLexicon, searchLexicon } from '../lib/supabase'

export default function Dictionary() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    const data = await getAllLexicon()
    setEntries(data)
    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadEntries()
      return
    }
    const data = await searchLexicon(searchQuery)
    setEntries(data)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar palabra..."
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary">Buscar</button>
      </form>

      <div className="panel overflow-hidden">
        <h3 className="text-gold-500 font-semibold mb-4">Lexicón Vashén</h3>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ocean-900 text-gray-400 text-sm">
                <tr>
                  <th className="text-left py-3 px-4">Español</th>
                  <th className="text-left py-3 px-4">Vashén</th>
                  <th className="text-left py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-700">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-ocean-700/30">
                    <td className="py-3 px-4 text-gray-200">{entry.spanish_text}</td>
                    <td className="py-3 px-4 font-mono text-gold-400">
                      {entry.vashen_text}
                    </td>
                    <td className="py-3 px-4">
                      {entry.locked ? (
                        <span className="px-2 py-1 rounded text-xs bg-blue-900/50 text-blue-400 border border-blue-700">
                          LOCKED
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs bg-yellow-900/50 text-yellow-400 border border-yellow-700">
                          UNLOCKED
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
    </div>
  )
}
