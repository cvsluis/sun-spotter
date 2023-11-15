const db = require('../index');

// Get All Spots
const getAllSpots = () => {
  return db.query('SELECT * FROM spots;')
    .then(data => {
      return data.rows;
    });
};

// Get One Spot
const getOneSpot = (id) => {
  return db.query(`SELECT * FROM SPOTS WHERE id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

// Create Spot
const createSpot = (spot) => {
  const { lat, lng, name, city, province, country, created_at } = spot;

  const query = `INSERT INTO spots(lat, lng, name, city, province, country, created_at)
                            VALUES ($1, $2, $3, $4, $5, $6, $7) 
                            RETURNING *;`;

  return db.query(query, [lat, lng, name, city, province, country, created_at])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    });  
};

module.exports = { getAllSpots, getOneSpot, createSpot };