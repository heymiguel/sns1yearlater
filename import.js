const mongoose = require('mongoose');
const Mission = require('./model.js');

mongoose.connect('mongodb://localhost/sns');

const missions = [
    {
        missionName: "here We go again",
        whichCampaign: "unique-id-1",
        cardinality: 1, // in sequence, which mission is this
        oneShot: true, // duh.
        theatre:{
          description: "ok", // overall thematic description. Fluff.
          size: 3, // (town, city, country, nation, international, world)
          accessDescription: "walled off",
          easeOfAccess: 1, // low is hard to access, high is easy to access
          socialDescription: "average",
          socialStability: 4, // low is unstable high is stable
          govermentDescription: "unstable", 
          governmentStability: 1, // low is unstable, high is stable.
          economicDescription: "not great", // describe the economic situation.
          economicSituation: 2, // low is destitute, high is affluent
        },
        theSheep: {
          description: "Chill", // how aware is the civi pop of espionage.
          moodTowardsEspionage: 1, // low is dont care high is pretty paranoid.
        },
        theWolves: {
          description: "people do", // who operates in this area?
          knownFactions: "Aesir", // specific factions who operate here
        }
    },
    {
        missionName: "electric boogaloo",
        whichCampaign: "unique-id-2",
        cardinality: 1, // in sequence, which mission is this
        oneShot: true, // duh.
        theatre:{
          description: "ok", // overall thematic description. Fluff.
          size: 3, // (town, city, country, nation, international, world)
          accessDescription: "walled off",
          easeOfAccess: 1, // low is hard to access, high is easy to access
          socialDescription: "average",
          socialStability: 4, // low is unstable high is stable
          govermentDescription: "unstable", 
          governmentStability: 1, // low is unstable, high is stable.
          economicDescription: "not great", // describe the economic situation.
          economicSituation: 2, // low is destitute, high is affluent
        },
        theSheep: {
          description: "Chill", // how aware is the civi pop of espionage.
          moodTowardsEspionage: 1, // low is dont care high is pretty paranoid.
        },
        theWolves: {
          description: "people do", // who operates in this area?
          knownFactions: "Lensmen", // specific factions who operate here
        }
    },
]

// Drop any existing data inside of the movies table
Mission.remove({}, () => {
    console.log('All missions removed');
});

missions.forEach((mission) => {
    const model = new Mission();
    Object.assign(model, mission);
    model.save((err, doc) => {
        if (err) {
            console.log(err);
        }
        console.log(doc);
    });
    return;
});
