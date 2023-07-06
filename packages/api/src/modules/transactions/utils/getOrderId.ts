import { nanoid } from 'nanoid'

export const getOrderId = () => {
  return nanoid(5).toUpperCase()
}