export interface FloatingElementProps {
  size?: number
  color?: string
  top?: number
  left?: number
  delay?: number
}

export default function FloatingElement(_props: FloatingElementProps) {
  // Intentionally disabled decorative floating circles for a clean minimalist aesthetic
  return null
}
