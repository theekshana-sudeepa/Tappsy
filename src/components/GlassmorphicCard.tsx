import type { ReactNode } from "react"
import { View } from "react-native"

interface GlassmorphicCardProps {
  children: ReactNode
}

export default function GlassmorphicCard({ children }: GlassmorphicCardProps) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        width: 370,
      }}
    >
      {children}
    </View>
  )
}
