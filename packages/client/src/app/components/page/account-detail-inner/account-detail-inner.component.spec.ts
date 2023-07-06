import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailInnerComponent } from './account-detail-inner.component';
import { PageDetailTitleComponent } from 'app/components/ui/page-detail-title/page-detail-title.component';
import { PageContainerComponent } from 'app/components/ui/page-container/page-container.component';
import { materialModules } from 'app/lib/material-ui';
import { BitcoinCurrencyPipe } from 'app/pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from 'app/pipes/exchange-rate.pipe';
import { generateAccountWithChange } from 'app/tests/account.testfactory';
import { RowHighlightDirective } from 'app/directives/row-highlight.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        RowHighlightDirective
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
});
