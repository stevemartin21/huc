var express = require('express');
var router = express.Router();
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



/*
router.put('/church/:id', (req, res ) => {
  Church.findByIdAndUpdate({_id: req.params.id}).then(church => {
    res.status(200).json(church)
  }).catch(error => {
    res.status(400).json({message: 'There was an error'});
  } )
})
*/

router.put(
  "/church/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log('Step 1');
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    console.log('Step 2');
    const church = new Church({
      _id: req.params.id,
      title: req.body.title,
      history: req.body.history,
      year: req.body.year,
      denomination: req.body.denomination,
      imagePath: imagePath,
      city: req.body.city,
      county: req.body.county,
    });
    console.log('Step 3', church);
    Church.updateOne({ _id: req.params.id }, church).then(result => {
      console.log('Step 4');
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }).catch(error => {
      res.status(500).json({
        message: "Couldn't udpate Church!"
      });
    });
  }
);

module.exports = router;
