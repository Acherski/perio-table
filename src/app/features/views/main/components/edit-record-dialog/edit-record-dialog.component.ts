import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditRecordFormGroup } from './models/edit-record-form-model.interface';
import { createEditRecordFormGroupUtil } from './utils/create-edit-record-form.util';
import { mapDialogResult } from './utils/map-dialog-result.util';
import { SnackBarService, CommonControlComponent } from '@shared';
import _ from 'lodash';

@Component({
  selector: 'edit-record-dialog',
  templateUrl: './edit-record-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonControlComponent,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRecordDialogComponent {
  private data = inject(MAT_DIALOG_DATA);
  private snackBarService = inject(SnackBarService);
  private dialogRef = inject(MatDialogRef<EditRecordDialogComponent>);

  protected formGroup: FormGroup<EditRecordFormGroup> = createEditRecordFormGroupUtil(
    this.data.element
  );

  onSaveClick() {
    // Display message if form is invalid
    if (this.formGroup.invalid) {
      this.snackBarService.showErrorMessage('Form is invalid');
      return;
    }

    // Display message if no value has changed
    const updatedData = mapDialogResult(this.formGroup);
    if (_.isEqual(this.data.element, updatedData)) {
      this.snackBarService.showInfoMessage('You have not changed any data');
      return;
    }

    // Emit updated data if values are given and form is valid
    this.dialogRef.close(updatedData);
  }
}
