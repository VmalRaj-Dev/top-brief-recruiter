import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreColor(score: string | number): string {
  const numericScore = typeof score === 'string' ? parseInt(score.replace('%', ''), 10) : score

  if (isNaN(numericScore)) return "text-gray-600"

  if (numericScore >= 90) return "text-green-600" // #16A34A
  if (numericScore >= 75) return "text-green-400" // #4ADE80
  if (numericScore >= 55) return "text-yellow-400" // #FACC15
  if (numericScore >= 35) return "text-orange-400" // #FB923C
  return "text-red-500" // #EF4444 (0-34%)
}

export function getScoreBadgeStyles(score: string | number) {
  const numericScore = typeof score === 'string' ? parseInt(score.replace('%', ''), 10) : score

  if (isNaN(numericScore)) return { bg: "bg-gray-100", border: "border-gray-200", text: "text-gray-700" }

  if (numericScore >= 90) return { bg: "bg-green-100", border: "border-green-200", text: "text-green-700" }
  if (numericScore >= 75) return { bg: "bg-green-50", border: "border-green-100", text: "text-green-600" }
  if (numericScore >= 55) return { bg: "bg-yellow-100", border: "border-yellow-200", text: "text-yellow-700" }
  if (numericScore >= 35) return { bg: "bg-orange-100", border: "border-orange-200", text: "text-orange-700" }
  return { bg: "bg-red-100", border: "border-red-200", text: "text-red-700" }
}
