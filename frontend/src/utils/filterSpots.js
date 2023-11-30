export default function filterSpots(spots, setSpots, labels) {
  console.log('in filter', spots, labels)

  let filteredSpots = [...spots];

  if (labels.length === 0) {
    setSpots(spots);
  }

  filteredSpots = filteredSpots.filter(spot => {
    //console.log(spot.list, labels);
    for (const label of labels) {
      //console.log(label)
      if (spot.list.includes(label)) {
        //console.log("included!", label, spot.list)
        return true;
      }
      //console.log('nothing found', label)
      return false;
    }

  })
  console.log(filteredSpots)

  setSpots([...spots])
  return;
}
