import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materialModules } from '../lib/material.library';
import { AccountTableComponent } from './components/page/account-table/account-table.component';
import { PageTitleComponent } from './components/ui/page-title/page-title.component';
import { PageContainerComponent } from './components/ui/page-container/page-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    AccountTableComponent,
    PageTitleComponent,
    PageContainerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
