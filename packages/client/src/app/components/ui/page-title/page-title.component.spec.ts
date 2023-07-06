import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleComponent } from './page-title.component';
import { materialModules } from 'app/lib/material-ui';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTitleComponent],
      imports: [
        ...materialModules
      ]
    })

    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading spinner if `isFetching` is passed', () => {
    component.isFetching = true

    fixture.detectChanges()

    const spinner = fixture.nativeElement.querySelector('mat-spinner')

    expect(spinner).toBeTruthy();
  });
});
