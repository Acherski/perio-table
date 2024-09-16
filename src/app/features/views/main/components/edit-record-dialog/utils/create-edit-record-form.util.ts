import { FormControl, FormGroup } from '@angular/forms';
import { requiredNonNullable } from '@shared';
import { EditRecordFormGroup } from '../models/edit-record-form-model.interface';
import { PeriodicElementWithUuid } from '../../../models/periodic-element-with-uuid.interface';

// Utility function used in edit record dialog
export const createEditRecordFormGroupUtil = (
  data: PeriodicElementWithUuid
): FormGroup<EditRecordFormGroup> => {
  return new FormGroup<EditRecordFormGroup>({
    uuid: new FormControl<string>(data.uuid, { nonNullable: true }),
    position: new FormControl<number>(data.position, requiredNonNullable),
    name: new FormControl<string>(data.name, requiredNonNullable),
    weight: new FormControl<number>(data.weight, requiredNonNullable),
    symbol: new FormControl<string>(data.symbol, requiredNonNullable),
  });
};
