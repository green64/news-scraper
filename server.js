// Dependencies
//handles node framework
const express = require("express"),
  //object modeling tool generates data models
  mongoose = require("mongoose"),
  //implements mongodb API
  mongojs = require("mongojs"),
  //makes http calls
  request = require("request"),
  //body parser handles form subs
  bodyParser = require("body-parser"),
  //require up Handlebars
  exphbs = require("express-handlebars"),
  //logging tools
  morgan = require('morgan'),
  logger = require('./logger'),
  //scraper tools
  cheerio = require("cheerio");

//set up port listener
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// set up Express router
var router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

//public static file directory
app.use(express.static(__dirname +'/public'));

// Set Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

// Load morgan middlware
app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: process.stderr
}));

// Make sure all request go through our router middleware
app.use(router);

// Port that express should listen on
app.listen(PORT, function () {
  console.log('Running on port: ' + PORT);
});



// app.get('/', function (req, res) {
//   logger.debug('Debug statement');
//   logger.info('Info statement');
//   res.render('index');
// });

// app.get('/saved', function (req, res) {
//   logger.debug('Debug statement');
//   logger.info('Info statement');
//   res.render('saved');
// });

// app.use(function(req, res, next){
//   logger.error('404 page requested');
//   res.status(404).send('This page does not exist!');
// });

// app.listen(PORT, function(){
//   logger.info('Example app listening on port ' + PORT);
// });

//------------------end of morgan & winston logging ------------








//  ---------------Database configuration--------------------
//  ---------------define local MongoDB URI--------------------
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://Samantha18:fp18!@ds235840.mlab.com:35840/heroku_t5n25mqp";

//  -----------------------------------------------------------
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function () {
  console.log('Mongoose connection successful.');
});
//  -----------------End db config----------------------------
