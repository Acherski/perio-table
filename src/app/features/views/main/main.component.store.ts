import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, switchMap, take, tap } from 'rxjs';
import {
  convertApiTextResponseToJson,
  TableApiService,
} from '@backend/table-api';
import { MainComponentStoreInterface } from './models/main-component-store.interface';
import { createTableDataWithUuids } from './utils/create-data-with-uuid.util';
import { PeriodicElementWithUuid } from './models/periodic-element-with-uuid.interface';
import { filterTableUtil } from './utils/filter-table.util';
import { HttpErrorResponse } from '@angular/common/http';
import _ from 'lodash';
import { SnackBarService, LoadingState } from '@shared';

@Injectable()
export class MainComponentStore
  extends ComponentStore<MainComponentStoreInterface>
  implements OnStoreInit
{
  constructor(
    private tableApiService: TableApiService,
    private snackBarService: SnackBarService
  ) {
    super({
      callState: LoadingState.INIT,
      tableData: [],
      filteredData: [],
    });
  }
  readonly callState$ = this.select((state) => state.callState);
  readonly tableData$ = this.select((state) => state.tableData);
  readonly filteredData$ = this.select((state) => state.filteredData);

  // Load data on app start
  ngrxOnStoreInit() {
    this.fetchData();
  }

  // Fetching data with http services
  readonly fetchData = this.effect((trigger$) =>
    trigger$.pipe(
      // Assigns loading state to CallState
      tap(() => this.patchState({ callState: LoadingState.LOADING })),
      switchMap(() =>
        this.tableApiService.loadList().pipe(
          tapResponse({
            next: (data) => {
              // Converts response of type text to PeriodicElement[]
              const apiTextResponseAsJson = convertApiTextResponseToJson(data);

              // Adds uuid to every PeriodicElement element
              const dataWithUuid = createTableDataWithUuids(
                apiTextResponseAsJson
              );

              // Assigns data to component store selectors and loaded state to CallState
              this.patchState({
                tableData: dataWithUuid,
                filteredData: dataWithUuid,
                callState: LoadingState.LOADED,
              });
            },
            error: (error: HttpErrorResponse) => {
              // In case of failure assigns error state to Callstate, optionally displays error message
              this.patchState({ callState: error });
              if (error.message) {
                this.snackBarService.showErrorMessage(error.message);
              }
            },
          })
        )
      )
    )
  );

  // Filters table data
  readonly filterData = this.effect(
    (trigger$: Observable<{ searchValue: string }>) =>
      trigger$.pipe(
        switchMap(({ searchValue }) =>
          this.tableData$.pipe(
            tapResponse({
              next: (tableData) => {
                // Shows table with results meeting given criteria
                if (searchValue) {
                  const filteredData = filterTableUtil(
                    this.tableData$,
                    searchValue
                  );
                  this.patchState({ filteredData });
                } else {
                  // If searchbox is cleared, shows all table data
                  this.patchState({ filteredData: tableData });
                }
              },
              error: (error: HttpErrorResponse) => {
                // Assigns error state to Callstate, optionally displays error message
                this.patchState({ callState: error });
                if (error.message) {
                  this.snackBarService.showErrorMessage(error.message);
                }
              },
            })
          )
        )
      )
  );

  // Updates chosen record with new, given value
  readonly updateData = this.effect(
    (trigger$: Observable<{ updatedElement: PeriodicElementWithUuid }>) =>
      trigger$.pipe(
        switchMap(({ updatedElement }) =>
          this.tableData$.pipe(
            take(1),
            tapResponse({
              next: (tableData) => {
                // Finds element with the same uuid and updates its data
                const updatedTableData: PeriodicElementWithUuid[] = [
                  ...tableData,
                ];
                const elementIndex = updatedTableData.findIndex(
                  (element) => element.uuid === updatedElement.uuid
                );
                updatedTableData[elementIndex] = updatedElement;

                // Assigns updated data to component store selectors and loaded state to CallState
                // Displays success snackbar message
                this.patchState({
                  tableData: [...updatedTableData],
                  filteredData: [...updatedTableData],
                });
                this.snackBarService.showSuccessMessage(
                  'Record updated successfully'
                );
              },
              error: (error: HttpErrorResponse) => {
                // Assigns error state to Callstate in case of failure, optionally displays error message
                this.patchState({ callState: error });
                if (error.message) {
                  this.snackBarService.showErrorMessage(error.message);
                }
              },
            })
          )
        )
      )
  );
}
