import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public loginModalSubject$: Subject<{ open: boolean }>;
  public alertModalSubject$: Subject<{
    title: string;
    additional: string | null;
    role: string;
    id: number;
  }>;
  public confirmationSubject$: Subject<{
    action: string;
    choice: boolean;
    id: number;
  }>;
  loadingModalSubject$: Subject<{ open: boolean; title: string }>;

  constructor() {
    this.loginModalSubject$ = new Subject<{ open: boolean }>();
    this.alertModalSubject$ = new Subject<{
      title: string;
      additional: string | null;
      role: string;
      id: number;
    }>();
    this.confirmationSubject$ = new Subject<{
      action: string;
      choice: boolean;
      id: number;
    }>();
    this.loadingModalSubject$ = new Subject<{ open: boolean; title: string }>();
  }

  get LoginModalState() {
    return this.loginModalSubject$ as Observable<{ open: boolean }>;
  }

  get AlertModalState() {
    return this.alertModalSubject$ as Observable<{
      title: string;
      additional: string;
      role: string;
      id: number;
    }>;
  }

  get ConfirmState() {
    return this.confirmationSubject$ as Observable<{
      action: string;
      choice: boolean;
      id: number;
    }>;
  }

  get LoadingModalState() {
    return this.loadingModalSubject$ as Observable<{
      open: boolean;
      title: string;
    }>;
  }

  showAlertModal(
    _text: string,
    _additional: string,
    _role: string,
    _id: number = -1
  ) {
    this.alertModalSubject$.next({
      title: _text,
      additional: _additional,
      role: _role,
      id: _id,
    });
  }

  showLoadingModal(_open: boolean, _title: string) {
    this.loadingModalSubject$.next({ open: _open, title: _title });
  }
}
