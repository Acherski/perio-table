export const getUuid = (parts: number = 5): string => {
  const stringArray = [];
  for (let i = 0; i < parts; i++) {
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArray.push(S4);
  }
  return stringArray.join('-');
};
