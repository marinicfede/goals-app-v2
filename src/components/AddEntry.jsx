import { useState } from 'react'
import { Save, Calendar } from 'lucide-react'

const AddEntry = () => {
  const [entries, setEntries] = useState({
    maui: '',
    steve: '',
    photography: '',
    expenses: ''
  })
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const handleInputChange = (field, value) => {
    setEntries(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateTotal = () => {
    const maui = parseFloat(entries.maui) || 0
    const steve = parseFloat(entries.steve) || 0
    const photography = parseFloat(entries.photography) || 0
    const expenses = parseFloat(entries.expenses) || 0
    return maui + steve + photography - expenses
  }

  const handleSave = () => {
    const total = calculateTotal()
    console.log('Saving entry:', { ...entries, total, date: selectedDate })
    // Here we'll integrate with Firebase
    
    // Reset form
    setEntries({
      maui: '',
      steve: '',
      photography: '',
      expenses: ''
    })
    
    // Show success message
    alert('Entry saved successfully!')
  }

  const isFormValid = () => {
    return Object.values(entries).some(value => value !== '')
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Daily Entry</h2>
        <p className="text-gray-600">Record your income and expenses</p>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-3 mb-3">
          <Calendar className="text-blue-500" size={20} />
          <span className="font-semibold text-gray-900">Date</span>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Income Entries */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Income Sources</h3>
        
        <div className="space-y-4">
          {/* Maui Surf Club */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white">🏄‍♂️</span>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maui Surf Club
              </label>
              <input
                type="number"
                placeholder="0"
                value={entries.maui}
                onChange={(e) => handleInputChange('maui', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Steve */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white">🌾</span>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Steve
              </label>
              <input
                type="number"
                placeholder="0"
                value={entries.steve}
                onChange={(e) => handleInputChange('steve', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Photography */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white">📸</span>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photography
              </label>
              <input
                type="number"
                placeholder="0"
                value={entries.photography}
                onChange={(e) => handleInputChange('photography', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Expenses</h3>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white">💸</span>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Expenses
            </label>
            <input
              type="number"
              placeholder="0"
              value={entries.expenses}
              onChange={(e) => handleInputChange('expenses', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Net Total:</span>
          <span className={`text-xl font-bold ${calculateTotal() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!isFormValid()}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
          isFormValid()
            ? 'bg-blue-500 hover:bg-blue-600 shadow-lg'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Save size={20} />
          <span>Save Entry</span>
        </div>
      </button>
    </div>
  )
}

export default AddEntry

