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
  const { first_name, last_name, email, password, city, province, country } = spot;

  const query = `INSERT INTO spots(first_name, last_name, email, password, city, province, country)
                            VALUES ($1, $2, $3, $4, $5, $6, $7) 
                            RETURNING *;`;

  return db.query(query, [first_name, last_name, email, password, city, province, country])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    });  
};

module.exports = { getAllSpots, getOneSpot, createSpot };