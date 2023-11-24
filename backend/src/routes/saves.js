const router = require("express").Router();
const savesQueries = require('../db/queries/04_saves');


module.exports = db => {

  router.get('/saves/:spots/:id', (req, res) => {
    const userID = req.params.id;
  
    savesQueries.getSavedUserSpots(userID)
    .then(savedSpots => {
      res.json(savedSpots);
    })
    .catch(err => {
      res.status(500)
      .json({error: err.message});
    });
  });
  return router
}