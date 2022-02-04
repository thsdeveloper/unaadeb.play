
const rgSpace = /\s/gi
const rgParentheses = /\(|\)/gi
const rgLetters = /[aA-zZ]/gi

export const nothingFormatter = (value: string) => value

export const passwordFormatter = (value: string) => value.replace(/\D/g, '')

export const cleanerNumber = (phoneNumber: string): string => {
  return phoneNumber
    .replace('+55', '')
    .replace(rgSpace, '')
    .replace(rgParentheses, '')
    .replace('-', '')
}

export const formatterPhoneNumber = (
  phoneNumber: string,
  deleting: boolean
): string => {
  if (deleting) {
    return phoneNumber
  }
  const rgInvalidCaracters = /[^a-zA-Z0-9\(\)\-\+\*\s]+/gi

  const hasLetters = phoneNumber.match(rgLetters)
  const hasInvalidCarachters = phoneNumber.match(rgInvalidCaracters)

  if (hasLetters !== null || hasInvalidCarachters !== null) {
    return phoneNumber.replace(rgLetters, '').replace(rgInvalidCaracters, '')
  }

  const cleanedNumber = cleanerNumber(phoneNumber)

  const ddd = cleanedNumber.slice(0, 2)
  const prefix = cleanedNumber.slice(2, 7)
  const sufix = cleanedNumber.slice(7)

  const formattedNumber =
    String(`${ddd}${prefix}${sufix}`).length > 0
      ? String(`(${ddd}) ${prefix.slice(0, 1)} ${prefix.slice(1)}-${sufix}`)
      : ''

  return formattedNumber
}

export const cpfFormatter = (value: string | number) => {
  const cpf = typeof value === 'string' ? value : value.toString()

  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const formatterDate = (
  dateString: string,
  deleting: boolean
): string => {
  if (deleting) {
    return dateString
  }

  const rgSlash = /\//gi
  const rgInvalidCaracters = /[^0-9\/]+/gi

  const hasInvalidCarachters = dateString.match(rgInvalidCaracters)

  if (hasInvalidCarachters !== null) {
    return dateString.replace(rgInvalidCaracters, '')
  }

  const cleanerdDateString = dateString.replace(rgSlash, '')

  const day = cleanerdDateString.slice(0, 2)
  const month = cleanerdDateString.slice(2, 4)
  const year = cleanerdDateString.slice(4)

  let formattedDate = ''

  if (year.length > 0) {
    formattedDate = String(`${day}/${month}/${year}`)
  } else {
    formattedDate = String(`${day}/${month}`)
  }
  return formattedDate
}

export const numberFormatter = (value: string) => {
  const rgInvalidCaracters = /[^0-9]/gi
  const hasInvalidCarachters = value.match(rgInvalidCaracters)

  if (hasInvalidCarachters !== null) {
    return value.replace(rgInvalidCaracters, '')
  }

  return value
}

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}