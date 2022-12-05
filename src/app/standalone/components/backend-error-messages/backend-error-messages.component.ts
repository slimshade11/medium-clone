import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BackendErrors } from '@core/models/backend-errors.model';

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  template: `
    <div class="flex flex-col">
      <div
        *ngFor="let error of errorMessages"
        class="mb-2">
        <mat-error>{{ error }}</mat-error>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors!: BackendErrors;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string): string => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  }
}
