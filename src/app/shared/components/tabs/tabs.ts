import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NavigationItem } from '../../../core/models/navigation-item.interface';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
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
