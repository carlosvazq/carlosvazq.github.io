function weatherReport(latitude, longitude) {
  var api_call = 'https://api.darksky.net/forecast/' + '47dfa3c6376ad5bd9fcb5bf40323cffc' + "/" + latitude + "," + longitude + "?extend=hourly&callback=?";
  fetch(api_call,render);
}

function fetch(api_call, fn) {
    $.getJSON(api_call, fn);
}

function render(forecast) {
  var daily = forecast.daily.data;
  var html_payload = daily.map(function (report, i) {
      return `
              <div class="box">
              <header class="date">${new Date(daily[i].time * 1000).toLocaleDateString()}</header></br>
              <span class="bold-style">Temperature:</span> ${Math.round(forecast.hourly.data[i].temperature)}&#8457</br>
              <span class="bold-style">Max Temp:</span> ${Math.round(forecast.daily.data[i].temperatureMax)}&#8457</br>
              <span class="bold-style">Humidity:</span> ${report.humidity}%</br>
              ${report.summary}
              </div>

              `
  });

  $(".container").append(html_payload);
}

$('button').on('click', function(e) {
	var lat       = $('#latitude').val(),
		long      = $('#longitude').val(),
		address   = $('#address').val()

	if ((lat && long) && (!isNaN(lat) && !isNaN(long))) {
		e.preventDefault();

		$('.form').fadeOut(400, function() {
			weatherReport(lat, long);
			$('.container').append(`<center><button id="back" class="back">New Search</button></br><header class="cityname">${address}</header></center></br>`);
		});
	}


});

$('body').on('click', '#back', function() {
	window.location.reload(true);
})

function googleScript() {
	var googleAPI = document.createElement('script'),
			apiKey    = 'AIzaSyBA2MY5xxRKBcn10SIc611C122Eky9RS78';

	googleAPI.src = 'https://maps.googleapis.com/maps/api/js?key='+ apiKey +'&callback=initGoogleAPI&libraries=places,geometry';
	document.body.appendChild(googleAPI);
}

function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#address"));

	autocomplete.addListener('places_changed', function() {
		var place = autocomplete.getPlaces()[0];
		document.querySelector("#latitude").value = place.geometry.location.lat();
		document.querySelector("#longitude").value = place.geometry.location.lng();
	});
}

googleScript();
