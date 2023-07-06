import { Route } from '@angular/router';
import { AccountTableComponent } from './components/page/account-table/account-table.component';
import { AccountDetailComponent } from './components/page/account-detail/account-detail.component';

export const appRoutes: Route[] = [{
  path: '',
  component: AccountTableComponent
}, {
  path: ':id',
  component: AccountDetailComponent
}];
