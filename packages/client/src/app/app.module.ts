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
import { materialModules } from './lib/material.library';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BitcoinCurrencyPipe } from './pipes/bitcoin-currency.pipe';
import { ExchangeRatePipe } from './pipes/exchange-rate.pipe';
import { effectsModule, storeModule } from './store';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    AccountTableComponent,
    PageTitleComponent,
    PageContainerComponent,
    ExchangeRatePipe,
    BitcoinCurrencyPipe,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
