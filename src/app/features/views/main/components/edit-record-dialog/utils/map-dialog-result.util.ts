import { FormGroup } from '@angular/forms';
import { EditRecordFormGroup } from '../models/edit-record-form-model.interface';
import { PeriodicElementWithUuid } from '../../../models/periodic-element-with-uuid.interface';

// Converts edit record form group data to payload data
export const mapDialogResult = (
  formGroup: FormGroup<EditRecordFormGroup>
): PeriodicElementWithUuid => {
  return {
    uuid: formGroup.controls.uuid.value,
    position: +formGroup.controls.position.value,
    name: formGroup.controls.name.value.trim(),
    weight: +formGroup.controls.weight.value,
    symbol: formGroup.controls.symbol.value.trim(),
  };
};
