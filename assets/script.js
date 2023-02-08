var jokesUrl = 'https://geek-jokes.sameerkumar.website/api?format=json';

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

function displayJoke(data) {
	var newJoke = document.createElement('h1');
	var jokeP = document.createTextNode(data.joke);
	newJoke.appendChild(jokeP);
	//class or ID where the joke will be input
	var jokeDiv = document.querySelector('.joke');
	document.body.insertBefore(newJoke, jokeDiv);
}

var motivateUrl = 'https://api.goprogram.ai/inspiration';

function motivate(quote) {
	fetch(motivateUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			displayMotivate(data);
		});
}

function displayMotivate(data) {
	var newQuote = document.createElement('h1');
	var quoteP = document.createTextNode(data.quote);
	newQuote.appendChild(quoteP);
	//class or ID where the Motivation will be input
	var quoteDiv = document.querySelector('.random_quote');
	document.body.insertBefore(newQuote, quoteDiv);
}

//local storage to save both quotes if user clicks the thumbs up
var likeHist = JSON.parse(localStorage.getItem('likeHistory')) || [];

function thumbsUp() {
	localStorage.setItem('likeHistory', JSON.stringify(likeHist));
}

findJoke();
