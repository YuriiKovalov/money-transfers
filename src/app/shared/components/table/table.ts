import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimpleModel } from '../../../core/models/simple.model';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  readonly $data = input.required<Array<Record<string, unknown>>>({ alias: 'data' });
  readonly $columns = input.required<SimpleModel<string>[]>({ alias: 'columns' });
}
