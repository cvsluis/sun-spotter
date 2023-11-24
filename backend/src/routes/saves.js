const router = require("express").Router();
const saveQueries = require('../db/queries/04_saves');

module.exports = db => {

  router.post('/saves', (req, res) => {
    const { userID, spotID } = req.body;
    //console.log(userID);
    saveQueries.createSave(userID, spotID)
      .then((result) => {
        console.log(result)
        res.status(200).json({ message: "save Created!" })
      })
      .catch(err => console.log("Error: ", err));
  })

  router.post('/saves/checkSave', (req, res) => {
    const { userID, spotID } = req.body;
    console.log("in route: help meeeee");

    saveQueries.checkSave(userID, spotID) 
      .then(result => {
        console.log("is saved? ", result)
      })
      .catch(err => console.log("Error: ", err))
  })

  return router;
}

