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
            for(var i = 0; i < data._embedded.events.length; i++){
              displayUpcomingEvents(data._embedded.events[i])
              console.log(data._embedded.events)
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

function displayUpcomingEvents(data){
      
    var eventCard = document.createElement("div");
    eventCard.classList.add("flex", "sm:flex-row", "md:flex-row", "lg:flex-row", "xl:flex-row", "bg-gray-200");

    var eventBody = document.createElement("div");
    eventBody.classList.add("text-gray-700", "text-center", "bg-gray-400", "px-4", "py-2", "m-2")
    eventCard.append(eventBody);

    // creates the event name element
    var eventNameEL = document.createElement("h3");
    var eventsNameInfo = data.name
    console.log(eventsNameInfo)
    eventNameEL.innerHTML= "<strong>Event Name:</strong>" + eventsNameInfo;

    // creates the event data and element
    var eventDataEl = document.createElement("p");
    var localDate = data.dates.start.localDate
    
    // formats date from YYYY-MM-DD to MM/DD/YYYY
    localDate.split("-")
    console.log(localDate)
    var formateDate_str = localDate.split("-");
    var newDate = formateDate_str[1] + "/" + formateDate_str[2] + "/" + formateDate_str[0]
    eventDataEl.textContent = localDate

    var eventBtn = document.createElement("button");
    eventBtn.classList.add("middle", "none", "center", "mr-4", "rounded-lg", "bg-blue-500",
     "py-3", "px-6", "font-sans", "text-xs", "font-bold", "uppercase", "text-white",
      "shadow-md", "shadow-blue-500/20", "transition-all", "hover:shadow-lg",
      "hover:shadow-blue-500/40", "focus:opacity-[0.85]", "focus:shadow-none",
      "active:opacity-[0.85]", "active:shadow-none", "disabled:pointer-events-none",
      "disabled:opacity-50", "disabled:shadow-none")

    eventBtn.textContent = "Click for more info";
    

    eventBody.append(eventNameEL,eventDataEl, newDate, eventBtn);
    eventContainerEl.append(eventCard);
}

getEventInfo();