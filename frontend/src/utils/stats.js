/**
 * Compute habit stats from completion dates (YYYY-MM-DD strings).
 * All values are derived client-side; no backend changes required.
 */
export function computeStats(dates) {
  const set = new Set(dates)
  const todayStr = new Date().toISOString().slice(0, 10) // stable cross-env baseline

  let currentStreak = 0
  let longestStreak = 0

  if (set.size > 0) {
    // Sort ascending
    const sorted = [...set].sort()
    let run = 1
    longestStreak = 1

    for (let i = 1; i < sorted.length; i++) {
      const prev = parseLocalDate(sorted[i - 1])
      const curr = parseLocalDate(sorted[i])
      const diff =
        (curr.getFullYear() - prev.getFullYear()) * 365 +
        (curr.getMonth() - prev.getMonth()) * 30 +
        (curr.getDate() - prev.getDate())
      if (diff === 1) {
        run += 1
        if (run > longestStreak) longestStreak = run
      } else {
        run = 1
      }
    }

    // Current streak: walk backward from today only if today (or yesterday,
    // for habits not yet completed today) is in the set.
    const today = parseLocalDate(todayStr)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const start = set.has(todayStr) ? today : set.has(formatLocal(yesterday)) ? yesterday : null
    if (start) {
      let cursor = new Date(start)
      while (true) {
        currentStreak += 1
        cursor.setDate(cursor.getDate() - 1)
        if (!set.has(formatLocal(cursor))) break
      }
    }
  }

  return { total: set.size, currentStreak, longestStreak }
}

function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatLocal(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
