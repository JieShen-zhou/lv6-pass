export interface DiffToken {
  text: string
  type: "match" | "missing" | "extra"
}

export function wordDiff(userText: string, referenceText: string): {
  userTokens: DiffToken[]
  refTokens: DiffToken[]
} {
  const userWords = userText.trim().split(/\s+/)
  const refWords = referenceText.trim().split(/\s+/)

  const lcs = longestCommonSubsequence(userWords, refWords)
  const userTokens: DiffToken[] = []
  const refTokens: DiffToken[] = []

  let ui = 0
  let ri = 0
  let li = 0

  while (ui < userWords.length || ri < refWords.length) {
    if (li < lcs.length) {
      while (ui < userWords.length && userWords[ui] !== lcs[li]) {
        userTokens.push({ text: userWords[ui], type: "extra" })
        ui++
      }
      while (ri < refWords.length && refWords[ri] !== lcs[li]) {
        refTokens.push({ text: refWords[ri], type: "missing" })
        ri++
      }
      if (ui < userWords.length && ri < refWords.length) {
        userTokens.push({ text: userWords[ui], type: "match" })
        refTokens.push({ text: refWords[ri], type: "match" })
        ui++
        ri++
        li++
      }
    } else {
      while (ui < userWords.length) {
        userTokens.push({ text: userWords[ui], type: "extra" })
        ui++
      }
      while (ri < refWords.length) {
        refTokens.push({ text: refWords[ri], type: "missing" })
        ri++
      }
    }
  }

  return { userTokens, refTokens }
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  const result: string[] = []
  let i = m
  let j = n
  while (i > 0 && j > 0) {
    if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
      result.unshift(a[i - 1])
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }
  return result
}
