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

const getOneVisitLabels = (visit_id) => {
  return db.query(`
        SELECT DISTINCT labels.name
        FROM visit_labels 
        JOIN labels ON visit_labels.label_id = labels.id 
        WHERE visit_labels.visit_id = $1 
        GROUP BY labels.name;`, [visit_id])
    .then(data => {
      return data.rows;
    });
}; 


module.exports = { addVisitLabels, getOneVisitLabels };