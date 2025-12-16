import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Sidebar } from './layout/sidebar/sidebar';
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styles: [
    `
      main {
        background-color: var(--color-background-body);
      }

      .sidebar-backdrop {
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease;
      }

      .sidebar-container {
        position: fixed;
        top: var(--header-height);
        left: 0;
        bottom: 0;
        height: calc(100vh - var(--header-height));
        z-index: 50;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        overflow-y: auto;
      }

      .sidebar-container.sidebar-open {
        transform: translateX(0);
      }

      @media (min-width: 1024px) {
        .sidebar-container {
          position: static;
          transform: translateX(0);
          display: block;
          z-index: auto;
          height: auto;
          overflow-y: visible;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly sidebarService = inject(SidebarService);

  readonly $sidebarOpen = this.sidebarService.$isOpen;

  closeSidebar(): void {
    this.sidebarService.close();
  }
}
