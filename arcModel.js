const mongoose = require('mongoose');
const Mission = require('./missionModel')

const ArcSchema = new mongoose.Schema({
  arcName: {type: String, required: true},
  author: mongoose.Schema.Types.ObjectId,
  arcDescription: String,
  missions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission'
  }],
});

module.exports = mongoose.model('Arc', ArcSchema);