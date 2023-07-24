var eventPageTitle = document.getElementById("titleEL");
var eventHeader = document.getElementById("main-header");
var eventContainerEl = document.getElementById("event-containerEl");
var eventBtn = document.querySelector("event-Btn");
var venueSearch = "";

var searchInput = document.location.search.split("&");
var city = searchInput[0].split("=").pop();
var state = searchInput[1].split("=").pop();
var map
var infobox
convertCityLatLong();

function convertCityLatLong(){
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city+","+state+ ",USA" +'&limit=1&appid=349ff99c6078919fabcd80ffc046fad1';
        fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                lon = data[0].lon;
                lat = data[0].lat;
                getEventInfo(lon, lat);

            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect OpenWeather.com connection');
        });
  

}

function getEventInfo(lat, lon) {

    // gets the user search location from first page and splits it by the "&"
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=2&unit=miles&locale=*&sort=date,name,asc&city="+city+"&countryCode=US&stateCode="+state+"&segmentName=music";

    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            for(var i = 0; i < data._embedded.events.length; i++){
              displayUpcomingEvents(data._embedded.events[i])
            };
              topImg(data._embedded)
              getMap(data, lat, lon)
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
  var eventID = buttonInfo[0].split("-").pop();
  var location = buttonInfo[1].split(")")[0];

  var searchEvent = "./event-card-page.html?location="+ location + "eventID" +eventID + "cityname=" + city
  // updates the URL and assigns it to the url to render user to event detail page
  window.location.assign(searchEvent);
}

function topImg(data){

  var carouselImg1 = data.events[0].images[1].url
  document.getElementById("venueImage-one").src = carouselImg1
  var carouselImg2 = data.events[1].images[1].url
  document.getElementById("venueImage-two").src = carouselImg2
  var carouselImg3 = data.events[2].images[1].url
  document.getElementById("venueImage-three").src = carouselImg3
  var carouselImg4 = data.events[3].images[1].url
  document.getElementById("venueImage-four").src = carouselImg4
  var carouselImg5 = data.events[4].images[1].url
  document.getElementById("venueImage-five").src = carouselImg5
 
  
  var carouselEL = document.getElementById("carouselEL");
  carouselEL.append(carouselImg1)
}

function getMap(data, lat, lon){

  map = new Microsoft.Maps.Map('#venueMaps', {
    credentials: "At4pyP_VIdBay1sVdvmdDakiHMRlD3Iei3gdJVapdNdZ6ONpkEbughZCHSVjc83L",
    center: new Microsoft.Maps.Location(lon,lat),
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    zoom: 10
  });

  //Create an infobox at the center of the map but don't show it.
  infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false
  });

  //Assign the infobox to a map instance.
  infobox.setMap(map);
  
  for (var i = 0; i < data._embedded.events.length; i++) {

    var eventLocationData = data._embedded.events[i]._embedded.venues
    var eventVenue = eventLocationData[0].name
    
    var eventLat = eventLocationData[0].location.latitude
    var eventLon = eventLocationData[0].location.longitude
    var eventlatlon = new Microsoft.Maps.Location(eventLat,eventLon)
    var eventAddress = eventLocationData[0].address.line1

    var pin = new Microsoft.Maps.Pushpin(eventlatlon);
    //Store some metadata with the pushpin.
    pin.metadata = {
        title: eventVenue,
        description: eventAddress
    };

    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

    //Add pushpin to the map.
    map.entities.push(pin);
  }
}

function pushpinClicked(e) {
  //Make sure the infobox has metadata to display.
  if (e.target.metadata) {
      //Set the infobox options with the metadata of the pushpin.
      infobox.setOptions({
          location: e.target.getLocation(),
          title: e.target.metadata.title,
          description: e.target.metadata.description,
          visible: true
      });
  }
}