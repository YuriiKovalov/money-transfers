import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LowerCasePipe, NgClass } from '@angular/common';
import { ColumnModel } from '../../column.model';
import { MaskPipe } from '../../../../pipes/mask.pipe';
import { IconDirective } from '../../../../directives/icon.directive';

@Component({
  selector: 'app-table',
  imports: [NgClass, LowerCasePipe, MaskPipe, IconDirective],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table<T extends object = Record<string, unknown>> {
  readonly $data = input.required<readonly T[]>({ alias: 'data' });
  readonly $columns = input.required<readonly ColumnModel<keyof T & string>[]>({
    alias: 'columns',
  });
}
