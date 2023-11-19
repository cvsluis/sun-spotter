const router = require("express").Router();
const multerExport = require("./multer");

module.exports = db => {

  // Get All Labels
  router.get('/image', (req, res) => {
    res.json({ 'hi' : 'hi'});
  });

  router.post("/image", multerExport.uploadImg.single("file"), async (req, res, next) => {
    const file = req.file;

    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }

    res.status(200).send("File saved!");
  });

  return router;
};