import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'mc-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-8  bg-indigo-900 rounded-lg text-gray-300">
      <div class="max-w-md mx-auto text-center">
        <p class="text-4xl">Medium clone</p>
        <p class="text-2xl">A place to share knowledge</p>
      </div>
    </div>
  `,
})
export class BannerComponent {}
