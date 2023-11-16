const db = require('../index');

// Get All Spots
const getAllSpots = () => {
  return db.query(`
    WITH spot_rating AS (SELECT spots.id, ROUND(AVG(visits.rating), 1) as rating
    FROM visits
    JOIN spots ON visits.spot_id = spots.id GROUP BY spots.id), last_visit AS (SELECT DISTINCT ON (spot_id) * FROM visits ORDER BY spot_id, visits.created_at) 
    SELECT spots.*, last_visit.image_url, spot_rating.rating 
    FROM spots 
    JOIN last_visit ON spots.id = last_visit.spot_id 
    JOIN spot_rating ON spots.id = spot_rating.id
    ORDER BY spot_id DESC;
  `)
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

// Get Spot Rating
const getSpotRating = (spotID) => {
  return db.query(`SELECT ROUND(AVG(visits.rating), 1) as average_rating FROM visits JOIN spots ON visits.spot_id = spots.id WHERE spots.id = $1;`, [spotID])
    .then(data => {
      return data.rows;
    });
};

// Get All Labels associated with one spot and their respective counts
const getSpotLabels = (id) => {
  const query = `SELECT labels.id as id, labels.name as name, COUNT(visits.name) 
                  FROM spots JOIN visits 
                  ON spots.id = visits.spot_id 
                  JOIN visit_labels 
                  ON visits.id = visit_labels.visit_id 
                  JOIN labels 
                  ON labels.id = visit_labels.label_id 
                  WHERE spots.id = $1 
                  GROUP BY labels.id, labels.name;`

  return db.query(query, [id])
  .then(data => {
    return data.rows;
  });
};

module.exports = { getAllSpots, getOneSpot, createSpot, getSpotRating, getSpotLabels };