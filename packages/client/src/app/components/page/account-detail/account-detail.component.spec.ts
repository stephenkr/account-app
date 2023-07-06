import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore } from '@ngrx/store/testing';
import { PageContainerComponent } from 'app/components/ui/page-container/page-container.component';
import { PageDetailTitleComponent } from 'app/components/ui/page-detail-title/page-detail-title.component';
import { PageTitleComponent } from 'app/components/ui/page-title/page-title.component';
import { materialModules } from 'app/lib/material-ui';
import { socketModule } from 'app/lib/socket';
import { BitcoinCurrencyPipe } from 'app/pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from 'app/pipes/exchange-rate.pipe';
import { TransactionTypePipe } from 'app/pipes/transaction-type.pipe';
import { selectSelectedAccount } from 'app/store/accounts/accounts.selectors';
import { selectTransactions } from 'app/store/transactions/transactions.selectors';
import { generateAccountWithChange } from 'app/tests/account.testfactory';
import { getMockStore } from 'app/tests/store.mock';
import { getTransactionCollection } from 'app/tests/transaction.testfactory';
import { AccountDetailInnerComponent } from '../account-detail-inner/account-detail-inner.component';
import { AccountDetailComponent } from './account-detail.component';
import { RowHighlightDirective } from 'app/directives/row-highlight.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AccountDetailComponent,
        PageTitleComponent,
        AccountDetailInnerComponent,
        PageDetailTitleComponent,
        PageContainerComponent,
        BitcoinCurrencyPipe,
        ExchangeRatePipe,
        TransactionTypePipe,
        RowHighlightDirective
      ],
      providers: [
        getMockStore(),
        Router,
      ],
      imports: [
        NoopAnimationsModule,
        socketModule,
        RouterTestingModule.withRoutes([]),
        ...materialModules
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the inner detail if the selected account exists', () => {
    const mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(
      selectSelectedAccount,
      generateAccountWithChange()
    );

    mockStore.overrideSelector(
      selectTransactions,
      getTransactionCollection(5)
    );

    fixture.detectChanges()

    const actual = fixture.nativeElement.querySelector('account-app-page-detail-title')

    expect(actual).toBeTruthy()
  })
});
