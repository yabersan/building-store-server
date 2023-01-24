const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "images");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const image = multer({ storage });

module.exports = image;
