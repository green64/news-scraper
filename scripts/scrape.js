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
        // let a = $(this).prev();
        let headline = $(this).text();
        // console.log(headline);

        let url = $(this).attr('href');
        // console.log(url);

        if(headline && url) {
        //   var headNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        // // var summaryNeat = summary.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        //   var urlNeat = url.replace(/\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          let dataToAdd = {
            headline: headline,
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