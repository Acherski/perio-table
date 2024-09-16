import { FormControlOptions, Validators } from '@angular/forms';

export const requiredNonNullable: FormControlOptions & {
  nonNullable: true;
} = { validators: Validators.required, nonNullable: true };
