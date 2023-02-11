var jokesUrl = 'https://geek-jokes.sameerkumar.website/api?format=json';

//Finds Joke
function findJoke(joke) {
	fetch(jokesUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			// console.log(data.joke);
			displayJoke(data);
			motivate();
		});
}

//Displays Joke
function displayJoke(data) {
	var newJoke = $('<h5>').text(data.joke);
	newJoke.attr('id', 'mjoke');
	$('.joke').append(newJoke);
}

var motivateUrl = 'https://api.goprogram.ai/inspiration';

//Finds Motivational quote
function motivate(quote) {
	fetch(motivateUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			displayMotivate(data);
		});
}

//Displays Motivational quote
function displayMotivate(data) {
	var newQuote = $('<h5>').text(data.quote);
	newQuote.attr('id', 'mquote');

	$('.random_quote').append(newQuote);
}

//local storage to save both quotes if user clicks the thumbs up
var likeHist = JSON.parse(localStorage.getItem('likeHistory')) || [];

function saveSelection() {
	var joke = $('.joke').text();
	var quote = $('.random_quote').text();
	likeHist.push(joke);
	likeHist.push(quote);
	localStorage.setItem('likeHistory', JSON.stringify(likeHist));
}
// Save button
$('.save_button').on('click', function (e) {
	e.preventDefault();
	saveSelection();
	makeButton();
});

//Modal
var modal = $('#myModal');
var span = document.getElementsByClassName('close')[0];
var text = $('.copied-text');

span.onclick = function () {
	document.getElementById('myModal').style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		document.getElementById('myModal').style.display = 'none';
	}
};

// Make button
function makeButton() {
	$('.search_history').empty();

	var savedText = $('<button>').text(
		$('.joke').text() + ' ' + $('.random_quote').text()
	);
	savedText.addClass('btn  btn-primary ');
	savedText.attr('id', 'savedBtnText');
	savedText.attr('title', 'Click to Copy');
	$('.search_history').append(savedText);

	savedText.on('click', (event) => {
		event.preventDefault();
		document.querySelector('.copied-text').innerHTML = '';
		document.getElementById('myModal').style.display = 'block';

		copyText();
	});
}

//Copy text from button
function copyText() {
	// Get the text field
	var jokeMotiv = $('#savedBtnText').text();
	var copyText = jokeMotiv;

	text.append('Copied Text: ', jokeMotiv);
	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText);
}

// Skip button
$('.skip_button').on('click', function (event) {
	event.preventDefault();
	$('.joke').empty();
	$('.random_quote').empty();
	findJoke();
});

findJoke();
