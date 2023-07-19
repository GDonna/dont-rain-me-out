var eventPageTitle = document.getElementsByName("#titleEL");
var eventHeader = document.getElementById("#main-header");
var venueImages = document.getElementsByTagName("img");
var eventCard = document.getElementById("#event-containerEl"); 
var venueSearch = "";


function getEventInfo() {

    var searchInput = document.location.search.split("&");
    var city = searchInput[0].split("=").pop();
    var state = searchInput[1].split("=").pop();
    
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=10&unit=miles&locale=*&sort=date,asc&city="+cityCode+"&countryCode=US&stateCode="+ stateCode;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            getUpcomingEvents(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to connect Ticketmaster API');
    });
  };

function getUpcomingEvents(data){
    var venueID = data+".id*";
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&id="+venueID+"apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM";

    fetch(apiUrl)
    .then(function(response){
        if (response.ok){
            response.json.then(function(data){
            console.log(data);
            var lon = data._embedded.venues.location.longitude
            var lat = data._embedded.venues.location.latitude
            weatherInfo(lon, lat)
            displayUpcomingEvents(data)
            });
         } else {
            alert('Error: ' + response.statusText)
         }
        })
    }

function displayUpcomingEvents(data){
    
    var eventBody = document.createElement("div");
    eventBody.classList.add("text-gray-700", "text-center", "bg-gray-400", "px-4", "py-2", "m-2")
    eventCard.append(eventBody);

    // gets to the event data in the fetch response
    var eventData = data._embedded.event

    // creates the event name element
    var eventNameEL = document.createElement("h3");
    var eventsNameInfo = eventData.name
    eventNameEL.innerHTML= "<strong>Event Name:</strong>" + eventsNameInfo;

    // creates the event data and element
    var eventDataEl = document.createElement("p");
    var localDate = eventData.dates.start.localDate
    // formats date from YYYY-MM-DD to MM/DD/YYYY
    var formatDate = new Date (localDate*1000);
    var formateDate_str = [formatDate.getMonth()+1, formatDate.getDate(), formatDate.getFullYear()].join("/");
    eventDataEl.textContent = formateDate_str

    eventBody.append(eventNameEL,eventDataEl);
}

function weatherInfo(lat, lon){

}

// get weather API and amend html