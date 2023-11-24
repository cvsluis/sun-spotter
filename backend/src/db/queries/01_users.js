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
  query = `SELECT visits.id as id, visits.time_stamp as date, visits.image_url as image_url, visits.name as name, spots.lat, spots.lng 
   FROM visits JOIN spots ON spots.id = visits.spot_id WHERE visits.user_id = $1`

  return db.query(query, [userID])
    .then(data => data.rows)
    .catch(error => {
      console.error("Error querying the database: ", error)
      throw error});
}


module.exports = { getUsers, getUserByID, getVisitsByUser };
