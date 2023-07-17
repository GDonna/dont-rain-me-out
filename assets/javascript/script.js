var APImapKey = "Ajsz-0Rnl_91Q4o_7Zk-1vDOqfxgvrUPg5-qABhbSNWKgUbRWqI19-Ll37r6mExo"
var APIeventKey = "9m1sGkEcZegpwhG1afNONOAPhT8SAZVM"

var fetchButton = document.querySelector("#click-button")

// API to Ticketmaster - Get Event Details? 


function getApi() {
 
      var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM";

    fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
      }
    });

}

fetchButton.addEventListener('click', getApi);