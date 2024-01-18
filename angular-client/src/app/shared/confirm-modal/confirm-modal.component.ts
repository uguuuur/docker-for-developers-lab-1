import { Component, ElementRef, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(private modalService: ModalService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    //this.modalService.initializeModal(this.elementRef);
    console.log("Modal instantiated", this.elementRef);
    
  }
}