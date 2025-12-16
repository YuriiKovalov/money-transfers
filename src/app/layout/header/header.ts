import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataVisibilityService } from '../../core/services/data-visibility.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { IconDirective } from '../../shared/directives/icon.directive';

@Component({
  selector: 'app-header',
  imports: [IconDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
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
