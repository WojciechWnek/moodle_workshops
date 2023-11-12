const findTrend = (array, value) => {
  const indexesOfTrends = array.reduce(
    (indexes, element, index) => (element.includes(value) ? [...indexes, index] : indexes),
    []
  );
  const trendIndex = indexesOfTrends.reverse().filter((index) => array[index + 1] !== '-')[0];

  const trend = trendIndex ? array[trendIndex] : 'Brak tendencji';

  return trend;
};

export default findTrend;
