const router = require("express").Router();
const visitQueries = require('../db/queries/03_visits');

module.exports = db => {

// get visits by spot name
router.get('/visits/:spotName', (req, res) => {

  const spotName = req.params.spotName;

  visitQueries.getVisitsBySpotName(spotName)
    .then(visits => {
      res.json({ visits });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

  return router;
};