import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataVisibilityService } from '../../core/services/data-visibility.service';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="flex items-center justify-between">
      <div class="logo-wrapper mx-4">
        <img
          src="assets/images/logo-st-dark.svg"
          alt="SAGE TRADER"
          class="h-full w-auto object-contain"
        />
      </div>
      <button type="button" class="button-secondary mx-4" (click)="toggleData()">
        {{ $hasData() ? 'Hide Data' : 'Show Data' }}
      </button>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly visibilityService = inject(DataVisibilityService);

  readonly $hasData = this.visibilityService.$hasData;

  toggleData(): void {
    this.visibilityService.toggle();
  }
}
