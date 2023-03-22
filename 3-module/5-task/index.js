function getMinMax(str) {
  result = str
    .split(" ")
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item))
    .sort((a, b) => a - b);
  return {
    min: result[0],
    max: result[result.length - 1],
  };
}
