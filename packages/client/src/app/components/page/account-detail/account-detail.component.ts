import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SocketService } from 'app/services/socket.service';
import { clearSelectedAccount, fetchSelectedAccount } from 'app/store/accounts/accounts.actions';
import { selectExchangeRate, selectSelectedAccount, selectSelectedAccountFailed, selectSelectedAccountFetching } from 'app/store/accounts/accounts.selectors';
import { fetchTransactions } from 'app/store/transactions/transactions.actions';
import { selectTransactions } from 'app/store/transactions/transactions.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  socketSubscription: Subscription | null = null;
  selectedAccountFailedSubscription: Subscription | null = null;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.requestDetailData(
      this.activatedRoute.snapshot.paramMap.get('id')
    )

    this.selectedAccountFailedSubscription = this.store.select(selectSelectedAccountFailed)
      .subscribe((hasFailed) => {
        if (hasFailed) {
          this.router.navigate([''])
        }
      })
  }

  requestDetailData(accountId: string | null) {
    if (typeof accountId !== 'string') {
      this.router.navigate([''])
      return;
    }

    this.store.dispatch(fetchSelectedAccount({
      id: accountId
    }))
    this.store.dispatch(fetchTransactions({
      accountId
    }))

    this.socketSubscription = this.socketService.onAccountChange().subscribe({
      next: () => {
        this.store.dispatch(fetchSelectedAccount({
          id: accountId
        }))
        this.store.dispatch(fetchTransactions({
          accountId
        }))
      }
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSelectedAccount())

    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe()
    }
    if (this.selectedAccountFailedSubscription) {
      this.selectedAccountFailedSubscription.unsubscribe()
    }
  }

  get exchangeRateBtcUsd$() {
    return this.store.select(selectExchangeRate)
  }

  get isFetchingSelectedAccount$() {
    return this.store.select(selectSelectedAccountFetching)
  }

  get selectedAccount$() {
    return this.store.select(selectSelectedAccount)
  }

  get accountTransactions$() {
    return this.store.select(selectTransactions)
  }
}
