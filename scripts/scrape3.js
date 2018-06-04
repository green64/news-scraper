var request = require("request");
var cheerio = require("cheerio");
var scrape = function (cb) {
  console.log('in scraper')

  request('https://news.ycombinator.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body, 'body')
      var $ = cheerio.load(body);
    
      var articles = [];

      $('span.comhead').each(function(i, element){
        var a = $(this).prev();
        // var rank = a.parent().parent().text();
        var title = a.text();
        var url = a.attr('href');
        // var subtext = a.parent().parent().next().children('.subtext').children();
        // var points = $(subtext).eq(0).text();
        // var username = $(subtext).eq(1).text();
        // var comments = $(subtext).eq(2).text();
        // // Our parsed meta data object
        // var metadata = {
          var dataToAdd = {

          // rank: parseInt(rank),
          title: title,
          url: url
          // points: parseInt(points),
          // username: username,
          // comments: parseInt(comments)
        };
        // console.log(metadata);
        articles.push(dataToAdd);
        // console.log("%i scraped", articles.length)
      });
    }
    cb(articles);
    
  });
};
module.exports = scrape;