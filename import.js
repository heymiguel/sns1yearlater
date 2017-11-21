const mongoose = require('mongoose');
const Arc = require('./ArcModel.js');
// const mission = require('./MissionModel');
// arc !== arcs !!

mongoose.connect('mongodb://localhost/sns');

const arcs = [
    {
        name: "the first one",
        missionData: [
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
    },
    {
        name: "the second one",
        missionData: [
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
    },
    {
        name: "the third one",
        missionData: [
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
    },
]

// Drop any existing data inside of the arc table
// Arc.remove({}, () => {
//     console.log('All missions removed');
// });

arcs.forEach((arcData) => {
    console.log(arcData);
    let missionIds = arcData.missionData.map( (missionData) => {
        
        let missionModel = mongoose.model('Mission');
        let mission = new missionModel(missionData);
        mission.save((err, doc)=>{
            if (err) {
                console.log(err)
            }
            console.log(doc);
        });

        return mission._id;
    })
    
    let arc = new Arc(arcData);
    arc.missions = missionIds;
    arc.save((err, doc)=>{
        if (err) {
            console.log(err)
        }
        console.log(doc);
    });
    // const model = new Arc();
    // Object.assign(model, arcData);

    // model.save((err, doc) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(doc);
    // });
    // return;
});
