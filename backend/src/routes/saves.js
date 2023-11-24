const router = require("express").Router();
const saveQueries = require('../db/queries/04_saves');

module.exports = db => {

  router.post('/saves', (req, res) => {
    const { userID, spotID } = req.body
    console.log(userID);
    saveQueries.createSave(userID, spotID)
      .then(res => res.status(201).json({ message: 'Data saved successfully' }))
      .catch(err => console.log("Error: ", err));
  })
  return router;
}

