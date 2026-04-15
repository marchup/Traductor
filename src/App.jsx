import { useState } from 'react'
import Translator from './components/Translator'
import Dictionary from './components/Dictionary'
import ExportTool from './components/ExportTool'

function App() {
  const [activeTab, setActiveTab] = useState('translator')

  return (
    <div className="min-h-screen bg-ocean-900">
      <header className="bg-ocean-800 border-b border-ocean-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gold-500">Sanjotanes Lexicon Tool</h1>
          <p className="text-gray-400 mt-1">Sistema determinista de idioma para San José</p>
        </div>
      </header>

      <nav className="bg-ocean-800 border-b border-ocean-700">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1">
          {['translator', 'dictionary', 'export'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-gold-500 border-b-2 border-gold-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab === 'translator' && 'Traductor'}
              {tab === 'dictionary' && 'Diccionario'}
              {tab === 'export' && 'Exportar'}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'translator' && <Translator />}
        {activeTab === 'dictionary' && <Dictionary />}
        {activeTab === 'export' && <ExportTool />}
      </main>
    </div>
  )
}

export default App
