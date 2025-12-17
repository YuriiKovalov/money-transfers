import { ChangeDetectionStrategy, Component, forwardRef, signal, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { SignalControlValueAccessor } from '../../../../classes/signal-control-value-accessor';
import { IconDirective } from '../../../../directives/icon.directive';

@Component({
  selector: 'app-table-filter',
  imports: [IconDirective],
  templateUrl: './table-filter.html',
  styleUrl: './table-filter.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableFilter),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilter extends SignalControlValueAccessor<string> {
  readonly $options = input.required<string[]>({ alias: 'options' });

  readonly $selectedValue = signal<string | null>(null);

  writeValue(value: string | null): void {
    const options = this.$options();
    const validValue = value && options.includes(value) ? value : (options[0] ?? null);
    this.$selectedValue.set(validValue);
  }

  onOptionToggle(value: string): void {
    if (this.$selectedValue() === value) {
      return;
    }

    this.$selectedValue.set(value);
    this.emitChange();
  }

  private emitChange(): void {
    const value = this.$selectedValue();
    if (value) {
      this.emitValue(value);
    }
  }
}
