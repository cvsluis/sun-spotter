export default function filterSpots(flaggedSpots, setFlaggedSpots, labels) {
  console.log('in filter', flaggedSpots, labels)

  //if no labels chosen
  if (labels.length === 0 ) {
    let updatedSpots = [...flaggedSpots]
    updatedSpots = updatedSpots.map(flaggedSpot => ({...flaggedSpot, isHidden: false}))
    setFlaggedSpots(updatedSpots);
    console.log('no more filters');
    return;
  }

  let filteredSpots = [...flaggedSpots];

  filteredSpots = filteredSpots.map(flaggedSpot => {

    for (const label of labels) {
      if (!flaggedSpot.spot.list.includes(label)){
        //console.log('the spot, ', flaggedSpot.spot.name, ' does not have label ', label)
        flaggedSpot.isHidden = true;
        return flaggedSpot
      }
    }
    flaggedSpot.isHidden = false;
    console.log('the spot', flaggedSpot, ' has all selected labels')
    return flaggedSpot
  })

  console.log("after the filter ", filteredSpots)

  setFlaggedSpots(filteredSpots)
  return;
}
