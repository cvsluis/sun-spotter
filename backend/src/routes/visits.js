const router = require("express").Router();
const visitQueries = require('../db/queries/03_visits');

module.exports = db => {

// get visits by spot name
router.get('/visits/:', (req, res) => {
  labelQueries.getAllLabels()
    .then(labels => {
      res.json({ labels });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

  return router;
};