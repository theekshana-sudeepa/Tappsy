import AsyncStorage from "@react-native-async-storage/async-storage"
import type React from "react"
import { createContext, useEffect, useMemo, useState } from "react"

type AuthContextType = {
  userId: string | null
  isLoading: boolean
  signUp: (id: string) => Promise<void>
  signIn: (id: string) => Promise<void> // Added signIn method for login flow
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const USER_ID_KEY = "userId" // saved name on AsyncStorage

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedId = await AsyncStorage.getItem(USER_ID_KEY)
        setUserId(storedId)
      } catch (error) {
        console.warn("Error restored userId", error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 4000)
      }
    }
    loadUser()
  }, [])

  const signUp = async (id: string) => {
    await AsyncStorage.setItem(USER_ID_KEY, id)
    setUserId(id)
  }

  const signIn = async (id: string) => {
    await AsyncStorage.setItem(USER_ID_KEY, id)
    setUserId(id)
  }

  const signOut = async () => {
    await AsyncStorage.removeItem(USER_ID_KEY)
    setUserId(null)
  }

  // when calling this hook if dependencies are changed otherwise it get previous data
  const value = useMemo(
    () => ({ userId, isLoading, signUp, signIn, signOut }), // Added signIn to context value
    [userId, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
