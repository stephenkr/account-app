export interface Transaction {
  id: string;
  confirmedDate: Date;
  orderId: string;
  orderCode: string;
  type: TransactionType;
  debit: number;
  credit: number;
  balance: number;
  accountId: string;
}

export enum TransactionType {
  Received = 'received',
  Sent = 'sent'
}