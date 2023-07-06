import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SocketService } from 'app/services/socket.service';
import { fetchSelectedAccount } from 'app/store/accounts/accounts.actions';
import { selectExchangeRate, selectSelectedAccount, selectSelectedAccountFetching } from 'app/store/accounts/accounts.selectors';
import { fetchTransactions } from 'app/store/transactions/transactions.actions';
import { selectTransactions } from 'app/store/transactions/transactions.selectors';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'account-app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  socketSubscription: Subscription | null = null;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    const accountId = this.activatedRoute.snapshot.paramMap.get('id')

    if (typeof accountId === 'string') {
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

      return;
    }

    this.router.navigate([''])
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe()
    }
  }

  get exchangeRateBtcUsd$() {
    return this.store.select(selectExchangeRate)
  }

  get isFetchingSelectedAccount$() {
    return this.store.select(selectSelectedAccountFetching)
  }

  get selectedAccount$() {
    return this.store.select(selectSelectedAccount).pipe(
      tap((selectedAccount) => {
        if (!selectedAccount) {
          this.router.navigate([''])
        }
      })
    )
  }

  get accountTransactions$() {
    return this.store.select(selectTransactions)
  }
}
