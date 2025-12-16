import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask',
})
export class MaskPipe implements PipeTransform {
  transform(value: unknown, ..._args: unknown[]): string {
    if (value == null) {
      return '';
    }

    const str = String(value);

    if (str.length <= 4) {
      return str;
    }

    const lastFour = str.slice(-4);
    const maskedLength = str.length - 4;
    const masked = '*'.repeat(maskedLength);

    return masked + lastFour;
  }
}
