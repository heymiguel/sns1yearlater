const express = require('express');
const app = express();
const path = require('path');


const mongoose = require('mongoose');
const passport = require('passport');
// models && schema //
const Mission = require('./missionModel.js');
const Arc = require('./arcModel.js');
const User = require('./userModel.js');

const bodyParser = require('body-parser');
const session = require('express-session');


// sorcery //
passport.use(User.createStrategy());
app.use(bodyParser.json());
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
// change me to COOKIE_SECRET!
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/sns');
app.use(passport.initialize());
app.use(passport.session());

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)

app.get('/api/me', (req, res) => {
  // returns currently logged in user, if there is one.
  if (req.user) {
    res.status(200).send(req.user)
  } else {
    res.status(401).json({ message: "No user session found."});
  }
});

app.post('/api/signup', (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  }); 

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // res.status(200).logIn(user, (err) => {
      //   res.send(user);
      // });
      req.logIn(user, (err) => {
        res.send(user);
      });
    }
  });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json('User logged out.');
});

app.get('/api/missions/', (req, res) => {
  Mission.find().then((missions) => {
    res.status(200).send(missions)
  })
  .catch((err) => {
    res.status(400).send(err)
  })
})

app.delete('/api/missions/:id', (req, res) => {
  // const movieId = req.params.id;
  // Movie.remove({ _id: movieId })
  // .then((movie) => {
  //   res.status(200).send(movie)
  // })
  // .catch((err) => {
  //   res.status(400).send(err)
  // })
})

app.get('/api/arcs/', (req, res) => {
  Arc.find().then((arcs) => {
    res.status(200).send(arcs)
  })
  .catch((err) => {
    res.status(400).send(err)
  })
})

app.get('/api/arcs/:user_id', (req, res) => {
  Arc.find({ author: req.params.user_id })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/missions/:arc_id', (req, res) => {
  Mission.find({ whichArc: req.params.arc_id })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/api/arcs', (req, res)=>{
  console.log(req.body)
  const arcModel = new Arc();
  const arc = Object.assign(arcModel, req.body);

  arc.save()
    .then((doc)=>{
      res.status(200).send(doc)
      console.log(doc)
    })
    .catch((err)=>{
      res.status(404).send(err)
      console.log(err)
    });
});

app.post('/api/missions', (req, res) => {
  const missionModel = new Mission(); // create new instance of the model
  const mission = Object.assign(missionModel, req.body);

  mission.save()
    .then((doc) => {
      res.status(200).send(doc)
    })
    .catch((err) => {
      res.status(404).send(err);
    })
});

app.put('/api/missions/:id', (req, res) => {
  const model = req.body;
  const mission = Mission.findById(req.params.id)
    .then((doc) => {
      const updatedMission = Object.assign(doc, model);
      updatedMission.save()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

// This route serves your index.html file (which
// initializes React)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(8080, function () {
  console.log("App is now listening on port 8080!");
})
