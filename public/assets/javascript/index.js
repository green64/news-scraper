// //load the page fool
$(document).ready(function () {
  var articleContainer = $(".article-container");

  //attach click function to document so doc has to be there
  $(document).on("click", ".save", handleArticleSave);
  $(".scrape-new").click(handleArticleScrape);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false")
      .then(function (data) {
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          renderEmpty();
        }
      });
  }

  //creates empty array of article panel then pushes articles in
  function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {  
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    var panel =
      $(["<div class='panel panel-default border'>",
        "<div class='panel-heading'>",
        "<h4>",
        article.headline,
        "</h4>",
        "</div>",
        "<div class='panel-body'>",
        "<h5>",
        article.summary,
        "</h5>",
        "</div>",
        "<div>",
        "<p class='url'>",
        article.url,
        "</p>",
        "</div>",
        "<a class='btn btn-success save mb-2'>",
        "Save article",
        "</a>",
        "</div>"
      ].join(""));
    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh oh. Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What would you like to do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping new articles</a></h4>",
        "<h4><a href='/saved'>Go to saved articles</a></h4>",
        "</div>",
        "</div>"
      ].join(""));
    articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;
    $.ajax({
      method: "POST",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    })
      .then(function(data) {
        if (data.ok) {
          initPage();
        }
      });
  }
  function handleArticleScrape() {
    $.get("/api/fetch")
      .then(function(data) {
        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
      });
  }
});