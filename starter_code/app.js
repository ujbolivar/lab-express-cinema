require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


Movies.find()
.select({ title: 1, year: 1 })
.then(allMovies => {
  res.render("index", {
    allMovies,
    creator: process.env.MY_CREATOR,
    host: process.env.HOST
  });
});
} else {
if (req.params.sortOrder === "asc") {
Movies.find()
  .select({ title: 1, year: 1 })
  .sort({ year: 1 })
  .then(allMovies => {
    res.render("index", {
      allMovies,
      creator: process.env.MY_CREATOR,
      host: process.env.HOST
    });
  });
}

if (req.params.sortOrder === "desc") {
Movies.find()
  .select({ title: 1, year: 1 })
  .sort({ year: -1 })
  .then(allMovies => {
    res.render("index", {
      allMovies,
      creator: process.env.MY_CREATOR,
      host: process.env.HOST
    });
  });
}
}
});

app.get("/movie/:id", (req, res) => {
Movies.findById(req.params.id).then(oneMovie => {
res.render("movie-detail", { oneMovie, host: process.env.HOST });
});
});


app.get("/search", (req, res) => {
Movies.find({ title: req.query.movie }).then(movieDetails => {
res.render("form-page-2", { query: movieDetails });
});
});

app.get("/form", (req, res) => {
res.render("form-page");
});

// query get with multi-params
app.get("/users/:username/books/:bookId", (req, res, next) => {
res.send(req.params.username + "    " + req.params.bookId);
});

// http://localhost:5000/movie-querystring?identificadorPeli=5d7775a51be232a0c7086e20&genres=Drama,Crime
app.get("/movie-querystring", (req, res) => {
Movies.find({ genre: { $all: req.query.genres.split(",") } })
//.select({title: 1})
.then(oneMovie => {
res.json(oneMovie);
})
.catch(error => {
res.json({ movieNotFound: true, error });
});
});

app.get("/create-movie", (req, res) => {
res.render("add-movie");
});

app.post("/create-movie-2", (req, res) => {
console.log(req.body)
Movies.create({
title: req.body.title,
year: req.body.year,
rate: req.body.rate,
director: req.body.director,
duration: req.body.duration
// genre: [String]
}).then(createdMovie => {
res.json({
movieCreated: true,
createdMovie
});
});
});

// default value for title local
app.locals.title = '';



const index = require('./routes/index');
app.use('/', index);


module.exports = app;

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
