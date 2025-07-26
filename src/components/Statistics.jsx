import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Calendar, Target, Award } from 'lucide-react'

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('weekly') // weekly, monthly, all
  const [weeklyData, setWeeklyData] = useState([])

  // Sample data for demonstration
  useEffect(() => {
    const sampleData = Array.from({ length: 10 }, (_, i) => ({
      week: i + 1,
      maui: Math.floor(Math.random() * 500) + 200,
      steve: Math.floor(Math.random() * 300) + 100,
      photography: Math.floor(Math.random() * 600) + 300,
      expenses: Math.floor(Math.random() * 200) + 100,
      net: 0,
      total: 0
    }))
    
    sampleData.forEach(week => {
      week.total = week.maui + week.steve + week.photography
      week.net = week.total - week.expenses
    })
    
    setWeeklyData(sampleData)
  }, [])

  const calculateStats = () => {
    if (weeklyData.length === 0) return {}
    
    const totalNet = weeklyData.reduce((sum, week) => sum + week.net, 0)
    const totalIncome = weeklyData.reduce((sum, week) => sum + week.total, 0)
    const totalExpenses = weeklyData.reduce((sum, week) => sum + week.expenses, 0)
    const averageWeekly = totalNet / weeklyData.length
    const bestWeek = Math.max(...weeklyData.map(week => week.net))
    const worstWeek = Math.min(...weeklyData.map(week => week.net))
    
    // Source breakdown
    const mauiTotal = weeklyData.reduce((sum, week) => sum + week.maui, 0)
    const steveTotal = weeklyData.reduce((sum, week) => sum + week.steve, 0)
    const photographyTotal = weeklyData.reduce((sum, week) => sum + week.photography, 0)
    
    return {
      totalNet,
      totalIncome,
      totalExpenses,
      averageWeekly,
      bestWeek,
      worstWeek,
      mauiTotal,
      steveTotal,
      photographyTotal
    }
  }

  const stats = calculateStats()

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Statistics</h2>
        <p className="text-gray-600">Track your financial progress</p>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex space-x-2">
          {['weekly', 'monthly', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="text-green-500" size={20} />
            <span className="text-sm font-medium text-gray-600">Best Week</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.bestWeek || 0)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="text-blue-500" size={20} />
            <span className="text-sm font-medium text-gray-600">Average</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(Math.round(stats.averageWeekly || 0))}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="text-orange-500" size={20} />
            <span className="text-sm font-medium text-gray-600">Total Income</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.totalIncome || 0)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="text-purple-500" size={20} />
            <span className="text-sm font-medium text-gray-600">Net Total</span>
          </div>
          <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalNet || 0)}</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line 
                type="monotone" 
                dataKey="net" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Sources Breakdown */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Income Sources</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="maui" stackId="a" fill="#F97316" />
              <Bar dataKey="steve" stackId="a" fill="#3B82F6" />
              <Bar dataKey="photography" stackId="a" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">🏄‍♂️ Maui</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">🌾 Steve</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-500 rounded"></div>
            <span className="text-sm text-gray-600">📸 Photography</span>
          </div>
        </div>
      </div>

      {/* Source Totals */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Total by Source</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🏄‍♂️</span>
              </div>
              <span className="font-medium text-gray-900">Maui Surf Club</span>
            </div>
            <span className="font-bold text-gray-900">{formatCurrency(stats.mauiTotal || 0)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🌾</span>
              </div>
              <span className="font-medium text-gray-900">Steve</span>
            </div>
            <span className="font-bold text-gray-900">{formatCurrency(stats.steveTotal || 0)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📸</span>
              </div>
              <span className="font-medium text-gray-900">Photography</span>
            </div>
            <span className="font-bold text-gray-900">{formatCurrency(stats.photographyTotal || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics

