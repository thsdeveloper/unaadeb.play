export function isEmptyObject(value: Object | null) {
  if (value === null) {
    return true
  }
  return Object.keys(value).length === 0 && value.constructor === Object
}
