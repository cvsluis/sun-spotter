const db = require('../index');

// Get Comments for one Visit
const getVisitComments = (id) => {
  return db.query(`
        SELECT comments.*, users.first_name, users.last_name, users.profile_pic  
        FROM comments 
        JOIN users ON comments.user_id = users.id
        WHERE comments.visit_id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

// Create Comment
const createComment = (comment) => {
  const { user_id, visit_id, description } = comment;

  const query = `INSERT INTO comments(user_id, visit_id, description)
                            VALUES ($1, $2, $3) 
                            RETURNING *;`;

  return db.query(query, [user_id, visit_id, description])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    });
};

module.exports = { getVisitComments, createComment };