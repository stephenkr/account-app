import { Account, AccountWithChange, ChangeDirection } from "../types"

export const getChangeDirection = (originalValue: number | undefined, newValue: number): ChangeDirection => {
  if (typeof originalValue === 'undefined' || originalValue === newValue) {
    return ChangeDirection.NoChange
  }

  if (originalValue > newValue) {
    return ChangeDirection.Decrease
  }

  return ChangeDirection.Increase
}

export const getAccountsWithChange = (originalCollection: Account[], newCollection: Account[]): AccountWithChange[] => {
  return newCollection.map((document) => {
    const originalDocument = originalCollection.find(
      (originalDocument) => originalDocument.id === document.id
    )

    return {
      ...document,
      changeDirection: getChangeDirection(
        originalDocument?.availableBalance,
        document.availableBalance
      )
    }
  })
}