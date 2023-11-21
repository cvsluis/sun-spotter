const db = require('../index');

// Add Visit Labels
const addVisitLabels = (visitLabels) => {
  const { visit_id, label_id } = visitLabels;

  const query = `INSERT INTO visit_labels(visit_id, label_id)
                            VALUES ($1, $2) 
                            RETURNING *;`;

  return db.query(query, [visit_id, label_id])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    });
};


module.exports = { addVisitLabels };