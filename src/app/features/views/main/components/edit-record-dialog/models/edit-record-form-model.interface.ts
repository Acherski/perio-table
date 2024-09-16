import { FormControl } from '@angular/forms';

// Formgroup type for edit record dialog
export interface EditRecordFormGroup {
  uuid: FormControl<string>;
  position: FormControl<number>;
  name: FormControl<string>;
  weight: FormControl<number>;
  symbol: FormControl<string>;
}
