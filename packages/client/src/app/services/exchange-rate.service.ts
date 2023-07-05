import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "app/lib/environment";

interface ExchangeRateResponse {
  usd: number;
  btc: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private httpClient: HttpClient) { }

  fetchExchangeRate() {
    const path = `${environment.apiHost}/accounts/exchange-rate`

    return this.httpClient.get<ExchangeRateResponse>(path)
  }
}