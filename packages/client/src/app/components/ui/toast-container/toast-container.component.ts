import { Component } from '@angular/core';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'account-app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  constructor(private toastService: ToastService) { }

  get toast$() {
    return this.toastService.getToast()
  }

  removeToast() {
    this.toastService.hideToast()
  }
}
