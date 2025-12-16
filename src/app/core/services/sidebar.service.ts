import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private $isOpenSource = signal<boolean>(false);
  readonly $isOpen = this.$isOpenSource.asReadonly();

  open(): void {
    this.$isOpenSource.set(true);
  }

  close(): void {
    this.$isOpenSource.set(false);
  }
}
