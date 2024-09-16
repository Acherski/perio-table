import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NumberOrDecimalDirective } from '../../directives/only-decimals.directive';
import { NumbersOnlyDirective } from '../../directives/only-numbers.directive';

@Component({
  standalone: true,
  selector: 'common-control',
  templateUrl: './common-control.component.html',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    NumbersOnlyDirective,
    NumberOrDecimalDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonControlComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) control!: FormControl;
  @Input() controlType: 'text' | 'number' | 'decimal' = 'text';
}
