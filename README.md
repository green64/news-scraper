# Mongo Scraper
[Mongo Scraper app](hhttps://immense-depths-69377.herokuapp.com/)

This app uses Mongoose and Cheerio to scrape the news into a Mongo database.

## Object

Our first MongoDB project is a scraper that collects a headline, summary and URL from the site then renders them on the page. Users have the option to save and delete articles they scrape. 

## Technology used

The Mongo Scraper uses Cheerio and Mongoose to help out the MongoDB. It also uses JavaScript, Express, Request, Handlebars and MongoJS NPM packages.

Because I was having trouble even rendering my page at first, I also used those helpful guys Morgan and Winston for logging. They didn't fix everything, but they helped me identify issues and get to the next step. 

## Code excerpts

I picked a really hard site to scrape, guardian.co.uk, which had some crazy nesting that made identifying parents and children pretty tough. I must've deleted 50 different console.logs to get these working elements of my BSON object scrape working:

```$('a.fc-item__link').each(function (i, element) {
var headline = $(this).children('.fc-item__kicker').text();
console.log(headline); 

var summary = $(this).children().children('.js-headline-text').text();
console.log(summary); 

var url = $(this).attr('href');
console.log(url);
```
I also learned the danger of ad hoc deletion. I forgot some classes in my Handlebars template actually told the scraper where to put the object. Whoops. I also learned the computer doesn't know  ```articleToSave``` and ```articlesToSave``` is a typo. Double whoops.

I worked on this project probably more than any to date. But I learned so much. When it comes to databases, I think I actually prefer working with MySQL because it's strict. I never thought I'd say this but I like structure (when it comes to databases anyway)!

Have fun checking out the app, and be sure to save an article &mdash; then delete it &mdash; to see those marvelous routes in action!
