import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
declare var $: any;

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
  alertText: string;
  additionalData: string | null;
  role: string;

  constructor(private modalService: ModalService) {
    this.alertText = '';
    this.additionalData = null;
    this.role = '';
  }

  ngOnInit(): void {
    this.modalService.AlertModalState.subscribe((data) => {
      this.alertText = data.title;
      this.additionalData = data.additional;
      this.role = data.role;
      $('#alertModal').modal('show');
    });
  }

  yes() {
    this.modalService.confirmationSubject$.next({
      action: this.additionalData,
      choice: true,
    });
    this.close();
  }

  close() {
    this.reset();
    $('#alertModal').modal('hide');
  }

  reset() {
    this.alertText = '';
    this.additionalData = '';
    this.role = '';
  }
}
