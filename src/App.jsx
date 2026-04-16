import { useState } from 'react'
import Translator from './components/Translator'
import Dictionary from './components/Dictionary'
import ExportTool from './components/ExportTool'
import AddWord from './components/AddWord'

function App() {
  const [activeTab, setActiveTab] = useState('translator')

  const logoUrl = "https://raw.githubusercontent.com/marchup/Traductor/main/logo-san-jose.png"

  const tabs = [
    { id: 'translator', label: 'Traductor' },
    { id: 'dictionary', label: 'Diccionario' },
    { id: 'addword', label: 'Agregar Palabra' },
    { id: 'export', label: 'Exportar' }
  ]

  return (
    <div className="min-h-screen bg-ocean-900">
      <header className="bg-ocean-800 border-b border-ocean-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <img 
              src={logoUrl}
              alt="San José - Echoes from the Abyss" 
              className="h-16 w-auto rounded-full border-2 border-gold-500/50 shadow-lg shadow-gold-500/20"
            />
            <div>
              <h1 className="text-2xl font-bold text-gold-500">Vashén Lexicon Tool</h1>
              <p className="text-gray-400 text-sm">Lengua del Mar para San José</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-ocean-800 border-b border-ocean-700">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-gold-500 border-b-2 border-gold-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'translator' && <Translator />}
        {activeTab === 'dictionary' && <Dictionary />}
        {activeTab === 'addword' && <AddWord />}
        {activeTab === 'export' && <ExportTool />}
      </main>

      <footer className="border-t border-ocean-700 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          Vashén Lexicon Tool • San José: Echoes from the Abyss • 2024
        </div>
      </footer>
    </div>
  )
}

export default App
