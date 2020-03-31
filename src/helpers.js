import _ from 'lodash'
import places from './db/places'

export const normalPhone = (phone = '', chunk = 0) => {
  return _.chain(phone)
    .replace(' ', '')
    .replace('+34', '')
    .replace('034', '')
    .split('')
    .chunk(3)
    .map(chunk => chunk.join(''))
    .join(' ')
    .value()
}

export const placeNameById = (placeId) => {
  return places.find(({ id }) => id === placeId)
}

export const normalizeTitle = (str = '') => {
  return str.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

const shortName = (str = '') => {
  const [name,surname] = str.split(' ')  
  if (typeof surname === 'undefined') {    
    return name
  } else {
    return name + ' ' + surname.toUpperCase().charAt(0) + '.'
  }
  
}

export const normalizeName = (str = '') => {
  return normalizeTitle(shortName(str))
}