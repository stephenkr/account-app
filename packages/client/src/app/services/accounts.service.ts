import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "app/lib/environment";
import { Account } from "app/store/accounts/types";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  fetchAccounts() {
    const path = `${environment.apiHost}/accounts`

    return this.httpClient.get<Account[]>(path)
  }

  fetchAccountById(id: string) {
    const path = `${environment.apiHost}/accounts/${id}`

    return this.httpClient.get<Account>(path)
  }
}