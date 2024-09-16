import { NgClass, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'button-icon',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    TitleCasePipe,
    MatButtonModule,
    NgClass,
  ],
  styles: `
    .mdc-fab {
      height: 2rem;
      width: 2rem;
    }

    .mat-mdc-fab-base {
      border-radius: 0 !important;
      background-color: transparent !important;
      box-shadow: none !important;
    }
  `,
  templateUrl: './button-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconComponent {
  @Output() rowClickEvent = new EventEmitter();

  @Input() type: 'edit' | 'add' | 'delete' = 'edit';

  onRowClick() {
    this.rowClickEvent.emit();
  }
}
