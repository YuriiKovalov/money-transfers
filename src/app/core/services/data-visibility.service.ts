import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataVisibilityService {
  readonly $hasData = signal<boolean>(true);

  toggle(): void {
    this.$hasData.update(value => !value);
  }
}
