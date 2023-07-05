import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinStrings',
})
export class JoinStringsPipe implements PipeTransform {
  transform(value: string[]): string {
    return value.join(', ');
  }
}
