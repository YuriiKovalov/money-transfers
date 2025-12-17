import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  computed,
  signal,
  input,
} from '@angular/core';
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
export class TableFilter extends SignalControlValueAccessor<string[]> {
  readonly $options = input.required<string[]>({ alias: 'options' });

  private readonly $selectedValue = signal<string | null>(null);

  readonly $isAllActive = computed(() => {
    return this.$selectedValue() === null;
  });

  readonly $activeValues = computed(() => {
    const selected = this.$selectedValue();
    if (selected === null) {
      return this.$options();
    }

    return [selected];
  });

  writeValue(value: string[] | null): void {
    if (!value || value.length === 0) {
      this.$selectedValue.set(null);
      return;
    }

    const allowed = new Set(this.$options());
    const firstAllowed = value.find(v => allowed.has(v));

    if (!firstAllowed || value.length === this.$options().length) {
      this.$selectedValue.set(null);
    } else {
      this.$selectedValue.set(firstAllowed);
    }
  }

  onAllClick(): void {
    this.$selectedValue.set(null);
    this.emitChange();
  }

  onOptionToggle(value: string): void {
    const current = this.$selectedValue();

    if (current === value) {
      this.$selectedValue.set(null);
    } else {
      this.$selectedValue.set(value);
    }

    this.emitChange();
  }

  private emitChange(): void {
    const value = this.$activeValues();
    this.emitValue(value);
  }
}
