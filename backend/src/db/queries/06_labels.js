const db = require('../index');

// Get All Labels
const getAllLabels = () => {
  return db.query('SELECT * FROM labels;')
    .then(data => {
      return data.rows;
    });
};



module.exports = { getAllLabels, getAllSpotLabels };