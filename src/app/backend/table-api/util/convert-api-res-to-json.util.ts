import { PeriodicElement } from '../types/periodic-element';

// Converts api response (plain text) to array of PeriodicElement's (json-like)
export const convertApiTextResponseToJson = (
  data: string
): PeriodicElement[] => {
  // Omits variables name and takes array data
  const responseString = data.split('=')[1];

  // Finds index of last comma and removes it
  const lastComma = responseString.lastIndexOf(',');
  const semifinalString =
    responseString.slice(0, lastComma) + responseString.slice(lastComma + 1);

  // Replaces single quotes with double quotes, removes unnecessary semicolon
  const finalString = semifinalString
    .replace(';', '')
    .replaceAll("'", '"')
    .replaceAll('position', '"position"')
    .replaceAll('symbol', '"symbol"')
    .replaceAll('weight', '"weight"')
    .replaceAll('name', '"name"');

  // Creates array of periodic elements from string and returns it
  return JSON.parse(finalString);
};
