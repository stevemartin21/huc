const mongoose = require('mongoose');

const churchSchema = mongoose.Schema({
  title: { type: String, required: true },
  history: { type: String, required: true },
  year: { type: String, required: true },
  denomination: { type: String, required: true },
  imagePath:{ type: String, required: true },
  // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  city:{ type: String, required: true },
  county:{ type: String, required: true },
  // service:{ type: String, required: true }
});

module.exports = mongoose.model('Church', churchSchema);
