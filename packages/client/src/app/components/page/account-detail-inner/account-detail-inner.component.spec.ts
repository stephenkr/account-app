import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailInnerComponent } from './account-detail-inner.component';

describe('AccountDetailInnerComponent', () => {
  let component: AccountDetailInnerComponent;
  let fixture: ComponentFixture<AccountDetailInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDetailInnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
