import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExchangeRateService } from "app/services/exchange-rate.service";
import { catchError, map, of, switchMap } from "rxjs";
import { fetchExchangeRate, setExchangeRateBtcUsd, setExchangeRateLoadFailed } from "./accounts.actions";
import { Injectable } from "@angular/core";

@Injectable()
export class AccountsEffects {

  constructor(private actions$: Actions, private exchangeRateService: ExchangeRateService) { }

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
            return of(
              setExchangeRateLoadFailed()
            )
          })
        )
      )
    )
  })
}
