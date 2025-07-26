import { useState, useEffect } from 'react'
import { TrendingUp, Calendar, Target, DollarSign } from 'lucide-react'

const Dashboard = () => {
  const [currentGoal, setCurrentGoal] = useState({
    targetAmount: 25000,
    currency: 'USD',
    currencySymbol: '$',
    totalWeeks: 26,
    currentWeek: 10,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30')
  })

  const [weeklyData, setWeeklyData] = useState([])
  const [todayEntries, setTodayEntries] = useState({
    maui: 0,
    steve: 0,
    photography: 0,
    expenses: 0
  })

  // Calculate progress and predictions
  const calculateProgress = () => {
    const totalEarned = weeklyData.reduce((sum, week) => sum + week.net, 0)
    const progressPercentage = (totalEarned / currentGoal.targetAmount) * 100
    const weeksRemaining = currentGoal.totalWeeks - currentGoal.currentWeek
    const expectedAtThisPoint = (currentGoal.currentWeek / currentGoal.totalWeeks) * currentGoal.targetAmount
    const remainingAmount = currentGoal.targetAmount - totalEarned
    const adjustedWeeklyTarget = weeksRemaining > 0 ? remainingAmount / weeksRemaining : 0
    
    // Prediction based on current pace
    const averageWeekly = totalEarned / currentGoal.currentWeek
    const projectedTotal = averageWeekly * currentGoal.totalWeeks
    
    // Status color based on progress
    let statusColor = 'bg-orange-500' // Default: slightly behind
    if (totalEarned >= expectedAtThisPoint * 1.05) {
      statusColor = 'bg-green-500' // Ahead
    } else if (totalEarned < expectedAtThisPoint * 0.8) {
      statusColor = 'bg-red-500' // Very behind
    } else if (totalEarned >= expectedAtThisPoint * 0.95) {
      statusColor = 'bg-yellow-500' // On track
    }

    return {
      totalEarned,
      progressPercentage,
      adjustedWeeklyTarget,
      projectedTotal,
      statusColor,
      remainingAmount
    }
  }

  const progress = calculateProgress()

  // Sample data for demonstration
  useEffect(() => {
    // Initialize with some sample data
    const sampleWeeks = Array.from({ length: currentGoal.currentWeek }, (_, i) => ({
      week: i + 1,
      maui: Math.floor(Math.random() * 500) + 200,
      steve: Math.floor(Math.random() * 300) + 100,
      photography: Math.floor(Math.random() * 600) + 300,
      expenses: Math.floor(Math.random() * 200) + 100,
      net: 0
    }))
    
    sampleWeeks.forEach(week => {
      week.net = week.maui + week.steve + week.photography - week.expenses
    })
    
    setWeeklyData(sampleWeeks)
  }, [])

  const formatCurrency = (amount) => {
    return `${currentGoal.currencySymbol}${amount.toLocaleString()}`
  }

  const getStreakDays = () => {
    // Calculate consecutive days with entries
    return 15 // Sample value
  }

  const getLastWeekComparison = () => {
    if (weeklyData.length < 2) return null
    const thisWeek = weeklyData[weeklyData.length - 1]?.net || 0
    const lastWeek = weeklyData[weeklyData.length - 2]?.net || 0
    const change = thisWeek - lastWeek
    const percentage = lastWeek > 0 ? ((change / lastWeek) * 100).toFixed(1) : 0
    return { change, percentage, thisWeek, lastWeek }
  }

  const comparison = getLastWeekComparison()

  return (
    <div className="p-4 space-y-6">
      {/* Main Goal Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {formatCurrency(currentGoal.targetAmount)} goal
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${progress.statusColor}`}
              style={{ width: `${Math.min(progress.progressPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-600">Week {currentGoal.currentWeek} of {currentGoal.totalWeeks}</p>
          <p className="text-gray-900 font-semibold">
            Weekly target: {formatCurrency(Math.round(progress.adjustedWeeklyTarget))}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-blue-600 font-semibold text-lg">
            At this pace you'll reach: {formatCurrency(Math.round(progress.projectedTotal))}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-orange-500 rounded-2xl p-4 text-white">
          <div className="text-2xl font-bold">{formatCurrency(Math.round(progress.totalEarned))}</div>
          <div className="text-orange-100">Saved</div>
        </div>
        
        <div className="bg-blue-500 rounded-2xl p-4 text-white">
          <div className="text-2xl font-bold">{formatCurrency(5900)}</div>
          <div className="text-blue-100">Income</div>
        </div>
        
        <div className="bg-pink-500 rounded-2xl p-4 text-white">
          <div className="text-2xl font-bold">-{formatCurrency(3700)}</div>
          <div className="text-pink-100">Balance</div>
        </div>
        
        <div className="bg-green-500 rounded-2xl p-4 text-white">
          <div className="text-2xl font-bold">{formatCurrency(Math.round(progress.remainingAmount))}</div>
          <div className="text-green-100">Remaining</div>
        </div>
      </div>

      {/* Streak and Comparison */}
      <div className="space-y-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-semibold text-gray-900">{getStreakDays()} days streak</p>
              <p className="text-gray-600 text-sm">Keep it up!</p>
            </div>
          </div>
        </div>

        {comparison && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-500" size={20} />
              <div>
                <p className="font-semibold text-gray-900">
                  This week: {formatCurrency(comparison.thisWeek)} vs last week: {formatCurrency(comparison.lastWeek)}
                </p>
                <p className={`text-sm ${comparison.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comparison.change >= 0 ? '+' : ''}{comparison.percentage}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Today's Income Preview */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Today's income</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🏄‍♂️</span>
              </div>
              <span className="font-medium text-gray-900">Maui Surf Club</span>
            </div>
            <span className="font-semibold text-gray-900">{formatCurrency(todayEntries.maui)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🌾</span>
              </div>
              <span className="font-medium text-gray-900">Steve</span>
            </div>
            <span className="font-semibold text-gray-900">{formatCurrency(todayEntries.steve)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📸</span>
              </div>
              <span className="font-medium text-gray-900">Photography</span>
            </div>
            <span className="font-semibold text-gray-900">{formatCurrency(todayEntries.photography)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">💸</span>
              </div>
              <span className="font-medium text-gray-900">Expenses</span>
            </div>
            <span className="font-semibold text-red-600">-{formatCurrency(todayEntries.expenses)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

