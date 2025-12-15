import { ControlValueAccessor } from '@angular/forms';

export abstract class SignalControlValueAccessor<T> implements ControlValueAccessor {
  protected onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};
  isDisabled = false;

  abstract writeValue(value: T | null): void;

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected emitValue(value: T): void {
    this.onChange(value);
    this.onTouched();
  }
}
