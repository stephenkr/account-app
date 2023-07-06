import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from 'app/components/ui/page-container/page-container.component';
import { PageTitleComponent } from 'app/components/ui/page-title/page-title.component';
import { RowHighlightDirective } from 'app/directives/row-highlight.directive';
import { materialModules } from 'app/lib/material-ui';
import { socketModule } from 'app/lib/socket';
import { BitcoinCurrencyPipe } from 'app/pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from 'app/pipes/exchange-rate.pipe';
import { JoinStringsPipe } from 'app/pipes/join-strings.pipe';
import { getAccountWithChangeCollection } from 'app/tests/account.testfactory';
import { getMockStore } from 'app/tests/store.mock';
import { AccountTableComponent } from './account-table.component';

describe('AccountTableComponent', () => {
  let component: AccountTableComponent;
  let fixture: ComponentFixture<AccountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AccountTableComponent,
        PageTitleComponent,
        PageContainerComponent,
        ExchangeRatePipe,
        BitcoinCurrencyPipe,
        JoinStringsPipe,
        RowHighlightDirective
      ],
      providers: [
        getMockStore(),
      ],
      imports: [
        NoopAnimationsModule,
        socketModule,
        ...materialModules
      ]
    })

    fixture = TestBed.createComponent(AccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the table with the rows', () => {
    component.dataSource = new MatTableDataSource(getAccountWithChangeCollection(5))

    fixture.detectChanges()

    const rows = fixture.nativeElement.querySelectorAll('tbody tr')

    expect(rows.length).toBe(5);
  });
});
