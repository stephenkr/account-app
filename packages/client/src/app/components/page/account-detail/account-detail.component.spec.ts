import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailComponent } from './account-detail.component';
import { PageTitleComponent } from 'app/components/ui/page-title/page-title.component';
import { AccountDetailInnerComponent } from '../account-detail-inner/account-detail-inner.component';
import { getMockStore } from 'app/tests/store.mock';
import { socketModule } from 'app/lib/socket';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AccountDetailComponent,
        PageTitleComponent,
        AccountDetailInnerComponent,
      ],
      providers: [
        getMockStore(),
        Router,
      ],
      imports: [
        socketModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
