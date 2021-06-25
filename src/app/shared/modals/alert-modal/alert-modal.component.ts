import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
declare var $: any;

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
  public alertText: string;
  public additionalData: string | null;
  public role: string;
  private id: number;

  constructor(private modalService: ModalService) {
    this.alertText = '';
    this.additionalData = null;
    this.role = '';
    this.id = -1;
  }

  ngOnInit(): void {
    this.modalService.AlertModalState.subscribe((data) => {
      this.alertText = data.title;
      this.additionalData = data.additional;
      this.role = data.role;
      this.id = data.id;
      $('#alertModal').modal('show');
    });
  }

  yes() {
    this.modalService.confirmationSubject$.next({
      action: this.additionalData,
      choice: true,
      id: this.id,
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
    this.id = -1;
  }
}
