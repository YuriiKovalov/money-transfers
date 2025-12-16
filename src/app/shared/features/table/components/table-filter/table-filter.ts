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

  private readonly selectedValues = signal<string[]>([]);

  readonly isAllActive = computed(() => {
    const selectedCount = this.selectedValues().length;
    const total = this.$options().length;
    return selectedCount === 0 || selectedCount === total;
  });

  readonly activeValues = computed(() => {
    const explicit = this.selectedValues();
    if (explicit.length === 0 || explicit.length === this.$options().length) {
      return this.$options();
    }
    return explicit;
  });

  writeValue(value: string[] | null): void {
    if (!value || value.length === 0) {
      this.selectedValues.set([]);
      return;
    }

    const allowed = new Set(this.$options());
    const filtered = value.filter(v => allowed.has(v));

    if (filtered.length === 0 || filtered.length === this.$options().length) {
      this.selectedValues.set([]);
    } else {
      this.selectedValues.set(filtered);
    }
  }

  onAllClick(): void {
    this.selectedValues.set([]);
    this.emitChange();
  }

  onOptionToggle(value: string): void {
    const current = this.selectedValues();
    let next: string[];

    if (current.includes(value)) {
      next = current.filter(v => v !== value);
    } else {
      next = [...current, value];
    }

    const total = this.$options().length;

    if (next.length === 0 || next.length === total) {
      this.selectedValues.set([]);
    } else {
      this.selectedValues.set(next);
    }

    this.emitChange();
  }

  private emitChange(): void {
    const value = this.activeValues();
    this.emitValue(value);
  }
}
