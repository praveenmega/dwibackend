const express = require('express');
const {getAllListings,postListing} = require('../controllers/listingController');
var multer = require("multer");
const path = require('path');
const imageResize = require('../middleware/imageResize');
const auth = require('../middleware/auth');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const router = express.Router();

router
    .route('/')
    .get(getAllListings)
    .post(upload.array("images"),imageResize,postListing);

module.exports = router;