const router = require("express").Router();
const multerExport = require("../services/multer");
const visitQueries = require('../db/queries/03_visits');
const visitlabelQueries = require('../db/queries/07_visit_labels');

module.exports = db => {
  // POST /api/visits
  router.post("/visits", multerExport.uploadImg.single("file"), async (req, res) => {
    try {
      const data = JSON.parse(req.body.data);
      const file = req.file; // to get file name

      // need to be logged in, check for user (to be implemented)
      // for now user_id will be 1
      const user_id = 1;
      const newVisit = data.visit;
      const newVisitLabels = data.labels;

      // add details to new Visit
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

      res.status(200).json({ message: "Visit Created!" });
    } catch (error) {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    }
  });

  return router;
};