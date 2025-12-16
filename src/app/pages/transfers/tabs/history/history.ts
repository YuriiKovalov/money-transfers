import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transfers-history',
  imports: [],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">History</h2>
      <p>History content goes here</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class History {}
