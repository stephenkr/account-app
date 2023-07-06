import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from "rxjs";

interface Toast {
  message: string;
}

const TOAST_TIMEOUT = 5_000 // 5 seconds

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast$ = new BehaviorSubject<Toast | null>(null)

  showToast(message: string) {
    this.toast$.next({
      message
    })

    timer(TOAST_TIMEOUT).subscribe(() => {
      this.hideToast()
    })
  }

  getToast() {
    return this.toast$.asObservable()
  }

  hideToast() {
    this.toast$.next(null)
  }
}