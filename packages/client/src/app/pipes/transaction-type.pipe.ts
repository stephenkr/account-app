import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from 'app/store/transactions/types';

@Pipe({
  name: 'transactionType',
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string): string {
    return value === TransactionType.Received
      ? 'Payment received'
      : 'Payment sent'
  }
}
