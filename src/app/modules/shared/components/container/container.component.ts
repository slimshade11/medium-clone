import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-container',
  template: `
    <section
      [style.max-width]="width"
      class="mx-auto px-3 xl:px-0">
      <ng-content></ng-content>
    </section>
  `,
})
export class ContainerComponent {
  @Input() width: string = '1500px';
}
