var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {
  //a route to direct readers to the index page
  router.get("/", function (req, res) {
    res.render('index');
  });
  //second route renders the saved handlebars page
  router.get("/saved", function (req, res) {
    res.render('saved');
  });
  //fetch articles
  router.get("/api/fetch", function (req, res) {
    console.log('api request received')
    headlinesController.fetch(function (err, docs) {
      console.log('Testing docs:', JSON.stringify(docs, null, 2))
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check tomorrow!"
        });
      }
      else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });
  router.get("/api/headlines", function (req, res) {
    console.log(req.query);
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function (data) {
      res.json(data);
    });
  });
  router.delete("/api/headlines/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function (err, data) {
      res.json(data);
    });
  });
  //new route to get id 
  router.post("/api/headlines/:id", function (req, res) {
    headlinesController.update(req.body, function (err, data) {
      if (err) {
        console.log(err)
      }
      console.log(data)
    });
  });
  router.patch("/api/headlines", function (req, res) {
    headlinesController.update(req.body, function (err, data) {
      res.json(data);
    });
  });
  router.get("/api/notes/:headline_id?", function (req, res) {
    var query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    notesController.get(query, function (err, data) {
      res.json(data);
    });
  });
  router.delete("/api/notes/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function (err, data) {
      res.json(data);
    });
  });
  router.post("/api/notes", function (req, res) {
    notesController.save(req.body, function (data) {
      res.json(data);
    });
  });
};
