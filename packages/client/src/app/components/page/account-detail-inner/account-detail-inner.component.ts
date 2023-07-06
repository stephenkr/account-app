import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountWithChange } from 'app/store/accounts/types';
import { Transaction } from 'app/store/transactions/types';
import { getSortedTransactionCollection } from './utils/getSortedTransactionCollection';

@Component({
  selector: 'account-app-account-detail-inner',
  templateUrl: './account-detail-inner.component.html',
  styleUrls: ['./account-detail-inner.component.scss'],
})
export class AccountDetailInnerComponent {
  @Input() selectedAccount!: AccountWithChange;
  @Input() exchangeRateBtcUsd: number | null = 0;
  @Input() transactions: Transaction[] | null = []

  displayedColumns: string[] = ['confirmed_date', 'order_id', 'order_code', 'type', 'debit', 'credit', 'balance'];

  get transactionDataSource() {
    return getSortedTransactionCollection(new MatTableDataSource<Transaction>(this.transactions || []).data)
  }
}
