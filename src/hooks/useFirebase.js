import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  where 
} from 'firebase/firestore'

export const useFirebase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Save daily entry
  const saveDailyEntry = async (entryData) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = await addDoc(collection(db, 'dailyEntries'), {
        ...entryData,
        timestamp: new Date(),
        date: entryData.date || new Date().toISOString().split('T')[0]
      })
      setLoading(false)
      return docRef.id
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  // Get all daily entries
  const getDailyEntries = async () => {
    setLoading(true)
    setError(null)
    try {
      const q = query(collection(db, 'dailyEntries'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const entries = []
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() })
      })
      setLoading(false)
      return entries
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  // Save goal settings
  const saveGoalSettings = async (goalData) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = await addDoc(collection(db, 'goals'), {
        ...goalData,
        createdAt: new Date(),
        isActive: true
      })
      setLoading(false)
      return docRef.id
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  // Get active goal
  const getActiveGoal = async () => {
    setLoading(true)
    setError(null)
    try {
      const q = query(
        collection(db, 'goals'), 
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      let activeGoal = null
      querySnapshot.forEach((doc) => {
        if (!activeGoal) {
          activeGoal = { id: doc.id, ...doc.data() }
        }
      })
      setLoading(false)
      return activeGoal
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  // Update goal
  const updateGoal = async (goalId, updateData) => {
    setLoading(true)
    setError(null)
    try {
      const goalRef = doc(db, 'goals', goalId)
      await updateDoc(goalRef, updateData)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
  }

  return {
    loading,
    error,
    saveDailyEntry,
    getDailyEntries,
    saveGoalSettings,
    getActiveGoal,
    updateGoal
  }
}

