const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
  plot: String,
  posterUrl: String,
})

module.exports = mongoose.model('Movie', MovieSchema);

