import { CallState } from '@shared';
import { PeriodicElementWithUuid } from './periodic-element-with-uuid.interface';

export interface MainComponentStoreInterface {
  callState: CallState;
  tableData: PeriodicElementWithUuid[];
  filteredData: PeriodicElementWithUuid[];
}
