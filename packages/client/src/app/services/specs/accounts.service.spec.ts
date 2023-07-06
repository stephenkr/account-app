import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'app/lib/environment';
import { AccountService } from '../accounts.service';
import { getAccountCollection } from 'app/tests/account.testfactory';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify()
  })
  describe('fetchAccounts', () => {
    it('should call `fetchAccounts` as expected', (done) => {
      const expectedValue = getAccountCollection(5)

      service.fetchAccounts().subscribe((response) => {
        expect(response).toEqual(expectedValue)
        done()
      })

      const req = httpMock.expectOne(`${environment.apiHost}/accounts`)
      expect(req.request.method).toEqual('GET');

      req.flush(expectedValue)
    });
  })
})