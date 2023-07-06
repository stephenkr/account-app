import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from "@ngrx/store";
import { ToastService } from "app/services/toast.service";
import { TransactionService } from 'app/services/transaction.service';
import { getTransactionCollection } from 'app/tests/transaction.testfactory';
import { cold, hot } from 'jest-marbles';
import { Observable, of, throwError } from "rxjs";
import { fetchTransactions, setTransactionLoadFailed, setTransactions } from '../transactions.actions';
import { TransactionEffects } from '../transactions.effects';

describe('AccountEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: TransactionEffects;
  let transactionService: TransactionService;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionEffects,
        provideMockActions(() => actions$), {
          provide: TransactionService,
          useValue: {
            fetchTransactionsByAccountId: jest.fn(),
          }
        }, {
          provide: ToastService,
          useValue: {
            showToast: jest.fn(),
          }
        }
      ],
    })

    effects = TestBed.inject(TransactionEffects)
    transactionService = TestBed.inject(TransactionService)
    toastService = TestBed.inject(ToastService)
  })


  describe('fetch transactions', () => {
    it('should succeed fetching the accounts', () => {
      const expectedTransactions = getTransactionCollection(2)

      jest.spyOn(transactionService, 'fetchTransactionsByAccountId').mockImplementationOnce(() => (
        of(expectedTransactions)
      ))

      const action = fetchTransactions({
        accountId: '1'
      })
      actions$ = hot('--a--', { a: action })

      const completion = setTransactions({
        transactions: expectedTransactions
      })

      const expected = cold('--(b)', { b: completion })
      expect(effects.fetchTransactions$).toBeObservable(expected)
    })

    it('should handle the error and call to the toast service', () => {
      const toastMock = jest.fn()
      const error = new Error('error placeholder')
      jest.spyOn(toastService, 'showToast').mockImplementation(toastMock)
      jest.spyOn(transactionService, 'fetchTransactionsByAccountId').mockImplementationOnce(() => {
        return throwError(() => error)
      })

      const action = fetchTransactions({
        accountId: '1'
      })
      actions$ = hot('--a-', { a: action });
      const completion = setTransactionLoadFailed()

      const expected = cold('--(b)', { b: completion });

      expect(effects.fetchTransactions$).toBeObservable(expected);
      expect(effects.fetchTransactions$).toSatisfyOnFlush(() => {
        expect(toastMock).toHaveBeenCalledWith('The transaction list failed to load')
      })
    })
  })
});