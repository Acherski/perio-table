import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'searchbox',
  templateUrl: './searchbox.component.html',
  styles: `
    .mat-mdc-text-field-wrapper {
      background: rgb(239 246 255) !important;
    }
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchBoxComponent implements OnInit {
  @Output() valueChange = new EventEmitter<string>();

  protected loader = false;
  protected searchControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
  });
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap(() => (this.loader = true)),
        debounceTime(2000),
        tap((value) => {
          this.valueChange.emit(value.trim());
          this.loader = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
