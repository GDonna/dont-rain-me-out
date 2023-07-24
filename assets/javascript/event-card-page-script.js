
var ticketInfo = document.getElementById("ticketInfo");
var weatherLocation = document.getElementById("weatherLocation");
var weatherImg = document.getElementById("weather-img");
var temperature = document.getElementById("temperature");
var eventName = document.getElementById("eventName");
var eventImg = document.getElementById("eventImg");
var eventInfo = document.getElementById("eventInfo")
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var ticketLink = document.getElementById("ticketLink");
var eventPageLink = document.getElementById("eventPage");


function getEventWeather() {
    var searchInput = document.location.search.split("&");
    var location = searchInput[0].split('=')
    var city = location[2].split('stateName')[0]

    var apiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location='+ city +'&timesteps=1d&units=imperial&apikey=GlInm5aSMTSP0UAHNS9Eu4hbsdpHGcaK'

    console.log(apiUrl)
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              displayLocation(data.location)
              displayTemperature(data.timelines.daily[0].values)
              displayWeatherIcon(data.timelines.daily[0].values)
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          alert('Unable to connect Tomorrow.io API');
      });
}

function getEventInformation() {
  var searchInput = document.location.search.split("&");
  var location = searchInput[0].split('=')
  var coords = location[1].split('eventID')
  var city = location[2].split('stateName')[0]
  var state = location[3]
  console.log(state)
  console.log(location)
  var eventId = coords[1].split('city')[0]
  
  eventPageLink.href = "./eventpage.html?q=" + city + "&format=" + state

  var apiUrl = "https://app.ticketmaster.com/discovery/v2/events/"+ eventId +".json?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM"
  
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
            displayEventInfo(data)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to connect Ticketmaster API');
    });
}

function displayEventInfo(data){
  var eventN = data.name
  eventName.innerHTML = eventN
  
  var eventI = document.createElement("img")
  eventI.src = data.images[4].url
  eventI.classList.add("object-fill", "object-top", "h-1/2", "w-full", "flex-wrap", "rounded-lg")

  eventImg.append(eventI)

  var eventIn = document.createElement("p")
  eventIn.classList.add("text-2xl", "justify-center", "font-bold", "flex-wrap")

  if (data.info === undefined){
    eventIn = "No posted info please visit ticketmaster website to find any info by clicking the button bellow."
  } else{
    eventIn = data.info
  }

  eventInfo.append(eventIn)

  var localStartDate = data.dates.start.localDate
  var localStartTime = data.dates.start.localTime

  var startMonth = localStartDate.split("-")[1]
  var startDay = localStartDate.split("-")[2]
  var startYear = localStartDate.split("-")[0]

  var startHour = localStartTime.split(":")[0]
  var startMinutes = localStartTime.split(":")[1]

  var eventStart = document.createElement("p")
  eventStart = "Event Start Date and Time:" + " " + startMonth + "/" + startDay + "/" + startYear + ", at " + startHour + ":" + startMinutes 

  startDate.append(eventStart)

  ticketLink.href = data.url
}

function displayLocation(data){
  console.log(data)

  var city = data.name.split(',')

  var locationTag = document.createElement("i")
  locationTag.classList.add("fa-solid", "fa-location-dot", "pr-5")

  weatherLocation.append(locationTag)
  weatherLocation.append('' + city[0] + ',' +city[2])
}

function displayTemperature(data){
  var tempAvg = data.temperatureAvg
  temperature.textContent = tempAvg + '°F'
}

function displayWeatherIcon(data){
  var conditionTag = document.createElement("i")

  if (data.rainAccumulationAvg !== 0){
    conditionTag.classList.add("fa-solid", "fa-cloud-rain", "text-9xl")
  }
  else if (data.snowAccumulationAvg !== 0){
    conditionTag.classList.add("fa-solid", "fa-snowflake", "text-9xl")
  }
  else {
    conditionTag.classList.add("fa-solid", "fa-sun", "text-9xl")
  }

  weatherImg.append(conditionTag)
}  

getEventWeather()
getEventInformation()