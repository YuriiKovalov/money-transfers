import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="flex items-center">
      <div class="logo-wrapper mx-4">
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
        height: var(--header-height);
        background-color: var(--color-background-header);
      }

      .logo-wrapper {
        max-width: 80px;
        max-height: 30px;
      }
    `,
  ],
})
export class Header {}
