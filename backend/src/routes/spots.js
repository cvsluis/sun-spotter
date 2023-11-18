const router = require("express").Router();
const spotQueries = require('../db/queries/02_spots');
const visitQueries = require('../db/queries/03_visits');
const visitlabelQueries = require('../db/queries/07_visit_lables');

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

  // POST /api/spots
  router.post("/spots", (req, res) => {
    // need to be logged in, check for user (to be implemented)
    // for now user_id will be 1
    const user_id = 1;
    const newSpot = req.body.spot;
    const newVisit = req.body.visit;
    const newVisitLabels = req.body.labels;

    // call createSpot with newSpot details
    spotQueries.createSpot(newSpot)
    // .then(receive spot id from query return and pass it to create visit)
      .then((received_spot) => {
        newVisit.spot_id = received_spot.id;
        newVisit.user_id = user_id;
        newVisit.timestamp = newVisit.dateTime.replace("T", " ")

        visitQueries.createVisit(newVisit)
          .then(() => {
            visitlabelQueries.addVisitLabels(newVisitLabels)
            .then(() => res.redirect("/spots"))
          })
      }).catch(err => res.status(500).json({ error: err.message }));
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