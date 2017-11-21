const mongoose = require('mongoose');
const arc = require('./arcModel');

const UserSchema = new mongoose.Schema({
  user: String,
  password: String,
  arcs: [arc],
});

module.exports = mongoose.model('User', UserSchema);