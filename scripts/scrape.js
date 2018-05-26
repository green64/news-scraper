//scrape script

//Require request and cheerio to makes scrapes work
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

  request("https://www.theguardian.com/us", function (err, res, body) {

    var $ = cheerio.load(body);

    var articles = [];

    // With cheerio, find every page article 
    $("h2.fc-item__title").each(function (i, element) {

      //Headline - the title of the article
      var head = $(this).children("span.js-headline-text").text().trim();
      //Summary - a short summary of the article
      var summary = $(this).children("span.fc-item__kicker").text().trim();
      //URL - the url to the original article
      var url = $(this).children().attr("href");


        // var headNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // var summaryNeat = summary.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // var urlNeat = url.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        if (head && summary && url) {

        var head = head.replace(" ").trim();
        var summaryNeat = summary.replace(" ").trim();
        var urlNeat = url.replace(" ").trim();

        var dataToAdd = {
          head: head,
          summary: summary,
          url: url
        };
        articles.push(dataToAdd);
      }
    });
    cb(articles);
  });
};
module.exports = scrape;