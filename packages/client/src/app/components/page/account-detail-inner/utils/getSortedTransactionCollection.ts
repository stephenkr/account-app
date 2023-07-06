import { Transaction } from "app/store/transactions/types";

export const getSortedTransactionCollection = (collection: Transaction[]): Transaction[] => {
  return [...collection].sort((transaction1, transaction2) =>
    new Date(transaction2.confirmedDate).getTime() - new Date(transaction1.confirmedDate).getTime()
  );
}