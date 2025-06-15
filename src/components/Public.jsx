import React from 'react'
import { useNavigate } from 'react-router-dom'

const Public = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-slate-100 p-4">
      <div className="w-full max-w-5xl bg-white/60 backdrop-blur-lg rounded-3xl border border-slate-200 shadow-2xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-5xl  text-gray-800 mb-4">
          techNotes
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg mb-8">
          Write. Share. Manage — Smart Notes for Smart Teams.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm md:text-base font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Public
