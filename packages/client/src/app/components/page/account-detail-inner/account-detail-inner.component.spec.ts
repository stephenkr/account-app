import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from 'app/components/ui/page-container/page-container.component';
import { PageDetailTitleComponent } from 'app/components/ui/page-detail-title/page-detail-title.component';
import { RowHighlightDirective } from 'app/directives/row-highlight.directive';
import { materialModules } from 'app/lib/material-ui';
import { BitcoinCurrencyPipe } from 'app/pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from 'app/pipes/exchange-rate.pipe';
import { TransactionTypePipe } from 'app/pipes/transaction-type.pipe';
import { generateAccountWithChange } from 'app/tests/account.testfactory';
import { getTransactionCollection } from 'app/tests/transaction.testfactory';
import { AccountDetailInnerComponent } from './account-detail-inner.component';

describe('AccountDetailInnerComponent', () => {
  let component: AccountDetailInnerComponent;
  let fixture: ComponentFixture<AccountDetailInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AccountDetailInnerComponent,
        PageDetailTitleComponent,
        PageContainerComponent,
        BitcoinCurrencyPipe,
        ExchangeRatePipe,
        RowHighlightDirective,
        TransactionTypePipe
      ],
      imports: [
        NoopAnimationsModule,
        ...materialModules
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailInnerComponent);
    component = fixture.componentInstance;
    component.selectedAccount = generateAccountWithChange()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the table with the rows', () => {
    component.transactions = getTransactionCollection(10)

    fixture.detectChanges()

    const rows = fixture.nativeElement.querySelectorAll('tbody tr')

    expect(rows.length).toBe(10);
  });
});
