import { PeriodicElement } from '@backend/table-api';

export interface PeriodicElementWithUuid extends PeriodicElement {
  uuid: string;
}
