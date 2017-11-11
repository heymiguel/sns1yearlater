const express = require('express');
const app = express();
const path = require('path');
// models && schema //

const mongoose = require('mongoose');
const Mission = require('./model.js');

const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/sns');

app.use(bodyParser.json());
// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)

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

app.post('/api/missions', (req, res) => {
  // const movieModel = new Movie(); // create new instance of the model
  // const movie = Object.assign(movieModel, req.body);

  // movie.save()
  //   .then((doc) => {
  //     res.status(200).send(doc)
  //   })
  //   .catch((err) => {
  //     res.status(404).send(err);
  //   })
});

app.put('/api/missions/:id', (req, res) => {
  const model = req.body;
  const mission = Mission.findById(req.params.id)
    .then((doc) => {
      const updatedMovie = Object.assign(doc, model);
      updatedMovie.save()
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
