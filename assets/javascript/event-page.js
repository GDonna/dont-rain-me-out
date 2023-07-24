var eventPageTitle = document.getElementById("titleEL");
var eventHeader = document.getElementById("main-header");
var eventContainerEl = document.getElementById("event-containerEl");
var eventBtn = document.querySelector("event-Btn");
var venueSearch = "";

function getEventInfo() {

    // gets the user search location from first page and splits it by the "&"
    var searchInput = document.location.search.split("&");
    var city = searchInput[0].split("=").pop();
    var state = searchInput[1].split("=").pop();
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=2&unit=miles&locale=*&sort=date,name,asc&city="+city+"&countryCode=US&stateCode="+state+"&segmentName=music";

  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
            for(var i = 0; i < data._embedded.events.length; i++){
              displayUpcomingEvents(data._embedded.events[i])
              topImg(data._embedded.events[i], i+1)
            };
            for(var i = 0; i < 5; i++){
              topImg(data._embedded.events[i], i+1)
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

function displayUpcomingEvents(data,){
    eventContainerEl.classList.add("sm:flex", "flex-wrap", "md:flex","flex-wrap", "lg:grid", 
    "grid-cols-5", "grid-rows-5", "xl:grid", "grid-cols-5", "grid-rows-5", "2xl:grid", "grid-cols-5", "grid-rows-5");

    // event card for each event
    var eventCard = document.createElement("div");
    eventCard.classList.add("eventCard");
    
    // eventBody for each event
    var eventBody = document.createElement("div");
    eventBody.classList.add("text-gray-700", "text-center", "bg-gray-400", "px-4", "py-2", "m-2", "sm:max-h-72","md:h-52")
    eventCard.append(eventBody);

    // creates the event name element
    var eventNameEL = document.createElement("h3");
    eventNameEL.classList.add("flex", "flex-wrap")
    var eventsNameInfo = data.name
    eventNameEL.innerHTML= "<strong>"+ eventsNameInfo + "</strong>";

    // creates div for element spacing
    var eventDiv = document.createElement("div");

    // creates the event data and element
    var eventDataEl = document.createElement("p");
    var localDate = data.dates.start.localDate
    
    // formats date from YYYY-MM-DD to MM/DD/YYYY
    localDate.split("-")
    var formateDate_str = localDate.split("-");
    var newDate = formateDate_str[1] + "/" + formateDate_str[2] + "/" + formateDate_str[0]
    eventDataEl.classList.add("text-h3")
    eventDataEl.innerHTML = newDate

    //creates event button with link to next page 
    var eventBtn = document.createElement("button");
    eventBtn.classList.add("eventBtn","middle", "none", "center", "mr-4", "rounded-lg", "bg-blue-500",
     "py-3", "px-6", "font-sans", "text-xs", "font-bold", "uppercase", "text-white",
      "shadow-md", "shadow-blue-500/20", "transition-all", "hover:shadow-lg",
      "hover:shadow-blue-500/40", "focus:opacity-[0.85]", "focus:shadow-none",
      "active:opacity-[0.85]", "active:shadow-none", "disabled:pointer-events-none",
      "disabled:opacity-50", "disabled:shadow-none")
    
    var eventImg = document.createElement("img");
    eventImg.src = data.images[4].url
    eventImg.classList.add("object-scale-down", "sm:h-20", "inline")
    var eventID = data.id;
    var eventLon = data._embedded.venues[0].location.longitude;
    var eventLat = data._embedded.venues[0].location.latitude;
    eventBtn.setAttribute("id",eventID + "-(" +eventLon +","+ eventLat +")" );
    eventBtn.textContent = "Click for more info";

    eventBody.append(eventImg, eventNameEL, newDate, eventDiv, eventBtn);
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

function topImg(data, i){
  var imageID = "venueImage"+i
  console.log(imageID)
  var carouselImg = document.getElementsByName("img")
  console.log(carouselImg)
  carouselImg.src= data.images[4].url
  
  var carouselEL = document.getElementById("carouselEL");
  carouselEL.append(carouselImg)
}
getEventInfo();

