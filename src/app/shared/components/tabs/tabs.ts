import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NavigationItem } from '../../../core/models/navigation-item.interface';

@Component({
  selector: 'app-tabs',
  imports: [],
  template: `
    <nav class="flex gap-1">
      @for (tab of $tabs(); track tab.route) {
        <button
          type="button"
          [class.active]="$activeTab() === tab.route"
          (click)="onTabClick(tab.route)"
        >
          {{ tab.label }}
        </button>
      }
    </nav>
  `,
  styles: [
    `
      button {
        cursor: pointer;
        width: 96px;
        border-radius: 20px;
        padding: 10px 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;

        &.active,
        &:hover {
          font-weight: 600;
          background: var(--color-primary-blue-light);
          color: var(--color-primary-blue);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  $tabs = input.required<NavigationItem[]>({ alias: 'tabs' });
  $activeTab = input.required<string>({ alias: 'activeTab' });
  tabChange = output<string>();

  onTabClick(route: string): void {
    if (this.$activeTab() !== route) {
      this.tabChange.emit(route);
    }
  }
}
