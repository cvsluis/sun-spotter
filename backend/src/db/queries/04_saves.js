const db = require('../index');

const createSave = (userID, spotID) => {
  const query = `INSERT INTO SAVES(user_id, spot_id) VALUES ($1, $2) RETURNING *;`;

  return db.query(query, [userID, spotID])
  .then(data => data.rows )
  .catch(err => console.log('Error inserting save into database: ', err))
}

module.exports = { createSave }