const router = require("express").Router();

module.exports = db => {
  router.get("/spots", (req, res) => {
    res.send('Spots API route is working properly! Ready to give back some data 🫡');
  });

  return router;
};