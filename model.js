const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  missionName: String,
  whichCampaign: String,
  cardinality: Number, // in sequence, which mission is this
  oneShot: Boolean, // duh.
  theatre:{
    description: String, // overall thematic description. Fluff.
    size: Number, // (town, city, country, nation, international, world)
    accessDescription: String,
    easeOfAccess: Number, // low is hard to access, high is easy to access
    socialDescription: String,
    socialStability: Number, // low is unstable high is stable
    govermentDescription: String, 
    governmentStability: Number, // low is unstable, high is stable.
    economicDescription: String, // describe the economic situation.
    economicSituation: Number, // low is destitute, high is affluent
  },
  theSheep: {
    description: String, // how aware is the civi pop of espionage.
    moodTowardsEspionage: Number, // low is dont care high is pretty paranoid.
  },
  theWolves: {
    description: String, // who operates in this area?
    knownFactions: String, // specific factions who operate here
  }
})

module.exports = mongoose.model('Mission', MissionSchema);

