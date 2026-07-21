/**
 * Class name merger utility.
 * Simulates standard clsx/tailwind-merge style class joins.
 * @param {...*} inputs - Class names, conditions, or arrays of classes.
 * @returns {string} Joint string of resolved classes.
 */
export function cn(...inputs) {
  const classes = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const resolved = cn(...input)
      if (resolved) classes.push(resolved)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}

export default cn
