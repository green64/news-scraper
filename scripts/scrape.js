//scrape script

//Require request and cheerio to makes scrapes work
let request = require("request");
let cheerio = require("cheerio");

let scrape = function (cb) {

  request('https://www.theguardian.com/us', function (error, response, data) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(data);

      let articles = [];

      $('a.fc-item__link').each(function (i, element) {
        var headline = $(this).children('.fc-item__kicker').text();
        console.log(headline); 

        var summary = $(this).children().children('.js-headline-text').text();
        console.log(summary); 

        var url = $(this).attr('href');
        console.log(url);

        if(headline && summary && url) {
          // var headNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          // var summaryNeat = summary.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          // var urlNeat = url.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          let dataToAdd = {
            headline: headline,
            summary: summary,
            url: url
          };
          // console.log(dataToAdd);
          articles.push(dataToAdd);
        }
      });
      cb(articles);
      console.log(articles)
    };
  });
};

module.exports = scrape;