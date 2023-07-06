import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'app/store/accounts/types';

const transactions: any[] = []

@Component({
  selector: 'account-app-account-detail-inner',
  templateUrl: './account-detail-inner.component.html',
  styleUrls: ['./account-detail-inner.component.scss'],
})
export class AccountDetailInnerComponent implements OnInit {
  @Input() selectedAccount!: Account;
  @Input() exchangeRateBtcUsd: number | null = 0;

  displayedColumns: string[] = ['confirmed_date', 'order_id', 'order_code', 'type', 'debit', 'credit', 'balance'];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(transactions)
  }

}
