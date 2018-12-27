var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var passport = require('passport');
const jwt = require('jsonwebtoken');

var Church = require('../models/church');
var User = require('../models/user');

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

//  create new User

router.post('/user', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
    console.log('User 1')
    if(user){
     return  res.json({message: 'There is alread a user with that email'})
    } else {
      console.log(req.body, '1');
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {

          if (err) throw err;
          newUser.password = hash;
          console.log('2')
          newUser.save().then(createdUser => {
            console.log('3')
            res.status(201).json({
              message: "User added successfully",
              user: {
                ...createdUser,
                id: createdUser._id
              }
            })
          })

        })
      })
    }
  })
});

//  Create a token

router.post('/token', (req, res) => {
  let fetchedUser;

  User.findOne({email: req.body.email}).then(user => {
        if(!user){
          return res.status(400).json({message: 'There is no user with that email address'})
        }
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
      if(!result){
        res.status(401).json({message: 'The passwords do not match'
        })
      } else {
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id , name: fetchedUser.name },
          "secret_this_should_be_longer" ,
          { expiresIn: "1h" }
        );
        console.log(token);
        res.status(200).json({
          message: 'Congrats You have logged in',
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        });
      }
    }).catch(err => {
      return res.status(401).json({
        message: "Authorization failed"
      });
    });
  });





module.exports = router;
