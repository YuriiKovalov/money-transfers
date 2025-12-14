import { Component, input, output } from '@angular/core';

export interface TabItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-tabs',
  imports: [],
  template: `
    <nav class="flex gap-6 mb-4">
      @for (tab of $tabs(); track tab.route) {
        <button
          type="button"
          [class]="
            $activeTab() === tab.route
              ? 'px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium shadow-sm'
              : 'px-4 py-2 text-gray-600 hover:text-gray-900'
          "
          (click)="onTabClick(tab.route)"
        >
          {{ tab.label }}
        </button>
      }
    </nav>
    <div class="border-b border-gray-200"></div>
  `,
  styles: [],
})
export class TabsComponent {
  $tabs = input.required<TabItem[]>({ alias: 'tabs' });
  $activeTab = input.required<string>({ alias: 'activeTab' });
  tabChange = output<string>();

  onTabClick(route: string): void {
    if (this.$activeTab() !== route) {
      this.tabChange.emit(route);
    }
  }
}
