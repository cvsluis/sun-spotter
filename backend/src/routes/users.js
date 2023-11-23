const router = require("express").Router();
const userQueries = require('../db/queries/01_users');

module.exports = db => {
  
  router.get('/users', (req, res) => {
    userQueries.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    });
  });


  router.get('/users/:id', (req, res) => {
    const userID = req.params.id;
    userQueries.getVisitsByUser(userID)
    .then(visits => {
        res.json(visits)}) 
    .catch(error => {res
        .status(500)
        .json({error: error.message})
    });
  });

  
  return router;
};