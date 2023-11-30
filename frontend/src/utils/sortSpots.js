export default function sortSpots(spots, sortKey, isReverse) {
  const sortedSpots = spots.sort((spotA, spotB) => spotB[sortKey] - spotA[sortKey]);
  return isReverse? sortedSpots.reverse() : sortedSpots;
}