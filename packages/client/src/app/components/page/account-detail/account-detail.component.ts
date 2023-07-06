import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectExchangeRate } from 'app/store/accounts/accounts.selectors';
import { Subscription } from 'rxjs';

const transactions = [{
  id: 'one',
  confirmedDate: new Date(),
  orderId: 'bla',
  orderCode: 'another',
  type: 'received',
  debit: 0,
  credit: 0.00004,
  balance: 1
}]

@Component({
  selector: 'account-app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['confirmed_date', 'order_id', 'order_code', 'type', 'debit', 'credit', 'balance'];
  dataSource = new MatTableDataSource<any>([]);
  storeSubscriptions$: Subscription[] = [];
  exchangeRateBtcUsd = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.storeSubscriptions$.push(
      this.store.select(selectExchangeRate).subscribe({
        next: (exchangeRateBtcUsd) => {
          this.exchangeRateBtcUsd = exchangeRateBtcUsd
        }
      })
    )

    this.dataSource = new MatTableDataSource(transactions)
  }

  ngOnDestroy(): void {
    this.storeSubscriptions$.forEach((subscription) => {
      subscription.unsubscribe()
    })
  }
}
