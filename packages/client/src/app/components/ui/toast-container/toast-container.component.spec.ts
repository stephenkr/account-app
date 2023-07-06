import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastContainerComponent } from './toast-container.component';
import { ToastService } from 'app/services/toast.service';
import { of } from 'rxjs';
import { materialModules } from 'app/lib/material-ui';

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent;
  let fixture: ComponentFixture<ToastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastContainerComponent],
      providers: [
        {
          provide: ToastService,
          asValue: {
            getToast: jest.fn()
          }
        }
      ],
      imports: [
        ...materialModules
      ]
    })

    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the toast as expected', () => {
    const toastService = TestBed.inject(ToastService)

    jest.spyOn(toastService, 'getToast').mockImplementation(() => of({
      message: 'My toast',
    }))

    fixture.detectChanges()

    const toastMessageElement = fixture.nativeElement.querySelector('.toast-message')
    expect(toastMessageElement.textContent).toContain('My toast')
  })
});
