const router = require("express").Router();
const savesQueries = require('../db/queries/04_saves');


module.exports = db => {

  // /api/spots
  router.get("/saves/:id", (req, res) => {
    savesQueries.userSpots(req.body.data)
      .then(spots => {
        res.json(spots);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}