const db = require('../index');

const getVisitsBySpotName = function (spotName) {
  const query = `SELECT * FROM visits 
  JOIN spots ON spots.id = visits.spot_id
  WHERE spots.name = $1`
  db.query(query, [spotName])
    .then(data => data.rows) ;
}


module.exports = {};