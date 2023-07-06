import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface Breadcrumb {
  path?: string;
  title: string;
}

@Component({
  selector: 'account-app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  @Input() isFetching: boolean | null = false
  @Input() title = '';
  @Input() breadcrumbs: Breadcrumb[] = []

  constructor(private router: Router) { }

  openBreadcrumb(path: string | undefined) {
    if (!path) {
      return;
    }

    this.router.navigate([path])
  }
}
