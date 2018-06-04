//nothing runs til page is ready
// $(document).ready(function() {

  var articleContainer = $(".article-container");

  //event listeners
  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.notes", handleArticleNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);

  initPage();

  //looking for value saved=true
  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        renderEmpty();
      }
    });
  }

  //panels for saved articles
  function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    var panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-success save'>",
        "Save article",
        "</a>",
        "</h3>",
        "</div>",
        // "<div class='panel-body'>",
        // article.summary,
        // "</div>",
        "</div>"
      ].join(""));
    panel.data("_id", article._id);
    return panel;
  }
  function renderEmpty() {
    var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh oh. Looks like we don't have any saved articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Would you like to browse available articles?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping new articles</a></h4>",
        "<h4><a href='/'>Browse articles</a></h4>",
        "</div>",
        "</div>"
      ].join(""));
    articleContainer.append(emptyAlert);
  }

  //display, push notes & append delete button
  function renderNotesList(data){
    var noteToRender = [];
    var currentNote;
    if (!data.notes.length){
      currentNote = [
        "<li class='list-group-item'>",
        "No notes for this article yet.",
        "</li>"
      ].join("");
      notesToRender.push(currentNote);
    }
    else {
      for (var i=0; i < data.notes.length; i++){
        currentNote = $([
          "<li class='list-group-item note'>",
          data.notes[i].noteText,
          "<button class='btn btn-danger note-delete'>x</button>",
          "</li>"
        ].join(""));
        currentNote.children("button").data("_id", data.notes[i]._id);
        notesToRender.push(currentNote);
      }
    }
    $(".note-container").append(notesToRender);
  }

 //--------------buttons handling listener functions ----------
 
 //handles deleting articles/headlines
  function handleArticleDelete(){
    var articleToDelete = $(this).parents(".panel").data();
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data){
      if (data.ok){
        initPage();
      }
    });
  }

//handles opening note modals
  function handleArticleNotes(){
    var currentArticle = $(this).parents(".panel").data();
    $.get("/api/notes/" + currentArticle._id).then(function(data){
      var modalText = [
        "<div class='container-fluid text-center'>",
        "<h4>Notes for Article: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save note</button>",
        "</div>"
      ].join("");
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      $(".btn.save").data("article", noteData);
      renderNotesList(noteData);
    });
  }
  function handleNoteSave() {
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
    if (newNote) {
      noteData = {
        _id: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(function(){
        bootbox.hideAll();
      });
    }
  }

  //delete a note
  function handleNoteDelete() {
    var noteToDelete = $(this).data("_id");
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function(){
      bootbox.hideAll();
    });
  }
// });