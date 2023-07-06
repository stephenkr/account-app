import { TransactionType } from "../types"

export const getTransactionBalance = (newBalance, previousBalance) => {
  const changeInBalance = newBalance - previousBalance

  if (changeInBalance > 0) {
    return {
      debit: 0,
      credit: changeInBalance,
      type: TransactionType.Received
    }
  }

  return {
    debit: changeInBalance,
    credit: 0,
    type: TransactionType.Sent
  }
}