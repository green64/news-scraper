// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
  "Grabbing article title, summary and urls\n" +
  "from the guardian.com politic page" +
  "\n***********************************\n");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://www.theguardian.com/us", function (error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];
  var title = $("span.js-headline-text");
  var summary = $("div.fc-item__standfirs");

  //info to display 

  // With cheerio, find every page article 
  $("h2.fc-item__title").each(function (i, element) {

    // In the currently selected element store these elements

    //Headline - the title of the article
    var title = $(element).children().text(title);
console.log(title);
    //Summary - a short summary of the article
    var summary = $(element).text(summary);

    //URL - the url to the original article
    var link = $(element).children().attr("href");

    //save results in an object
    results.push({
      title: title,
      summary: summary,
      link: link
    });
  });

  //log results

  console.log(results);
});