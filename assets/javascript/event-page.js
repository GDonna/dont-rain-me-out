var eventPageTitle = document.getElementById("titleEL");
var eventHeader = document.getElementById("main-header");
var venueImages = document.getElementsByTagName("img");
var eventContainerEl = document.getElementById("event-containerEl");
var eventBtn = document.querySelector("event-Btn");
var venueSearch = "";

function getEventInfo() {

    // gets the user search location from first page and splits it by the "&"
    var searchInput = document.location.search.split("&");
    var city = searchInput[0].split("=").pop();
    var state = searchInput[1].split("=").pop();

    // Ticketmaster API call by city, radius is 10 miles from event
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=10&unit=miles&locale=*&sort=date,asc&city="+city+"&countryCode=US&stateCode="+ state;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
            for(var i = 0; i < data._embedded.events.length; i++){
              displayUpcomingEvents(data._embedded.events[i], i)
            };
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to connect Ticketmaster API');
    });
  };


function displayUpcomingEvents(data, i){
      
    // event card for each event
    var eventCard = document.createElement("div");
    eventCard.classList.add("flex", "sm:flex-row", "md:flex-row", "lg:flex-row", "xl:flex-row", "bg-gray-200");
    
    // eventBody for each event
    var eventBody = document.createElement("div");
    eventBody.classList.add("text-gray-700", "text-center", "bg-gray-400", "px-4", "py-2", "m-2")
    eventCard.append(eventBody);

    // creates the event name element
    var eventNameEL = document.createElement("h3");
    var eventsNameInfo = data.name
    eventNameEL.innerHTML= "<strong>"+ eventsNameInfo + "</strong>";

    // creates the event data and element
    var eventDataEl = document.createElement("p");
    var localDate = data.dates.start.localDate
    
    // formats date from YYYY-MM-DD to MM/DD/YYYY
    localDate.split("-")
    var formateDate_str = localDate.split("-");
    var newDate = formateDate_str[1] + "/" + formateDate_str[2] + "/" + formateDate_str[0]
    eventDataEl.textContent = newDate

    // 
    var eventBtn = document.createElement("button");
    eventBtn.classList.add("eventBtn","middle", "none", "center", "mr-4", "rounded-lg", "bg-blue-500",
     "py-3", "px-6", "font-sans", "text-xs", "font-bold", "uppercase", "text-white",
      "shadow-md", "shadow-blue-500/20", "transition-all", "hover:shadow-lg",
      "hover:shadow-blue-500/40", "focus:opacity-[0.85]", "focus:shadow-none",
      "active:opacity-[0.85]", "active:shadow-none", "disabled:pointer-events-none",
      "disabled:opacity-50", "disabled:shadow-none")
    
    var eventID = data.id;
    var eventLon = data._embedded.venues[0].location.longitude;
    var eventLat = data._embedded.venues[0].location.latitude;
    eventBtn.setAttribute("id",eventID + "-(" +eventLon +","+ eventLat +")" );
    eventBtn.textContent = "Click for more info";

    eventBody.append(eventNameEL, newDate, eventBtn);
    eventContainerEl.append(eventCard);

    eventBtn.addEventListener("click", getMoreEventInfo);
}

function getMoreEventInfo(){
  
  // gets buttonID which is the event ID and the Lat and long
  var buttonInfo = this.id.split("-(");
  console.log(buttonInfo)
  var eventID = buttonInfo[0].split("-").pop();
  var location = buttonInfo[1].split(")")[0];
  console.log(location);

  var searchEvent = "./event-card-page.html?location="+ location + "eventID" +eventID
  // updates the URL and assigns it to the url to render user to event detail page
  window.location.assign(searchEvent);
}

getEventInfo();