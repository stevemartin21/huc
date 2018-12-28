var express = require('express');
var router = express.Router();
var Church = require('../models/church');

/* GET home page. */
// Get All Churches
router.get('/churches', (req, res ) => {
  Church.find().then(churches => {
    res.status(200).json( churches)
  } ).catch( error => {
    res.status(500).json({message:'There was an error getting those churches'})
  })
})

// get one church

router.get('/church/:id', (req, res) => {
  Church.findOne({_id: req.params.id}).then(church => {
    res.status(200).json(church)
  } ).catch(error => {
    res.status(400).json({message: 'No church was found'})
  })
} )

module.exports = router;
