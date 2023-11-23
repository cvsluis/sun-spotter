const router = require("express").Router();
const saveQueries = require('../db/queries/04_saves.sql');

module.exports = db => {

  router.post('/saves', (req, res) => {
    const { userID, spotID } = req.body
    console.log(userID);
    saveQueries.createSave(userID, spotID)
      .catch(err => "Error: ", err);
  })
}

