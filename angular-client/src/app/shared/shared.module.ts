import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  exports: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ModalService
  ]
})
export class SharedModule {}
