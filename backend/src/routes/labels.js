const router = require("express").Router();
const labelQueries = require('../db/queries/labels');

module.exports = db => {

// Get All Labels
router.get('/labels', (req, res) => {
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
