export default function filterSpots(flaggedSpots, setFlaggedSpots, labels) {
  let filteredSpots = [...flaggedSpots];

  filteredSpots = filteredSpots.map(flaggedSpot => {

    for (const label of labels) {
      if (!flaggedSpot.spot.list.includes(label)){
        flaggedSpot.isHidden = true;
        return flaggedSpot;
      }
    }
    flaggedSpot.isHidden = false;
    return flaggedSpot
  });

  setFlaggedSpots(filteredSpots);
}
