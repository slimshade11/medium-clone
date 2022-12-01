import { Component, OnInit, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterForm } from '@auth/models/register-form.model';
import { RegisterFormService } from '@auth/services/register-form.service';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styles: [''],
  providers: [RegisterFormService],
})
export class RegisterComponent extends DestroyComponent implements OnInit {
  form!: FormGroup<RegisterForm>;

  constructor(@Self() private registerFormService: RegisterFormService) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerFormService.buildForm();
    this.registerFormService
      .getForm$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form) => (this.form = form),
      });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
