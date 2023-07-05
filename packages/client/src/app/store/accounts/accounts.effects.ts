import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExchangeRateService } from "app/services/exchange-rate.service";
import { catchError, map, of, switchMap } from "rxjs";
import { fetchAccounts, fetchExchangeRate, setAccountLoadFailed, setAccounts, setExchangeRateBtcUsd, setExchangeRateLoadFailed } from "./accounts.actions";
import { Injectable } from "@angular/core";
import { AccountService } from "app/services/accounts.service";
import { ToastService } from "app/services/toast.service";

@Injectable()
export class AccountsEffects {

  constructor(private actions$: Actions, private exchangeRateService: ExchangeRateService, private accountService: AccountService, private toastService: ToastService) { }

  exchangeRate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fetchExchangeRate
      ),
      switchMap(() =>
        this.exchangeRateService.fetchExchangeRate().pipe(
          map(exchangeRate => setExchangeRateBtcUsd({
            exchangeRateBtcUsd: exchangeRate.usd,
          })),
          catchError(() => {
            this.toastService.showToast('The exchange rate failed to load')

            return of(
              setExchangeRateLoadFailed()
            )
          })
        )
      )
    )
  })

  fetchAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fetchAccounts
      ),
      switchMap(() =>
        this.accountService.fetchAccounts().pipe(
          map(accounts => setAccounts({
            accounts
          })),
          catchError(() => {
            this.toastService.showToast('The account list failed to load')

            return of(
              setAccountLoadFailed()
            )
          })
        )
      )
    )
  })
}
