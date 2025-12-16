import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataVisibilityService } from '../../core/services/data-visibility.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { IconDirective } from '../../shared/directives/icon.directive';

@Component({
  selector: 'app-header',
  imports: [IconDirective],
  template: `
    <header class="flex items-center justify-between">
      <div class="flex items-center">
        <span
          icon="menu"
          size="24px"
          class="icon mx-4 lg:hidden"
          role="button"
          (click)="openSidebar()"
        ></span>

        <div class="logo-wrapper mx-4">
          <img
            src="assets/images/logo-st-dark.svg"
            alt="SAGE TRADER"
            class="h-full w-auto object-contain"
          />
        </div>
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

      .icon {
        background-color: var(--color-primary-white) !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly visibilityService = inject(DataVisibilityService);
  private readonly sidebarService = inject(SidebarService);

  readonly $hasData = this.visibilityService.$hasData;

  toggleData(): void {
    this.visibilityService.toggle();
  }

  openSidebar(): void {
    this.sidebarService.open();
  }
}
