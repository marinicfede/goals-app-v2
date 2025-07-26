import { useState, useEffect } from 'react'
import { Save, Calendar, DollarSign, Target, Plus } from 'lucide-react'

const GoalSettings = () => {
  const [currentGoal, setCurrentGoal] = useState({
    targetAmount: 25000,
    currency: 'USD',
    currencySymbol: '$',
    startDate: '2024-05-05',
    endDate: '2024-11-02',
    title: 'Financial Goal 2024'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newGoal, setNewGoal] = useState({ ...currentGoal })

  const calculateWeeks = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.ceil(diffDays / 7)
  }

  const getCurrentWeek = (startDate) => {
    const start = new Date(startDate)
    const today = new Date()
    const diffTime = today - start
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(1, Math.ceil(diffDays / 7))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleSave = () => {
    setCurrentGoal({ ...newGoal })
    setIsEditing(false)
    // Here we'll save to Firebase
    console.log('Saving goal settings:', newGoal)
    alert('Goal settings saved successfully!')
  }

  const handleCancel = () => {
    setNewGoal({ ...currentGoal })
    setIsEditing(false)
  }

  const handleNewGoal = () => {
    const confirmed = confirm('Are you sure you want to create a new goal? This will archive your current progress.')
    if (confirmed) {
      setNewGoal({
        targetAmount: 25000,
        currency: 'USD',
        currencySymbol: '$',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months from now
        title: 'New Financial Goal'
      })
      setIsEditing(true)
    }
  }

  const totalWeeks = calculateWeeks(currentGoal.startDate, currentGoal.endDate)
  const currentWeek = getCurrentWeek(currentGoal.startDate)
  const weeklyTarget = currentGoal.targetAmount / totalWeeks

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Goal Settings</h2>
        <p className="text-gray-600">Configure your financial goals</p>
      </div>

      {/* Current Goal Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{currentGoal.title}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Edit
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Target Amount:</span>
            <span className="font-semibold text-gray-900">
              {currentGoal.currencySymbol}{currentGoal.targetAmount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Period:</span>
            <span className="font-semibold text-gray-900">
              {formatDate(currentGoal.startDate)} - {formatDate(currentGoal.endDate)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold text-gray-900">{totalWeeks} weeks</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Current Week:</span>
            <span className="font-semibold text-gray-900">Week {currentWeek} of {totalWeeks}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Weekly Target:</span>
            <span className="font-semibold text-green-600">
              {currentGoal.currencySymbol}{Math.round(weeklyTarget).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-4">Edit Goal Settings</h3>
          
          <div className="space-y-4">
            {/* Goal Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter goal title"
              />
            </div>

            {/* Currency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={newGoal.currency}
                onChange={(e) => {
                  const currency = e.target.value
                  const symbol = currency === 'USD' ? '$' : '€'
                  setNewGoal(prev => ({ ...prev, currency, currencySymbol: symbol }))
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD - Dollars</option>
                <option value="EUR">EUR - Euros</option>
              </select>
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount ({newGoal.currencySymbol})
              </label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25000"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={newGoal.startDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={newGoal.endDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Preview */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Preview:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Duration: {calculateWeeks(newGoal.startDate, newGoal.endDate)} weeks</p>
                <p>Weekly Target: {newGoal.currencySymbol}{Math.round(newGoal.targetAmount / calculateWeeks(newGoal.startDate, newGoal.endDate)).toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Save size={20} />
                  <span>Save Changes</span>
                </div>
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Goal Button */}
      <button
        onClick={handleNewGoal}
        className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg"
      >
        <div className="flex items-center justify-center space-x-2">
          <Plus size={20} />
          <span>Create New Goal</span>
        </div>
      </button>

      {/* Export Data */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full bg-blue-100 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors">
            Export to Excel
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Backup Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoalSettings

