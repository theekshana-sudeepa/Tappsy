"use client"

import { View } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

export default function GradientBackground() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
      }}
    />
  )
}
