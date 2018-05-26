// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'data' (JSON) and creates a table body
// function displayResults(scraperData) 
$.getJSON("/", function(scraperData) {
 // Then, for each entry of that json...
  // scraperData.forEach(function (scraperData){
    // For each one
    for (var i = 0; i < scraperData.length; i++) {
      // Append each of the scraped articles properties to the table
      $("tbody").empty();
      $("tbody").append("<tr><td>" + scraperData.headline + "</td>" +
        "<td>" + scraperData.summary + "</td>" +
        "<td>" + scraperData.url + "</td></tr>");
      };
    });
  // First thing: ask the back end for json with all scraped articles

$.ajax({
  method: "GET",
  url: "/"
}).then(function(res){
  console.log(res)
})

// $.getJSON("/", function (data) {
//   console.log(data)
//   // Call our function to generate a table body
//   displayResults(data);
// });
