import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconDirective } from '../../directives/icon.directive';

@Component({
  selector: 'app-account-type',
  imports: [IconDirective],
  templateUrl: './account-type.html',
  styleUrl: './account-type.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountType {
  readonly $title = input.required<string>({ alias: 'title' });
  readonly $description = input.required<string>({ alias: 'description' });
  readonly $buttonText = input.required<string>({ alias: 'buttonText' });
  readonly $icon = input.required<string>({ alias: 'icon' });
}
