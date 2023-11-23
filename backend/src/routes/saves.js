const router = require("express").Router();
const savesQueries = require('../db/queries/04_saves');


module.exports = db => {

  // /api/spots
  router.get("/saves/:id", (req, res) => {
    const user_id = req.params.id;

    savesQueries.userSpots(user_id)
      .then(spotsID => {
        res.json(spotsID);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}