import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transfers-deposit',
  imports: [],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Deposit</h2>
      <p>Deposit content goes here</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Deposit {}
