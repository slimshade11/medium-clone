import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup<any>;
}
