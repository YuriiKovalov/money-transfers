import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LowerCasePipe, NgClass } from '@angular/common';
import { ColumnModel } from '../../models/column.model';
import { MaskPipe } from '../../../../pipes/mask.pipe';
import { IconDirective } from '../../../../directives/icon.directive';

@Component({
  selector: 'app-table-cards',
  imports: [NgClass, LowerCasePipe, MaskPipe, IconDirective],
  templateUrl: './table-cards.html',
  styleUrl: './table-cards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCards<T extends object = Record<string, unknown>> {
  readonly $data = input.required<readonly T[]>({ alias: 'data' });
  readonly $columns = input.required<readonly ColumnModel<keyof T & string>[]>({
    alias: 'columns',
  });
}
