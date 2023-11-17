const db = require('../index');

const getVisitsBySpotID = function (spotID) {
  const query = `SELECT * FROM visits WHERE spot_id = $!`
  db.query(query, [spotID])
    .then(data => data.rows) ;
}


module.exports = {};