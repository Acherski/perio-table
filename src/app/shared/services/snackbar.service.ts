import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  // Popup duration in miliseconds
  defaultDuration = 5000;
  snackBarActionLabel = 'CLOSE';

  constructor(private matsnack: MatSnackBar) {}

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['success-snackbar'],
    duration: this.defaultDuration,
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['error-snackbar'],
    duration: this.defaultDuration,
  };

  private configInfo: MatSnackBarConfig = {
    panelClass: ['info-snackbar'],
    duration: this.defaultDuration,
  };

  showSuccessMessage(message: string): void {
    this.matsnack.open(message, this.snackBarActionLabel, this.configSuccess);
  }

  showErrorMessage(message: string): void {
    this.matsnack.open(message, this.snackBarActionLabel, this.configError);
  }

  showInfoMessage(message: string): void {
    this.matsnack.open(message, this.snackBarActionLabel, this.configInfo);
  }
}
