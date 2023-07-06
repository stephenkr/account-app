import { Account, AccountWithChange, ChangeDirection } from "../types"

export const getChangeDirection = (originalValue: number | undefined | null, newValue: number): ChangeDirection => {
  if (typeof originalValue !== 'number' || originalValue === newValue) {
    return ChangeDirection.NoChange
  }

  if (originalValue > newValue) {
    return ChangeDirection.Decrease
  }

  return ChangeDirection.Increase
}

export const getSingleAccountWithChange = (originalDocument: Account | undefined | null, newDocument: Account): AccountWithChange => {
  return {
    ...newDocument,
    changeDirection: getChangeDirection(
      originalDocument?.availableBalance,
      newDocument.availableBalance
    )
  }
}

export const getAccountsWithChange = (originalCollection: Account[], newCollection: Account[]): AccountWithChange[] => {
  return newCollection.map((document) => {
    const originalDocument = originalCollection.find(
      (originalDocument) => originalDocument.id === document.id
    )

    return getSingleAccountWithChange(originalDocument, document)
  })
}