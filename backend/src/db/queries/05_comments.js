const db = require('../index');

// Get Comments for one Visit
const getVisitComments = (id) => {
  return db.query(`
        SELECT comments.*, users.first_name, users.last_name, users.profile_pic  
        FROM comments 
        JOIN users ON comments.user_id = users.id
        WHERE comments.visit_id = $1;`, [id])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { getVisitComments };