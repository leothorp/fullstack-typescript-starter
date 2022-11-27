/* eslint-disable @typescript-eslint/no-explicit-any */
export const toObj = (arr, getKey, getVal) => {
    return arr.reduce((acc, curr) => {
        acc[getKey(curr)] = getVal(curr);
        return acc;
    }, {});
};
