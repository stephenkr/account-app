import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AccountTableComponent } from './components/page/account-table/account-table.component';
import { PageContainerComponent } from './components/ui/page-container/page-container.component';
import { PageTitleComponent } from './components/ui/page-title/page-title.component';
import { environment } from './lib/environment';
import { materialModules } from './lib/material-ui';
import { BitcoinCurrencyPipe } from './pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from './pipes/exchange-rate.pipe';
import { effectsModule, storeModule } from './store';
import { JoinStringsPipe } from './pipes/join-strings.pipe';
import { ToastContainerComponent } from './components/ui/toast-container/toast-container.component';
import { socketModule } from './lib/socket';
import { RowHighlightDirective } from './directives/row-highlight.directive';
import { AccountDetailComponent } from './components/page/account-detail/account-detail.component';
import { PageDetailTitleComponent } from './components/ui/page-detail-title/page-detail-title.component';
import { AccountDetailInnerComponent } from './components/page/account-detail-inner/account-detail-inner.component';
import { TransactionTypePipe } from './pipes/transaction-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccountTableComponent,
    PageTitleComponent,
    PageContainerComponent,
    ExchangeRatePipe,
    BitcoinCurrencyPipe,
    JoinStringsPipe,
    ToastContainerComponent,
    RowHighlightDirective,
    AccountDetailComponent,
    PageDetailTitleComponent,
    AccountDetailInnerComponent,
    TransactionTypePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    ...materialModules,
    storeModule,
    effectsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    socketModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
