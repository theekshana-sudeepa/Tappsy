"use client"

import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../theme/ThemeProvider"

export default function GradientBackground() {
  const { applied } = useTheme()

  console.log("[v0] GradientBackground rendering with theme:", applied)

  const lightColors = ["#FFE5F1", "#E0C3FC", "#C3E5FF", "#D4F1F4"] as const
  const darkColors = ["#1a1a2e", "#16213e", "#0f3460", "#1a1a2e"] as const

  return (
    <LinearGradient
      colors={applied === "dark" ? darkColors : lightColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    />
  )
}
