const router = require("express").Router();
const saveQueries = require('../db/queries/04_saves');


module.exports = db => {

  router.post('/saves', (req, res) => {
    const { userID, spotID } = req.body;
    saveQueries.createSave(userID, spotID)
      .then((result) => {
        res.status(200).json({ message: "save Created!", id: result.id })
      })
      .catch(err => console.log("Error: ", err));
  })

  router.post('/saves/checkSave', (req, res) => {
    const { userID, spotID } = req.body;

    saveQueries.checkSave(userID, spotID) 
      .then(result => {
        if (!result) {
          res.status(200).json({exists: 'false', message: "This location is not saved."})
        } else {
          res.status(200).json({exists: 'true', message: "This location is saved!", id: result.id})
        }   
      })
      .catch(err => console.log("Error: ", err))
  });

  router.delete('/saves/:id', (req, res) => {
    const saveID = req.params.id;

    saveQueries.deleteSave(saveID) 
      .then(() => {
        res.status(200).json({message: "success deleting!"})
      })
      .catch(err => console.log("Error: ", error));
  });

  return router;
}

