export function zrem(key, ...vals) {
  const map = this.data.get(key)
  if (!map) return 0

  let removed = 0
  vals.forEach(val => {
    if (map.delete(val)) {
      removed++
    }
  })

  if (map.size > 0) {
    this.data.set(key, map)
  } else {
    this.data.delete(key)
  }
  return removed
}

export const zremBuffer = zrem
