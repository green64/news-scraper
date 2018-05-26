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
  //scraper tools
  cheerio = require("cheerio");

//set up port listener
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//set up Express router
var router = express.Router();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));

//public static file directory
app.use(express.static(__dirname + "/public"));


//  ---------------Database configuration--------------------
//  ---------------define local MongoDB URI--------------------
var databaseUrl = "mongodb://localhost/scraper";
//  -----------------------------------------------------------
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUrl);
}
//  -----------------End db config----------------------------

var db = mongoose.connection;

// show mongoose errors
db.on("error", function (err) {
  console.log("Mongooose Error: ", err);
});

// success message if connected
db.once('open', function () {
  console.log("Mongoose connection successful.")
});

// Set Handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Set the app to listen on port 3000
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});