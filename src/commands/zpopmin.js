import orderBy from 'lodash.orderby'

import { convertStringToBuffer } from '../commands-utils/convertStringToBuffer'
import { slice } from './zrange-command.common'

export function zpopmin(key, count = 1) {
  const map = this.data.get(key)

  if (map == null || !(map instanceof Map)) {
    return []
  }

  const ordered = slice(
    orderBy(Array.from(map.values()), ['score', 'value']),
    0,
    count - 1
  )

  ordered.forEach(it => {
    map.delete(it.value)
  })
  if (map.size > 0) {
    this.data.set(key, map)
  } else {
    this.data.delete(key)
  }

  return ordered.flatMap(it => [it.value, it.score])
}

export function zpopminBuffer(...args) {
  const val = zpopmin.apply(this, args)
  return convertStringToBuffer(val)
}
