import { Directive, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'input[numbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective implements AfterViewInit {
  private ngControl = inject(NgControl);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.ngControl.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string) => {
        const initialValue =
          typeof value === 'string' ? value.replace(/[^0-9]/g, '') : '';

        if (value !== initialValue) {
          this.ngControl.control?.setValue(initialValue, { emitEvent: false });
        }
      });
  }
}