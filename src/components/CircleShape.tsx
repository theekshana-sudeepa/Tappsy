import { View } from "react-native"

interface CircleShapeProps {
  width: number
  hieght: number // keeping the typo from original for compatibility
  fillColor?: string
  borderRadius: number
  topValue: number
  leftValue: number
  className?: string
}

export default function CircleShape({
  width,
  hieght,
  fillColor,
  borderRadius,
  topValue,
  leftValue,
  className,
}: CircleShapeProps) {
  return (
    <View
      style={{
        position: "absolute",
        width,
        height: hieght,
        backgroundColor: fillColor || "transparent",
        borderRadius,
        top: topValue,
        left: leftValue,
        opacity: 0.6,
      }}
      className={className}
    />
  )
}
