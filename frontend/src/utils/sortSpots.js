export default function sortSpots(flaggedSpots, setFlaggedSpots, setSpots, sortKey) {
  let sortedSpots = [...flaggedSpots];
  sortedSpots = sortedSpots.sort((spotA, spotB) => spotB.spot[sortKey] - spotA.spot[sortKey]);
  setFlaggedSpots(sortedSpots);
}