$(document).ready(function() {
  getQuote();
  $("#btn").on('click', function(event) {
    event.preventDefault();
    getQuote();
  });
});

function getQuote() {
  $.ajax({
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      type: 'GET',
      dataType: 'json',
      cache: false
    })
    .done(function(data) {
      var currQuote = $(data[0].content).text();
      var currAuthor = data[0].title;
      var tweetUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&related=gupta52akash&text=' + encodeURIComponent('"' + currQuote + '" ' + currAuthor);
      $("#quote").html("<span class='fa fa-quote-left'></span> \t" + currQuote + "<footer>" + currAuthor + "</footer");
      $('.twitter-link').attr('href', tweetUrl);
    });
}
