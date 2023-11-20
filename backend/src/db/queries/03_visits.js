const db = require('../index');

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


module.exports = { createVisit };