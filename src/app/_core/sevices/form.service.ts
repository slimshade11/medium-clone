import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class FormService {
  protected fb = inject(FormBuilder);
  private _form!: FormGroup<any>;
  private _form$: BehaviorSubject<FormGroup<any>> = new BehaviorSubject<FormGroup<any>>(this._form);

  abstract get config(): any;

  public buildForm(): void {
    this._form = this.config;
    this._form$.next(this._form);
  }

  public getForm$(): Observable<FormGroup<any>> {
    return this._form$.asObservable();
  }
}
