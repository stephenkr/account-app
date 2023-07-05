import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectAccounts } from 'app/store/accounts/accounts.selectors';
import { Subscription } from 'rxjs';
import { Account } from 'app/store/accounts/types';

@Component({
  selector: 'account-app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss'],
})
export class AccountTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['account_name', 'category', 'tags', 'balance', 'available_balance'];
  dataSource = new MatTableDataSource<Account>([]);
  $storeSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.$storeSubscription = this.store.select(selectAccounts).subscribe({
      next: (accounts) => {
        this.dataSource = new MatTableDataSource(accounts)
      }
    })
  }

  ngOnDestroy(): void {
    this.$storeSubscription.unsubscribe()
  }

  announceSortChange(sortState: Sort) {
    // coming soon
  }
}
