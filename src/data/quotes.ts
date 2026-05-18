export interface Quote {
  en: string
  cn: string
}

export const quotes: Quote[] = [
  { en: "The secret of getting ahead is getting started.", cn: "前进的秘诀就是开始行动。" },
  { en: "Success is the sum of small efforts, repeated day in and day out.", cn: "成功是日复一日微小努力的总和。" },
  { en: "Don't watch the clock; do what it does. Keep going.", cn: "不要总看时钟，要效仿它——永不停歇。" },
  { en: "Believe you can and you're halfway there.", cn: "相信你能行，你就已经成功了一半。" },
  { en: "It always seems impossible until it's done.", cn: "在完成之前，一切看起来都不可能。" },
]

export function getDailyQuote(): Quote {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return quotes[dayOfYear % quotes.length]
}
