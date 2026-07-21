export function serializeDoc(doc) {
  if (!doc) return null
  
  // If it's a Mongoose document, lean it
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : doc

  // Deep clone and transform
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    // Convert Mongoose ObjectIds to string
    if (value && typeof value === 'object' && value.toString && value.constructor && value.constructor.name === 'ObjectId') {
      return value.toString()
    }
    // Handle Date conversions
    if (value instanceof Date) {
      return value.toISOString()
    }
    return value
  }))
}

export function serializeList(list) {
  if (!Array.isArray(list)) return []
  return list.map(serializeDoc)
}

export default {
  serializeDoc,
  serializeList
}
