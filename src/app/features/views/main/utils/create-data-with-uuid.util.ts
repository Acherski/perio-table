import { PeriodicElement } from '@backend/table-api';
import { getUuid } from '@shared';
import { PeriodicElementWithUuid } from '../models/periodic-element-with-uuid.interface';

// Utility function, adds uuid to every periodic element record 
export const createTableDataWithUuids = (
  data: PeriodicElement[]
): PeriodicElementWithUuid[] =>
  data.map((item) => {
    return { ...item, uuid: getUuid() };
  });
