const router = require("express").Router();
const spotQueries = require('../db/queries/02_spots');


module.exports = db => {

  // /api/spots
  router.get("/spots", (req, res) => {
    spotQueries.getAllSpots(req.query.search)
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

  // /api/spots/:id/rating
  router.get("/spots/:id/rating", (req, res) => {
    const spotID = req.params.id;

    spotQueries.getSpotRating(spotID)
      .then(rating => res.json(rating))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // /api/spots/:id/labels
  router.get("/spots/:id/labels", (req, res) => {
    const spotID = req.params.id;

    spotQueries.getSpotLabels(spotID)
      .then(labels => {
        res.json(labels);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


// /api/spots/:id/visits
router.get("/spots/:id/:visits", (req, res) => {

  const spotID = req.params.id;

  spotQueries.getSpotVisits(spotID)
    .then(visits => {
      res.json(visits);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

  return router;
};