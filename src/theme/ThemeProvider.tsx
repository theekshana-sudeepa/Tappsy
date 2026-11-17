import AsyncStorage from "@react-native-async-storage/async-storage"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { Appearance, Platform } from "react-native"

export type ThemeOption = "light" | "dark" | "system"

const THEME_KEY = "@app_color_scheme"

type ThemeContextType = {
  preference: ThemeOption
  applied: "light" | "dark"
  setPreference: (themeOption: ThemeOption) => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, forceTheme }: { children: React.ReactNode; forceTheme?: "light" | "dark" }) {
  const [preferenceState, setPreferenceState] = useState<ThemeOption>("system")
  const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">("dark")
  const [isInitialized, setIsInitialized] = useState(false)

  const getSystemTheme = (): "light" | "dark" => {
    const systemScheme = Appearance.getColorScheme()
    console.log("Detecting system theme on", Platform.OS, ":", systemScheme)
    return systemScheme === "dark" ? "dark" : "light"
  }

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const systemTheme = getSystemTheme()
        setPreferenceState("system")
        setAppliedTheme(systemTheme)
        console.log("Applied system theme:", systemTheme)
      } catch (error) {
        console.error("Theme initialization error:", error)
        const systemTheme = getSystemTheme()
        setAppliedTheme(systemTheme)
      } finally {
        setIsInitialized(true)
      }
    }

    initializeTheme()
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    if (preferenceState === "system") {
      console.log("Setting up system theme listener")

      // Apply current system theme immediately
      const currentSystemTheme = getSystemTheme()
      setAppliedTheme(currentSystemTheme)
      console.log("Applied current system theme:", currentSystemTheme)

      // Listen for changes
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        const newTheme = colorScheme === "dark" ? "dark" : "light"
        console.log("System theme changed to:", newTheme)
        setAppliedTheme(newTheme)
      })

      return () => {
        console.log("Removing system theme listener")
        subscription.remove()
      }
    }
  }, [preferenceState, isInitialized])

  const setPreference = async (themeOption: ThemeOption) => {
    console.log("Setting theme preference to:", themeOption)

    try {
      if (themeOption === "system") {
        await AsyncStorage.removeItem(THEME_KEY)
        const systemTheme = getSystemTheme()
        setPreferenceState("system")
        setAppliedTheme(systemTheme)
        console.log("Switched to system theme:", systemTheme)
      } else {
        await AsyncStorage.setItem(THEME_KEY, themeOption)
        setPreferenceState(themeOption)
        setAppliedTheme(themeOption)
        console.log("Switched to manual theme:", themeOption)
      }
    } catch (error) {
      console.error("Failed to save theme preference:", error)
    }
  }

  if (!isInitialized) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        preference: forceTheme || preferenceState,
        applied: forceTheme || appliedTheme,
        setPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }
  return ctx
}
