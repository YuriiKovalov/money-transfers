import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataVisibilityService {
  private $hasDataSource = signal<boolean>(true);
  readonly $hasData = this.$hasDataSource.asReadonly();

  toggle(): void {
    this.$hasDataSource.update(value => !value);
  }
}
