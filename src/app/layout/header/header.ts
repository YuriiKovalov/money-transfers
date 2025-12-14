import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="h-12 flex items-center">
      <div class="w-20 h-[30px] mx-4">
        <img
          src="assets/images/logo-st-dark.svg"
          alt="SAGE TRADER"
          class="h-full w-auto object-contain"
        />
      </div>
    </header>
  `,
  styles: [
    `
      header {
        background-color: var(--color-background-header);
      }
    `,
  ],
})
export class Header {}
