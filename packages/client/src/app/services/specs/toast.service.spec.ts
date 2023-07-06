import { TestBed } from "@angular/core/testing";
import { Subscription } from "rxjs";
import { ToastService } from "../toast.service";

describe('ToastService', () => {
  let service: ToastService;
  let toastSubscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ToastService)
  })

  afterEach(() => {
    if (toastSubscription) {
      toastSubscription.unsubscribe()
    }
  })

  it('should return the toast as expected', (done) => {
    toastSubscription = service.getToast()
      .subscribe((toast) => {
        if (!toast) {
          return;
        }

        expect(toast).toEqual({
          message: 'hello'
        })

        done()
      })

    service.showToast('hello')
  })
})