import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transfers-withdraw',
  imports: [],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Withdraw</h2>
      <p>Withdraw content goes here</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Withdraw {}
