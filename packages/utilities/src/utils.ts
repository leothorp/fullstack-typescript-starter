// eslint-disable @typescript-eslint/no-explicit-any
export const toObj = <T extends object>(
  arr: T[],
  getKey: (arrEl: T) => string,

  getVal: (arrEl: T) => any
): { [key: string]: any } => {
  return arr.reduce((acc, curr) => {
    acc[getKey(curr)] = getVal(curr);
    return acc;
  }, {} as { [key: string]: any });
};
