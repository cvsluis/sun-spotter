const router = require("express").Router();
const userQueries = require('../db/queries/01_users');

module.exports = db => {
  
  router.get('/users', (req, res) => {
    userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    });
  });

  // Login
  router.post('/login', (req, res) => {
    const query = `SELECT * FROM users WHERE email=? AND password=?`
    
    db.query(query, [req.body.email, req.body.password], (err, data) => {
      if(err) {
        return res.json({Message: 'Server side error'})
      }
      
      console.log(res.json(data));

      return res.json({Status: 'Success'})
    })
  });
  
  return router;
};