import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-client';
  
  constructor(private modalService: ModalService){}

  ngOnInit(): void {
  }

  isModalOpen(): boolean {
    return this.modalService.isModalOpened()
  }
}
