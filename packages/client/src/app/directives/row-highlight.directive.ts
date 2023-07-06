import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { ChangeDirection } from 'app/store/accounts/types';
import { timer } from 'rxjs';

const ONE_SECOND = 1_000

@Directive({
  selector: '[accountAppRowHighlight]',
})
export class RowHighlightDirective implements OnChanges {
  @Input() public accountAppRowHighlight!: ChangeDirection;

  @HostBinding('class')
  elementClass = '';

  ngOnChanges() {
    this.elementClass = `flash-${this.accountAppRowHighlight}`
    this.resetClass()
  }

  private resetClass() {
    timer(ONE_SECOND).subscribe(() => {
      this.elementClass = ''
    })
  }
}
