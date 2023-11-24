const router = require("express").Router();
const saveQueries = require('../db/queries/04_saves');


module.exports = db => {

  router.post('/saves', (req, res) => {
    const { userID, spotID } = req.body;
    //console.log(userID);
    saveQueries.createSave(userID, spotID)
      .then((result) => {
        console.log(result)
        res.status(200).json({ message: "save Created!", id: result.id })
      })
      .catch(err => console.log("Error: ", err));
  })

  router.post('/saves/checkSave', (req, res) => {
    
    //console.log("in router!")
    const { userID, spotID } = req.body;
    //console.log("in route 19: ", userID, spotID, req.body);

    saveQueries.checkSave(userID, spotID) 
      .then(result => {
        //console.log("is saved? (in route 23) ", result);
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
   // console.log(saveID);
    console.log('in delete route')

    saveQueries.deleteSave(saveID) 
      .then(() => {
        console.log("it's been deleted!");
        res.status(200).json({message: "success deleting!"})
      })
      .catch(err => console.log("Error: ", error));
  });

  return router;
}

