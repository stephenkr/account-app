import { generateAccount } from "app/tests/account.testfactory"
import { getAccountsWithChange, getChangeDirection, getSingleAccountWithChange } from "./getAccountsWithChange"
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

    it('should return `no-change` if the new value is the same', () => {
      const actual = getChangeDirection(1, 1)

      expect(actual).toBe(ChangeDirection.NoChange)
    })

    describe('falsy values', () => {
      it('should return `no-change` if the new value is `undefined`', () => {
        const actual = getChangeDirection(undefined, 1)

        expect(actual).toBe(ChangeDirection.NoChange)
      })

      it('should return `no-change` if the new value is `null`', () => {
        const actual = getChangeDirection(null, 1)

        expect(actual).toBe(ChangeDirection.NoChange)
      })
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

  describe('getSingleAccountWithChange', () => {
    it('should return the new account with change direction if the balances changed', () => {
      const originalAccount = {
        ...generateAccount(),
        balance: 1,
        availableBalance: 2
      }

      const newAccount = {
        ...originalAccount,
        balance: 10,
        availableBalance: 15
      }

      const actual = getSingleAccountWithChange(originalAccount, newAccount)

      expect(actual).toEqual({
        ...newAccount,
        changeDirection: ChangeDirection.Increase
      })
    })

    it('should not update the document if the original document id is different than the new ', () => {
      const originalAccount = {
        ...generateAccount(),
        balance: 1,
        availableBalance: 2
      }

      const newAccount = {
        ...generateAccount(),
        balance: 10,
        availableBalance: 15
      }

      const actual = getSingleAccountWithChange(originalAccount, newAccount)

      expect(actual).toEqual({
        ...newAccount,
        changeDirection: ChangeDirection.NoChange
      })
    })
  })
})