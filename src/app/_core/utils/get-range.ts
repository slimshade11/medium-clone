export const getRange = (start: number, end: number): Array<number> => {
  return [...Array(end).keys()].map((el: number) => el + start);
};
