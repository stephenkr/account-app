import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'app/store/accounts/types';
import { Transaction } from 'app/store/transactions/types';

@Component({
  selector: 'account-app-account-detail-inner',
  templateUrl: './account-detail-inner.component.html',
  styleUrls: ['./account-detail-inner.component.scss'],
})
export class AccountDetailInnerComponent {
  @Input() selectedAccount!: Account;
  @Input() exchangeRateBtcUsd: number | null = 0;
  @Input() transactions: Transaction[] | null = []

  displayedColumns: string[] = ['confirmed_date', 'order_id', 'order_code', 'type', 'debit', 'credit', 'balance'];

  get transactionDataSource() {
    return new MatTableDataSource<Transaction>(this.transactions || [])
  }
}
