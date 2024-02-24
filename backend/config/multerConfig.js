const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = `./public/uploads/1/`;
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + `-` + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
