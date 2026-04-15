import { useState } from 'react'
import { getAllLexicon } from '../lib/supabase'

export default function ExportTool() {
  const [message, setMessage] = useState(null)

  const exportToJSON = async () => {
    const data = await getAllLexicon()
    const exportData = data.map(e => ({
      spanish: e.spanish_text,
      sanjotanes: e.sanjotanes_text,
      hash: e.hash,
      locked: e.locked,
      created_at: e.created_at
    }))
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sanjotanes_lexicon_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage({ type: 'success', text: `Exportados ${data.length} registros` })
  }

  const exportToCSV = async () => {
    const data = await getAllLexicon()
    const headers = ['spanish', 'sanjotanes', 'hash', 'locked', 'created_at']
    const csv = [
      headers.join(','),
      ...data.map(e => [
        `"${e.spanish_text}"`, `"${e.sanjotanes_text}"`, `"${e.hash}"`, e.locked, `"${e.created_at}"`
      ].join(','))
    ].join('\n')
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sanjotanes_lexicon_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setMessage({ type: 'success', text: `Exportados ${data.length} registros` })
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <h3 className="text-gold-500 font-semibold mb-4">Exportar Lexicón</h3>
        <div className="flex gap-4">
          <button onClick={exportToJSON} className="btn-primary">Exportar JSON</button>
          <button onClick={exportToCSV} className="btn-primary bg-ocean-700 hover:bg-ocean-600">Exportar CSV</button>
        </div>
        {message && (
          <div className="mt-4 p-4 rounded-lg bg-green-900/50 border border-green-700 text-green-200">
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}
