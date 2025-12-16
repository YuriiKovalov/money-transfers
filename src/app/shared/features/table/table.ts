import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LowerCasePipe, NgClass } from '@angular/common';
import { ColumnModel } from './column.model';

@Component({
  selector: 'app-table',
  imports: [NgClass, LowerCasePipe],
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
