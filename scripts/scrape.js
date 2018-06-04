//scrape script

//Require request and cheerio to makes scrapes work
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

  request('https://www.theguardian.com/us', function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(data);

      var articles = [];

      $('span.fc-item__kicker').each(function (i, element) {
        var headline = $(this).parent('.fc-item__link');
        console.log(headline.text());

        var url = headline.attr('href');
        console.log(url);

        if(headline && url) {
        //   var headNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // // var summaryNeat = summary.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        //   var urlNeat = url.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          var dataToAdd = {
            headline: headline,
            url: url
          };
          // console.log(dataToAdd);
          articles.push(dataToAdd);
        }
      });
      cb(articles);
    };
  });
};

module.exports = scrape;