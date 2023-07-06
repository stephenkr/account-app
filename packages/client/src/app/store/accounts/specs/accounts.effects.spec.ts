import { provideMockActions } from '@ngrx/effects/testing';
import { ToastService } from "app/services/toast.service";
import { AccountsEffects } from "../accounts.effects";
import { AccountService } from "app/services/accounts.service";
import { Action } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { ExchangeRateService } from "app/services/exchange-rate.service";
import { TestBed } from "@angular/core/testing";
import { fetchAccounts, fetchExchangeRate, setAccountLoadFailed, setAccounts, setExchangeRateBtcUsd, setExchangeRateLoadFailed } from '../accounts.actions';
import { cold, hot } from 'jest-marbles'
import { getAccountCollection } from 'app/tests/account.testfactory';

describe('AccountEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: AccountsEffects;
  let accountService: AccountService;
  let exchangeRateService: ExchangeRateService;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountsEffects,
        provideMockActions(() => actions$), {
          provide: AccountService,
          useValue: {
            fetchAccounts: jest.fn(),
          }
        }, {
          provide: ExchangeRateService,
          useValue: {
            fetchExchangeRate: jest.fn(),
          }
        }, {
          provide: ToastService,
          useValue: {
            showToast: jest.fn(),
          }
        }
      ],
    })

    effects = TestBed.inject(AccountsEffects)
    accountService = TestBed.inject(AccountService)
    exchangeRateService = TestBed.inject(ExchangeRateService)
    toastService = TestBed.inject(ToastService)
  })


  describe('fetch exchange rate', () => {
    it('should succeed fetching the exchange rate', () => {
      const expectedUSD = 1_000;

      jest.spyOn(exchangeRateService, 'fetchExchangeRate').mockImplementationOnce(() => (
        of({
          usd: expectedUSD,
          btc: 1
        })
      ))

      const action = fetchExchangeRate()
      actions$ = hot('--a--', { a: action })

      const completion = setExchangeRateBtcUsd({
        exchangeRateBtcUsd: expectedUSD
      })

      const expected = cold('--(b)', { b: completion })
      expect(effects.exchangeRate$).toBeObservable(expected)
    })

    it('should handle the error and call to the toast service', () => {
      const toastMock = jest.fn()
      const error = new Error('error placeholder')
      jest.spyOn(toastService, 'showToast').mockImplementation(toastMock)
      jest.spyOn(exchangeRateService, 'fetchExchangeRate').mockImplementationOnce(() => {
        return throwError(() => error)
      })

      const action = fetchExchangeRate()
      actions$ = hot('--a-', { a: action });
      const completion = setExchangeRateLoadFailed()

      const expected = cold('--(b)', { b: completion });

      expect(effects.exchangeRate$).toBeObservable(expected);
      expect(effects.exchangeRate$).toSatisfyOnFlush(() => {
        expect(toastMock).toHaveBeenCalledWith('The exchange rate failed to load')
      })
    })
  })

  describe('fetch accounts', () => {
    it('should succeed fetching the accounts', () => {
      const expectedAccounts = getAccountCollection(2)

      jest.spyOn(accountService, 'fetchAccounts').mockImplementationOnce(() => (
        of(expectedAccounts)
      ))

      const action = fetchAccounts()
      actions$ = hot('--a--', { a: action })

      const completion = setAccounts({
        accounts: expectedAccounts
      })

      const expected = cold('--(b)', { b: completion })
      expect(effects.fetchAccounts$).toBeObservable(expected)
    })

    it('should handle the error and call to the toast service', () => {
      const toastMock = jest.fn()
      const error = new Error('error placeholder')
      jest.spyOn(toastService, 'showToast').mockImplementation(toastMock)
      jest.spyOn(accountService, 'fetchAccounts').mockImplementationOnce(() => {
        return throwError(() => error)
      })

      const action = fetchAccounts()
      actions$ = hot('--a-', { a: action });
      const completion = setAccountLoadFailed()

      const expected = cold('--(b)', { b: completion });

      expect(effects.fetchAccounts$).toBeObservable(expected);
      expect(effects.fetchAccounts$).toSatisfyOnFlush(() => {
        expect(toastMock).toHaveBeenCalledWith('The account list failed to load')
      })
    })
  })
});