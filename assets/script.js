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
});

findJoke();
