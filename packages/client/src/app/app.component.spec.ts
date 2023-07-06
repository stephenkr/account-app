import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ToastContainerComponent } from './components/ui/toast-container/toast-container.component';
import { materialModules } from './lib/material-ui';
import { socketModule } from './lib/socket';
import { ExchangeRatePipe } from './pipes/exchange-rate.pipe';
import { selectExchangeRate, selectExchangeRateFetching } from './store/accounts/accounts.selectors';
import { getMockStore } from './tests/store.mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        socketModule,
        NoopAnimationsModule,
        ...materialModules
      ],
      declarations: [
        AppComponent,
        ExchangeRatePipe,
        ToastContainerComponent
      ],
      providers: [
        getMockStore()
      ]
    })

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as title 'client'`, () => {
    expect(component.title).toEqual('client');
  });

  describe('exchange rate display', () => {
    it('should show the loading spinner if `exchangeRateFetching$` is `true`', () => {
      const mockStore = TestBed.inject(MockStore);

      mockStore.overrideSelector(
        selectExchangeRateFetching,
        true
      );

      fixture.detectChanges()

      const spinner = fixture.nativeElement.querySelector('mat-spinner')

      expect(spinner).toBeTruthy();
    })

    it('should show the exchange rate', () => {
      const mockStore = TestBed.inject(MockStore);

      mockStore.overrideSelector(
        selectExchangeRate,
        123
      );

      fixture.detectChanges()

      const exchangeElement = fixture.nativeElement.querySelector('.exchange-value')
      const value = exchangeElement.textContent

      expect(value).toBe(': $123.00');
    })

  })
});
