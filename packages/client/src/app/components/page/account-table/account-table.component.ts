import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [{
  name: 'Hello',
  category: 'Random',
  tags: 'test',
  balance: 0.00,
  availableBalance: 1.00
}]

@Component({
  selector: 'account-app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss'],
})
export class AccountTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['account_name', 'category', 'tags', 'balance', 'available_balance'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // coming soon
  }
}
