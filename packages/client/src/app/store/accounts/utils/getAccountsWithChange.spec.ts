import { generateAccount } from "app/tests/account.testfactory"
import { getAccountsWithChange, getChangeDirection } from "./getAccountsWithChange"
import { ChangeDirection } from "../types"

describe('getAccountsWithChange', () => {

  describe('getChangeDirection', () => {
    it('should return `increase` if the new value is higher', () => {
      const actual = getChangeDirection(0, 11)

      expect(actual).toBe(ChangeDirection.Increase)
    })

    it('should return `decrease` if the new value is lower', () => {
      const actual = getChangeDirection(11, 0)

      expect(actual).toBe(ChangeDirection.Decrease)
    })

    it('should return `no-change` if the new value is `undefined`', () => {
      const actual = getChangeDirection(undefined, 1)

      expect(actual).toBe(ChangeDirection.NoChange)
    })

    it('should return `no-change` if the new value is the same', () => {
      const actual = getChangeDirection(1, 1)

      expect(actual).toBe(ChangeDirection.NoChange)
    })
  })

  describe('getAccountsWithChange', () => {
    it('should return the accounts collection with change direction if the balances changed', () => {
      const originalCollection = [
        generateAccount(),
        {
          ...generateAccount(),
          balance: 1,
          availableBalance: 2
        }
      ]

      const newCollection = [
        originalCollection[0],
        {
          ...originalCollection[1],
          balance: 5,
          availableBalance: 6
        }
      ]

      const actual = getAccountsWithChange(originalCollection, newCollection)

      expect(actual).toEqual([
        {
          ...newCollection[0],
          changeDirection: ChangeDirection.NoChange
        },
        {
          ...newCollection[1],
          changeDirection: ChangeDirection.Increase
        }
      ])
    })
  })
})