// Dependencies
//handles node framework
var express = require("express"),
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
  //debugging tool
  logger = require('morgan'),
  //scraper tools
  request = require("request"),
  cheerio = require("cheerio");


//set up port listener

// Initialize Express
var app = express();

//set up Express router
var router = express.Router();

//require our routes file
require("./config/routes")(router);

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

//public static file directory
app.use(express.static(__dirname + "/public"));

// Set Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


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



// Launch App
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Running on port: ' + PORT);
});