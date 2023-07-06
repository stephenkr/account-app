import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "app/lib/environment";
import { Transaction } from "app/store/transactions/types";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  fetchTransactionsByAccountId(accountId: string) {
    const path = `${environment.apiHost}/accounts/${accountId}/transactions`

    return this.httpClient.get<Transaction[]>(path)
  }
}