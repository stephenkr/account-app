import { Component, Input } from '@angular/core';
import { ChangeDirection } from 'app/store/accounts/types';

@Component({
  selector: 'account-app-page-detail-title',
  templateUrl: './page-detail-title.component.html',
  styleUrls: ['./page-detail-title.component.scss'],
})
export class PageDetailTitleComponent {
  @Input() title = ''
  @Input() btcBalance = 0
  @Input() btcAvailableBalance = 0
  @Input() exchangeRateBtcUsd: number | null = 0
  @Input() changeDirection: ChangeDirection = ChangeDirection.NoChange
}
