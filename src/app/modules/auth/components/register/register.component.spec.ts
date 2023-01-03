import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { ContainerComponent } from '@app/modules/shared/components/container/container.component';
import { AuthFacade } from '@auth/auth.facade';
import { RegisterComponent } from '@auth/components/register/register.component';
import { RegisterFormGroup } from '@auth/models/register-form.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { MockBuilder } from 'ng-mocks';
import { Observable, of } from 'rxjs';

class MockAuthFacade {
  getRegisterForm$(): Observable<FormGroup<RegisterFormGroup>> {
    return of({} as FormGroup<RegisterFormGroup>);
  }

  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getErrors$(): Observable<BackendErrors | null> {
    return of();
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    return MockBuilder(ContainerComponent);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ContainerComponent],
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
