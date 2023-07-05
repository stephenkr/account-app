import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { fetchAccounts } from 'app/store/accounts/accounts.actions';
import { selectAccounts, selectExchangeRate } from 'app/store/accounts/accounts.selectors';
import { Account } from 'app/store/accounts/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss'],
})
export class AccountTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['account_name', 'category', 'tags', 'balance', 'available_balance'];
  dataSource = new MatTableDataSource<Account>([]);
  storeSubscriptions$: Subscription[] = [];
  exchangeRateBtcUsd = 0;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    // Subscribe to accounts for the table
    this.storeSubscriptions$.push(
      this.store.select(selectAccounts).subscribe({
        next: (accounts) => {
          this.dataSource = new MatTableDataSource(accounts)
        }
      })
    )

    // Subscribe to the exchange rate
    this.storeSubscriptions$.push(
      this.store.select(selectExchangeRate).subscribe({
        next: (exchangeRateBtcUsd) => {
          this.exchangeRateBtcUsd = exchangeRateBtcUsd
        }
      })
    )

    this.store.dispatch(fetchAccounts())
  }

  ngOnDestroy(): void {
    this.storeSubscriptions$.forEach((subscription) => {
      subscription.unsubscribe()
    })
  }

  announceSortChange(sortState: Sort) {
    // coming soon
  }
}
