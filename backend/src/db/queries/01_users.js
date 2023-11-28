const db = require('../index');

const getUsers = () => {
  return db.query(`SELECT * FROM users;`)
    .then(data => {
      return data.rows;
    });
};

const getUserByID = (id) => {
  return db.query(`SELECT * FROM USERS WHERE id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

const getVisitsByUser = (userID) => {
  query = `SELECT spots.name as name, visits.id as id, visits.time_stamp as date, visits.image_url as image_url, spots.lat, spots.lng, spots.city, spots.province  
    FROM visits 
    JOIN spots ON spots.id = visits.spot_id
    WHERE visits.user_id = $1
   ORDER BY visits.time_stamp;`

  return db.query(query, [userID])
    .then(data => data.rows)
    .catch(error => {
      console.error("Error querying the database: ", error)
      throw error});
};

const getSavesByUser = function(userID) {
  const query = `SELECT
  SPOTS.name AS name,
  MIN(SPOTS.id) AS spot_id,
  MIN(SPOTS.lat) AS lat,
  MIN(SPOTS.lng) AS lng,
  MIN(SPOTS.city) AS city,
  MIN(SPOTS.province) AS province,
  MIN(SPOTS.country) AS country,
  MIN(VISITS.image_url) AS image_url
FROM
  SPOTS
JOIN SAVES ON SPOTS.id = SAVES.spot_id
JOIN VISITS ON SPOTS.id = VISITS.spot_id
WHERE
  SAVES.user_id = $1
GROUP BY
  SPOTS.name;`;
  return db.query(query, [userID]).then((data) => data.rows);
};


module.exports = { getUsers, getUserByID, getVisitsByUser, getSavesByUser };
