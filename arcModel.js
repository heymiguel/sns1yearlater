const mongoose = require('mongoose');
const Mission = require('./missionModel')

const ArcSchema = new mongoose.Schema({
  arcName: String,
  author: mongoose.Schema.Types.ObjectId,
  missions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission'
  }],
});

module.exports = mongoose.model('Arc', ArcSchema);