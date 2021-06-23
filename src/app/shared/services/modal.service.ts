import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public loginModalSubject: Subject<{ open: boolean }>;
  public alertModalSubject: Subject<{
    title: string;
    additional: string | null;
    role: string;
  }>;
  public confirmationSubject: Subject<{ action: string; choice: boolean }>;

  constructor() {
    this.loginModalSubject = new Subject<{ open: boolean }>();
    this.alertModalSubject = new Subject<{
      title: string;
      additional: string | null;
      role: string;
    }>();
    this.confirmationSubject = new Subject<{
      action: string;
      choice: boolean;
    }>();
  }

  get LoginModalState() {
    return this.loginModalSubject as Observable<{ open: boolean }>;
  }

  get AlertModalState() {
    return this.alertModalSubject as Observable<{
      title: string;
      additional: string;
      role: string;
    }>;
  }

  get ConfirmState() {
    return this.confirmationSubject as Observable<{
      action: string;
      choice: boolean;
    }>;
  }
}
