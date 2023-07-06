import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { ChangeDirection } from 'app/store/accounts/types';
import { timer } from 'rxjs';

const ONE_SECOND = 1_000

@Directive({
  selector: '[accountAppRowHighlight]',
})
export class RowHighlightDirective implements OnInit {
  @Input() public accountAppRowHighlight!: ChangeDirection;

  @HostBinding('class')
  elementClass = '';

  ngOnInit() {
    this.elementClass = `flash-${this.accountAppRowHighlight}`
    this.resetClass()
  }

  private resetClass() {
    timer(ONE_SECOND).subscribe(() => {
      this.elementClass = ''
    })
  }
}
