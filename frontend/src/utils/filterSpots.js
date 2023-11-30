export default function filterSpots(spots, setSpots, labels) {
  console.log('in filter', spots, labels)

  //if no labels chosen
  if (labels.length === 0) {
    setSpots(spots);
    console.log('no more filters');
    return;
  }

  let filteredSpots = [...spots];

  filteredSpots = filteredSpots.filter(spot => {
    //console.log(spot.list, labels);
    for (const label of labels) {
      //console.log(label)
      if (!spot.list.includes(label)) {
        //console.log("included!", label, spot.list)
        return false;
      }
      //console.log('nothing found', label)
    }
    return true;

  })
  console.log(filteredSpots)

  setSpots(filteredSpots)
  return;
}
