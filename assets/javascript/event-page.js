var eventPageTitle = document.getElementById("titleEL");
var eventHeader = document.getElementById("main-header");
var venueImages = document.getElementsByTagName("img");
var eventContainerEl = document.getElementById("event-containerEl"); 
var venueSearch = "";

function getEventInfo() {

    var searchInput = document.location.search.split("&");
    var city = searchInput[0].split("=").pop();
    var state = searchInput[1].split("=").pop();
    
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=10&unit=miles&locale=*&sort=date,asc&city="+city+"&countryCode=US&stateCode="+ state;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
            displayUpcomingEvents(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to connect Ticketmaster API');
    });
  };

// function getUpcomingEvents(data){
//     var venueID = data+".id*";
//     var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&id="+venueID+"apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM";

//     fetch(apiUrl)
//     .then(function(response){
//         if (response.ok){
//             response.json.then(function(data){
//             console.log(data);
//             var lon = data._embedded.venues.location.longitude
//             var lat = data._embedded.venues.location.latitude
//             weatherInfo(lon, lat)
//             displayUpcomingEvents(data)
//             });
//          } else {
//             alert('Error: ' + response.statusText)
//          }
//         })
//     }

function displayUpcomingEvents(data){
    
    var eventCard = document.createElement("div");
    eventCard.classList.add("flex", "sm:flex-col", "md:flex-col", "lg:flex-row", "xl:flex-row", "bg-gray-200");

    var eventBody = document.createElement("div");
    eventBody.classList.add("text-gray-700", "text-center", "bg-gray-400", "px-4", "py-2", "m-2")
    eventCard.append(eventBody);

    // gets to the event data in the fetch response
    var eventData = data._embedded.events[0]

    // creates the event name element
    var eventNameEL = document.createElement("h3");
    var eventsNameInfo = eventData.name
    eventNameEL.innerHTML= "<strong>Event Name:</strong>" + eventsNameInfo;

    // creates the event data and element
    var eventDataEl = document.createElement("p");
    var localDate = eventData.dates.start.localDate
    
    // formats date from YYYY-MM-DD to MM/DD/YYYY
    localDate.split("-")
    console.log(localDate)
    var formateDate_str = localDate.split("-");
    
   // var formateDate_str = [formatDate.getMonth()+1, formatDate.getDate(), formatDate.getFullYear()].join("/");
    eventDataEl.textContent = localDate

    eventBody.append(eventNameEL,eventDataEl);
    eventContainerEl.append(eventCard);
}

// function weatherInfo(lat, lon){

// }
getEventInfo();
// get weather API and amend html