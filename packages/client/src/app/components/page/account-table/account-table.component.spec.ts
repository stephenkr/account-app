import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from 'app/components/ui/page-container/page-container.component';
import { PageTitleComponent } from 'app/components/ui/page-title/page-title.component';
import { materialModules } from 'app/lib/material.library';
import { getMockStore } from 'app/tests/store.mock';
import { AccountTableComponent } from './account-table.component';

describe('AccountTableComponent', () => {
  let component: AccountTableComponent;
  let fixture: ComponentFixture<AccountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountTableComponent, PageTitleComponent, PageContainerComponent],
      providers: [
        getMockStore()
      ],
      imports: [
        NoopAnimationsModule,
        ...materialModules
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
