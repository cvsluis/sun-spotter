const db = require('../index');

// Get All Labels
const getAllLabels = () => {
  return db.query('SELECT * FROM labels;')
    .then(data => {
      return data.rows;
    });
};

// Get All Labels associated with one spot and their respective counts
const getAllSpotLabels = (id) => {
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

module.exports = { getAllLabels, getAllSpotLabels };