const db = require("../index");

const getSavedUserSpots = function (userID) {
  const query = `SELECT SPOTS.id AS spot_id, SPOTS.lat AS lat, SPOTS.lng AS lng, SPOTS.name AS spotName, SPOTS.city AS city, SPOTS.province AS province, SPOTS.country AS country, VISITS.*
                            FROM SPOTS
                            JOIN SAVES ON SPOTS.id = SAVES.spot_id
                            JOIN VISITS ON SPOTS.id = VISITS.spot_id
                            WHERE SAVES.user_id = $1;`;
  return db.query(query, [userID]).then((data) => data.rows);
};

module.exports = { getSavedUserSpots };
