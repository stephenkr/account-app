import { ChangeDirection } from 'app/store/accounts/types';
import { RowHighlightDirective } from './row-highlight.directive';

describe('RowHighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new RowHighlightDirective();
    expect(directive).toBeTruthy();
  });

  it('should set the `increase` class if the change direction is `increase`', () => {
    const directive = new RowHighlightDirective();

    directive.accountAppRowHighlight = ChangeDirection.Increase
    directive.ngOnChanges({
      'accountAppRowHighlight': {
        isFirstChange: () => false,
        firstChange: false,
        previousValue: ChangeDirection.NoChange,
        currentValue: ChangeDirection.Increase
      }
    })
    const actual = directive.elementClass

    expect(actual).toBe(`flash-increase`)
  })

  it('should set the `decrease` class if the change direction is `decrease`', () => {
    const directive = new RowHighlightDirective();

    directive.accountAppRowHighlight = ChangeDirection.Decrease
    directive.ngOnChanges({
      'accountAppRowHighlight': {
        isFirstChange: () => false,
        firstChange: false,
        previousValue: ChangeDirection.NoChange,
        currentValue: ChangeDirection.Decrease
      }
    })
    const actual = directive.elementClass

    expect(actual).toBe(`flash-decrease`)
  })

  it('should set the `no-change` class if the change direction is `no-change`', () => {
    const directive = new RowHighlightDirective();

    directive.accountAppRowHighlight = ChangeDirection.NoChange
    directive.ngOnChanges({
      'accountAppRowHighlight': {
        isFirstChange: () => false,
        firstChange: false,
        previousValue: ChangeDirection.NoChange,
        currentValue: ChangeDirection.NoChange
      }
    })
    const actual = directive.elementClass

    expect(actual).toBe("")
  })

  it('should set the `increase` class if the change direction is `increase` and it is the first change', () => {
    const directive = new RowHighlightDirective();

    directive.accountAppRowHighlight = ChangeDirection.Increase
    directive.ngOnChanges({
      'accountAppRowHighlight': {
        isFirstChange: () => true,
        firstChange: true,
        previousValue: undefined,
        currentValue: ChangeDirection.Increase
      }
    })
    const actual = directive.elementClass

    expect(actual).toBe(`flash-increase`)
  })
});
