import { nanoid } from 'nanoid'

export const getOrderCode = () => {
  return nanoid(8).toUpperCase()
}