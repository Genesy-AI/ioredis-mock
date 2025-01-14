import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'

export function lpop(key, count = 1) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error(`Key ${key} does not contain a list`)
  }
  const list = this.data.get(key)

  if (!list) {
    return null
  }

  const items = list.slice(0, count)
  const remaining = list.slice(count)

  if (remaining.length > 0) {
    this.data.set(key, remaining)
  } else {
    this.data.delete(key)
  }

  return count === 1 ? items[0] : items
}

export function lpopBuffer(key, count) {
  const val = lpop.apply(this, [key, count])
  return convertStringToBuffer(val)
}
