import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RegisterFormGroup } from './../../models/register-form.model';

import { RegisterComponent } from './register.component';
import { AuthFacade } from '../../auth.facade';

class MockAuthFacade {
  getRegisterForm$(): Observable<FormGroup<RegisterFormGroup>> {
    return of({} as FormGroup<RegisterFormGroup>);
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [{ provide: AuthFacade, useClass: MockAuthFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
