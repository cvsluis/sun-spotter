const router = require("express").Router();
const spotQueries = require('../db/queries/02_spots');
const labelQueries = require('../db/queries/06_labels');

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

    spotQueries.getOneSpot(spotID)
      .then(spot => {
        res.json(spot);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // /api/spots/:id/labels
  router.get("/spots/:id/label", (req, res) => {
    const spotID = req.params.id;

    labelQueries.getAllSpotLabels(spotID)
      .then(labels => {
        res.json(labels);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};