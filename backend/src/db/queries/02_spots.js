const db = require('../index');

// Get All Spots
const getAllSpots = (searchString) => {
  const queryParams = [];
  let queryString = `    
    WITH spot_rating AS (SELECT spots.id, ROUND(AVG(visits.rating), 1) AS rating, COUNT(visits.rating) AS rating_count
      FROM visits
      JOIN spots ON visits.spot_id = spots.id GROUP BY spots.id), 
    last_visit AS (SELECT DISTINCT ON (visits.spot_id) * 
      FROM visits ORDER BY visits.spot_id, visits.time_stamp),
    label_list AS (SELECT visit_list.spot_id, ARRAY_AGG(DISTINCT visit_list.label) AS list
      FROM (SELECT visits.spot_id , UNNEST(ARRAY_AGG(DISTINCT labels.name)) AS label  
      FROM visit_labels 
      FULL JOIN visits ON visits.id = visit_labels.visit_id 
      FULL JOIN labels ON labels.id = visit_labels.label_id JOIN spots ON spots.id = visits.spot_id 
      GROUP BY visits.id ORDER BY visits.spot_id) AS visit_list GROUP BY visit_list.spot_id)
    SELECT DISTINCT ON (spots.id) spots.id, spots.name, spots.lat, spots.lng, spots.city, spots.province, spots.country, last_visit.image_url, spot_rating.rating, spot_rating.rating_count, label_list.list 
    FROM spots 
    JOIN visits ON visits.spot_id = spots.id
    JOIN last_visit ON spots.id = last_visit.spot_id 
    JOIN spot_rating ON spots.id = spot_rating.id 
    JOIN label_list ON spots.id = label_list.spot_id `;

  // Check if searchString exists and add a WHERE clause to filter by it
  if (searchString) {
    queryParams.push(`%${searchString}%`);
    queryString += `WHERE spots.name ILIKE $${queryParams.length} OR spots.city ILIKE $${queryParams.length} OR spots.province ILIKE $${queryParams.length} OR spots.country ILIKE $${queryParams.length} `;
  }

  // order by last added spot
  queryString += `ORDER BY spots.id DESC;`;

  return db
    .query(queryString, queryParams)
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
  const { lat, lng, name, city, province, country } = spot;

  const query = `INSERT INTO spots(lat, lng, name, city, province, country)
                            VALUES ($1, $2, $3, $4, $5, $6) 
                            RETURNING *;`;

  return db.query(query, [lat, lng, name, city, province, country])
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

//get info required to render Visit Card
const getSpotVisits = function (spotID) {
  const query = `SELECT visits.id as id, users.profile_pic, users.first_name as first_name, users.last_name as last_name, visits.time_stamp as date, visits.image_url as image_url
                  FROM users JOIN visits
                  ON users.id = visits.user_id
                  WHERE visits.spot_id = $1
                  ORDER BY visits.time_stamp;`
  return db.query(query, [spotID])
    .then(data => data.rows);
    
}

module.exports = { getAllSpots, getOneSpot, createSpot, getSpotRating, getSpotLabels, getSpotVisits };