var express = require('express');
var router = express.Router();
var Church = require('../models/church');

/* GET home page. */

router.delete('/church/:id', (req, res) =>  {
  console.log('Made it to the delete Route');
  Church.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Deleting posts failed!"
    });
  });
})


module.exports = router;
