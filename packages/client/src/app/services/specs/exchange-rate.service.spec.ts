import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ExchangeRateService } from "../exchange-rate.service";
import { TestBed } from '@angular/core/testing';
import { environment } from 'app/lib/environment';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify()
  })
  describe('fetchExchangeRate', () => {
    it('should call `fetchExchangeRate` as expected', (done) => {
      const expectedValue = {
        usd: 1_000,
        btc: 1
      }

      service.fetchExchangeRate().subscribe((response) => {
        expect(response).toEqual(expectedValue)
        done()
      })

      const req = httpMock.expectOne(`${environment.apiHost}/accounts/exchange-rate`)
      expect(req.request.method).toEqual('GET');

      req.flush(expectedValue)
    });
  })
})