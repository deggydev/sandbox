import { useState } from 'react'
import { Icon } from '@iconify/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 pb-2">
          Proyecto Inicializado
        </h1>
        
        <p className="text-xl text-gray-400 font-medium">
          Tailwind CSS e Iconify han sido integrados con éxito.
        </p>

        <div className="flex flex-wrap justify-center gap-8 py-8">
          <div className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:border-cyan-400 transition-colors cursor-default">
            <Icon icon="logos:tailwindcss-icon" className="text-6xl hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold text-gray-300">Tailwind CSS</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-400 transition-colors cursor-default">
            <Icon icon="simple-icons:iconify" className="text-6xl text-blue-400 hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold text-gray-300">Iconify</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:border-cyan-400 transition-colors cursor-default">
            <Icon icon="logos:react" className="text-6xl hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold text-gray-300">React</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:border-yellow-400 transition-colors cursor-default">
            <Icon icon="logos:vitejs" className="text-6xl hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold text-gray-300">Vite</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="group flex items-center gap-3 mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
          >
            <Icon icon="mdi:cursor-default-click" className="text-2xl group-hover:animate-bounce" />
            <span className="text-lg">Has hecho clic {count} veces</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
