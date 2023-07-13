

// API to Ticketmaster - Get Event Details? 
function getApi() {
 
    var requestUrl = "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey={apikey}&per_page=5"

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    });

}

fetchButton.addEventListener('click', getApi);