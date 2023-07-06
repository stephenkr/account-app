import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges) {
    const highlightChange = changes['accountAppRowHighlight']

    if (
      typeof highlightChange.previousValue === 'undefined' ||
      !highlightChange.isFirstChange() && highlightChange.previousValue !== highlightChange.currentValue
    ) {
      this.elementClass = `flash-${this.accountAppRowHighlight}`
      this.resetClass()
    }
  }

  private resetClass() {
    timer(ONE_SECOND).subscribe(() => {
      this.elementClass = ''
    })
  }
}
