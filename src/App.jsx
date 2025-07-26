import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, DollarSign, Plus, BarChart3, Settings } from 'lucide-react'
import Dashboard from './components/Dashboard'
import AddEntry from './components/AddEntry'
import Statistics from './components/Statistics'
import GoalSettings from './components/GoalSettings'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'add':
        return <AddEntry />
      case 'statistics':
        return <Statistics />
      case 'settings':
        return <GoalSettings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">💵</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Goals</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-20">
        {renderCurrentView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            
            <button
              onClick={() => setCurrentView('statistics')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentView === 'statistics'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={20} />
              <span className="text-xs mt-1">Stats</span>
            </button>

            <button
              onClick={() => setCurrentView('add')}
              className="flex flex-col items-center py-2 px-3 rounded-lg bg-blue-500 text-white shadow-lg"
            >
              <Plus size={24} />
            </button>

            <button
              onClick={() => setCurrentView('settings')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentView === 'settings'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings size={20} />
              <span className="text-xs mt-1">Settings</span>
            </button>

            <button
              className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-gray-900"
            >
              <DollarSign size={20} />
              <span className="text-xs mt-1">USD</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App

