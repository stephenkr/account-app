import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastService } from "app/services/toast.service";
import { TransactionService } from "app/services/transaction.service";
import { catchError, map, of, switchMap } from "rxjs";
import { fetchTransactions, setTransactionLoadFailed, setTransactions } from "./transactions.actions";

@Injectable()
export class TransactionEffects {

  constructor(private actions$: Actions, private transactionService: TransactionService, private toastService: ToastService) { }

  fetchTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fetchTransactions
      ),
      switchMap(({ accountId }) =>
        this.transactionService.fetchTransactionsByAccountId(accountId).pipe(
          map(transactions => setTransactions({
            transactions
          })),
          catchError(() => {
            this.toastService.showToast('The transaction list failed to load')

            return of(
              setTransactionLoadFailed()
            )
          })
        )
      )
    )
  })
}
