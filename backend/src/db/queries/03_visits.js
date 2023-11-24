const db = require('../index');

// Get One Visit
const getOneVisit = (id) => {
  return db.query(`SELECT visits.*, users.first_name, users.last_name, users.profile_pic, users.city, users.province FROM VISITS JOIN users ON visits.user_id = users.id WHERE visits.id = $1;`, [id])
    .then(data => {
      return data.rows[0];
    });
};

// Create Visit
const createVisit = (visit) => {
  const { user_id, spot_id, chosenName, image_url, rating, description, time_stamp } = visit;

  const query = `INSERT INTO visits(user_id, spot_id, name, image_url, rating, description, time_stamp)
                            VALUES ($1, $2, $3, $4, $5, $6, $7) 
                            RETURNING *;`;

  return db.query(query, [user_id, spot_id, chosenName, image_url, rating, description, time_stamp])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    });
};


module.exports = { getOneVisit, createVisit };