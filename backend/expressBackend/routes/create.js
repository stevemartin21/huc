var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var passport = require('passport');

var Church = require('../models/church');

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post( "/church",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.body);
    console.log('1')
    const url = req.protocol + "://" + req.get("host");
    console.log(url);
    console.log(req.file.filename);
    const church = new Church({
      title: req.body.title,
      history: req.body.history,
      year: req.body.year,
      denomination: req.body.denomination,
      imagePath: url + "/images/" + req.file.filename,
      // creator: req.userData.userId,
      city: req.body.city,
      county: req.body.county,
    });
    console.log('2', church);
    church.save().then(createdChurch => {
      console.log('3')
      res.status(201).json({
        message: "Church added successfully",
        church: {
          ...createdChurch,
          id: createdChurch._id
        }
      });
    }) .catch(error => {
      console.log('4');
      res.status(500).json({
        message: "Creating a church failed!"
      });
    });
  }
);

router.get('/', (req, res) => {
  console.log('worked')
})

module.exports = router;
