export const average = (arr) =>
  arr.reduce((acc, cur, _i, list) => acc + cur / list.length, 0);
