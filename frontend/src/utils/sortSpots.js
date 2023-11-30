export default function sortSpots(spots, setSpots, sortKey) {
  let sortedSpots = [...spots];
  sortedSpots = sortedSpots.sort((spotA, spotB) => spotB[sortKey] - spotA[sortKey]);
  setSpots(sortedSpots);
}