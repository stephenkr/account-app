import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'app/lib/environment';
import { TransactionService } from '../transaction.service';
import { getTransactionCollection } from 'app/tests/transaction.testfactory';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify()
  })
  describe('fetchAccounts', () => {
    it('should call `fetchAccounts` as expected', (done) => {
      const expectedValue = getTransactionCollection(5)
      const accountId = '1'

      service.fetchTransactionsByAccountId(accountId).subscribe((response) => {
        expect(response).toEqual(expectedValue)
        done()
      })

      const req = httpMock.expectOne(`${environment.apiHost}/accounts/${accountId}/transactions`)
      expect(req.request.method).toEqual('GET');

      req.flush(expectedValue)
    });
  })
})