export const round = (value: number, precision = 4) => {
  const factor = 10 ** precision;
  const result = Math.round(value * factor) / factor;

  if (result === -0) {
    return 0;
  }
  return result;
};
