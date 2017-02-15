//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
var $input = $('#searchPage');

//on keyup, start the countdown
$input.on('keyup', function () {
  $("ul").empty();
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  $("ul").empty();
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  var query = $('#searchPage').val();
  var length = $('#searchPage').val().length;
  	if ($('#searchPage').val().length == 0) {
      $("ul").empty();
	}
	else{
  	friendlyPix.search.searchMe(query);
  }
  
}