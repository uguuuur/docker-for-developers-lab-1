import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalInstance: Modal | undefined;
  private isModalOpen = false;

  constructor() { }

  initializeModal(modalElement: any): void {
    this.modalInstance = new Modal(modalElement.nativeElement);
    this.modalInstance?.toggle(); // Hide the modal initially
  }

  openModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
      this.isModalOpen = true;
    } else {
      console.error('No instance');
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.isModalOpen = false;
    }
  }

  isModalOpened(): boolean {
    return this.isModalOpen;
  }
}