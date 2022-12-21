export const getRange = (start: number, end: number): Array<number> => {
  return [...Array(end).keys()].map<number>((el: number) => el + start);
};
