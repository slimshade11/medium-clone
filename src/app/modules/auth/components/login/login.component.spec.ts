import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthFacade } from '@auth/auth.facade';
import { LoginComponent } from '@auth/components/login/login.component';
import { LoginFormGroup } from '@auth/models/login-form.model';
import { BackendErrors } from '@core/models/backend-errors.model';
import { FormPanelHeaderComponent } from '@shared/components/form-panel/components/auth-panel-header/form-panel-header.component';
import { formPanelContentComponent } from '@shared/components/form-panel/components/form-panel-content/form-panel-content.component';
import { FormPanelComponent } from '@shared/components/form-panel/form-panel.component';
import { Observable, of } from 'rxjs';

class MockAuthFacade {
  getIsLoading$(): Observable<boolean> {
    return of();
  }

  getErrors$(): Observable<BackendErrors | null> {
    return of();
  }

  getLoginForm$(): Observable<FormGroup<LoginFormGroup>> {
    return of();
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, FormPanelComponent, FormPanelHeaderComponent, formPanelContentComponent],
      imports: [MatFormFieldModule, MatCardModule],
      providers: [
        {
          provide: AuthFacade,
          useClass: MockAuthFacade,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
