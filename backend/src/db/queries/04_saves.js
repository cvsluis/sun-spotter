const db = require('../index');


//get user saved spots
const userSpots = function (userID) {
  const query = `SELECT * FROM saves WHERE user_id=$1;`;
  return db.query(query, [userID])
  .then(data => data.rows);
}

module.exports = {userSpots};