import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mc-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Output() public badgeEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input() public label: string = '';
  @Input() public isActive: boolean = false;
  @Input() public count: number = 0;

  badgeClick(): void {
    this.badgeEmitter.emit();

    if (this.isActive) {
      this.count = --this.count;
    } else {
      this.count = ++this.count;
    }

    this.isActive = !this.isActive;
  }
}
