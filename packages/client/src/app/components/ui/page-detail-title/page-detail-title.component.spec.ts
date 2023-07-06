import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageDetailTitleComponent } from './page-detail-title.component';
import { materialModules } from 'app/lib/material-ui';
import { BitcoinCurrencyPipe } from 'app/pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from 'app/pipes/exchange-rate.pipe';
import { RowHighlightDirective } from 'app/directives/row-highlight.directive';

describe('PageDetailTitleComponent', () => {
  let component: PageDetailTitleComponent;
  let fixture: ComponentFixture<PageDetailTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PageDetailTitleComponent,
        BitcoinCurrencyPipe,
        ExchangeRatePipe,
        RowHighlightDirective
      ],
      imports: [
        ...materialModules
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageDetailTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
