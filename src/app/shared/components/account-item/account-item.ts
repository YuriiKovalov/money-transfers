import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaskPipe } from '../../pipes/mask.pipe';

@Component({
  selector: 'app-account-item',
  imports: [MaskPipe],
  templateUrl: './account-item.html',
  styleUrl: './account-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountItem {
  $label = input.required<string>({ alias: 'label' });
  $number = input.required<string>({ alias: 'number' });
}
