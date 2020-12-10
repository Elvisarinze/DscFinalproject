let div = document.querySelector('.flex');
let resultsList = document.getElementById('resultsList');
let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	displaySearchResults(searchInput.value);
});

function displaySearchResults(x) {
	let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${x}`;
	console.log(url);

	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			let resultsArray = data.query.search;
			resultsOnPage(resultsArray);
			div.classList.remove('height');
		})
		.catch(function () {
			console.log('An error occured');
		});
}

function resultsOnPage(myArray) {
	resultsList.classList.add('visible');
	if (!myArray.length) {
		resultsList.innerHTML = 'No results found';
		return;
	}
	resultsList.innerHTML = ' ';
	resultsList.insertAdjacentHTML('beforeend', `<h2>Search Results for ${searchInput.value} </h2>`);

	myArray.forEach(function (item) {
		let itemTitle = item.title;
		let itemSnippet = item.snippet;
		let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);

		resultsList.insertAdjacentHTML(
			'beforeend',
			`<div class="resultItem">
            <hr>
         <h3 class="resultTitle">
          <a href="${itemUrl}" target="_blank" rel="noopener">${itemTitle}</a>
         </h3>
         <p class="resultSnippet">${itemSnippet}</p>
        </div>`
		);
	});
}
