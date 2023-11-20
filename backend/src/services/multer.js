const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const url = `src/public/images`;
        cb(null, url);
    },
    filename(req, file, cb) {
      const fileName = file.originalname;
      cb(null, fileName);
    }
});

const uploadImg = multer({
    storage: storage
});

exports.uploadImg = uploadImg;