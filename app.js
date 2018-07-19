const APIKey = 'AIzaSyCc4ZcAgxK0-oLkZ2kgi0dzhC7knXnRCIY';
const endpoint = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromAPI(searchTerm, callback) {
	const settings = {
		url: endpoint,
		data: {
			key: APIKey,
			q: searchTerm,
			part: 'snippet',
			type: 'video',
			maxResults: 6
		},
		dataType: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
}

function renderData(result) {
	var thumbnailURL = result.snippet.thumbnails.high.url;
	var videoURL = result.id.videoId;
	return `<a href='http://www.youtube.com/watch?v=${videoURL}'><img src='${thumbnailURL}' class="result"></a>`;
}

function displayData(data) {
	console.log(data);
	var results = '';
	for(var i = 0; i < data.items.length; ++i) {
		results += renderData(data.items[i]);
	}
	$('.search-results').html(results);
}

function handleSubmit() {
	$('.search-field').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.search-bar').val();
		getDataFromAPI(query, displayData);
	});
}

$(handleSubmit);