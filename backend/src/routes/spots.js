const router = require("express").Router();
const spotQueries = require('../db/queries/02_spots');
const visitQueries = require('../db/queries/03_visits');
const visitlabelQueries = require('../db/queries/07_visit_labels');
const multerExport = require("../services/multer");

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
  router.post("/spots", multerExport.uploadImg.single("file"), async (req, res) => {
    try {
      const data = JSON.parse(req.body.data);
      const file = req.file; // to get file name

      // need to be logged in, check for user (to be implemented)
      // for now user_id will be 1
      const user_id = 1;
      const newSpot = data.spot;
      const newVisit = data.visit;
      const newVisitLabels = data.labels;

      const spot = await spotQueries.createSpot(newSpot);

      // add details to new Visit
      newVisit.spot_id = spot.id;
      newVisit.user_id = user_id;
      newVisit.time_stamp = newVisit.time_stamp.replace("T", " ");
      newVisit.image_url = 'images/' + file.originalname;

      const visit = await visitQueries.createVisit(newVisit);

      // add visit id to all visit label pairs
      const visitIdAdded = newVisitLabels.map(obj => ({ ...obj, visit_id: visit.id }));

      // create array of add visit label queries to be executed
      const visitLabelQueryList = [];
      for (const item of visitIdAdded) {
        visitLabelQueryList.push(visitlabelQueries.addVisitLabels(item));
      }
      // create promise for all visit label insert queries
      await Promise.all(visitLabelQueryList);

      res.status(200).json({ message: "Spot Created!" });
    } catch (error) {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    }
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

route.get('/spots/users/:id', (req, res) => {
  const userID = req.params.id;

  spotQueries.getSavedUserSpots(userID)
  .then(savedSpots => {
    res.json(savedSpots);
  })
  .catch(err => {
    res.status(500)
    .json({error: err.message});
  });
});

  return router;
};