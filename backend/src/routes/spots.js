const router = require("express").Router()
const spotQueries = require('../db/queries/02_spots')

module.exports = db => {

  // /api/spots
  router.get("/spots", (req, res) => {
    spotQueries.getAllSpots()
      .then(spots => {
        res.json(spots);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // /api/spots/:id
  router.get("/spots/:id", (req, res) => {

    const spotID = req.params.id;
    console.log(spotID)

    spotQueries.getOneSpot()
      .then(spot => {
        res.json(spot);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};