import { TransactionType } from 'app/store/transactions/types';
import { TransactionTypePipe } from '../transaction-type.pipe';

describe('TransactionTypePipe', () => {
  it('returns the correct copy for `received`', () => {
    const copy = new TransactionTypePipe().transform(TransactionType.Received);
    expect(copy).toBe('Payment received');
  });

  it('returns the correct copy for `sent`', () => {
    const copy = new TransactionTypePipe().transform(TransactionType.Sent);
    expect(copy).toBe('Payment sent');
  });
});
