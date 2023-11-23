const db = require('../index');

const getUsers = () => {
  return db.query(`SELECT * FROM users;`)
    .then(data => {
      return data.rows;
    });
};

const getUserByID = (id) => {
  return db.query(`SELECT * FROM USERS WHERE id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};


module.exports = { getUsers, getUserByID };