const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  missionName: { type: String, required: true },
  whichArc: { type: mongoose.Schema.Types.ObjectId, required: true}, 
  difficulty: {type: Number},
  cardinality: { type: Number, default: 1 }, // in sequence, which mission is this
  oneShot: { type: Boolean, default: false }, // duh.
  theatre:{
    description: { type: String, default: ' ' }, // overall thematic description. Fluff.
    size: { type: Number, default: 1 }, // (town, city, country, nation, international, world)
    accessDescription: { type: String, default: ' ' },
    easeOfAccess: { type: Number, default: 3 }, // low is hard to access, high is easy to access
    socialDescription: { type: String, default: ' ' },
    socialStability: { type: Number, default: 1 }, // low is unstable high is stable
    govermentDescription: { type: String, default: ' ' }, 
    governmentStability: { type: Number, default: 1 }, // low is unstable, high is stable.
    economicDescription: { type: String, default: ' ' }, // describe the economic situation.
    economicSituation: { type: String, default: '  ' }, // low is destitute, high is affluent
  },
  theSheep: {
    description: { type: String, default: ' ' }, // how aware is the civi pop of espionage.
    moodTowardsEspionage: { type: Number, default: 3 }, // low is dont care high is pretty paranoid.
  },
  theWolves: {
    description: { type: String, default: '  ' }, // who operates in this area?
    knownFactions: { type: String, default: '  ' }, // specific factions who operate here
  }
})

module.exports = mongoose.model('Mission', MissionSchema);

