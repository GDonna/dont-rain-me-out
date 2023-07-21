
var ticketInfo = document.getElementById("ticketInfo");
var weatherLocation = document.getElementById("weatherLocation");
var weatherImg = document.getElementById("weather-img");
var temperature = document.getElementById("temperature")


function getEventWeather() {

    var searchInput = document.location.search.split("&");
    var location = searchInput[0].split('=')
    
    var apiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location=' + 'new%20york' + '&apikey=GlInm5aSMTSP0UAHNS9Eu4hbsdpHGcaK'

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              displayLocation(data.location)
              displayTemperature(data.timelines.daily[0].values);
              console.log(data)
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          alert('Unable to connect Tomorrow.io API');
      });
}

function displayLocation(data){
  var city = data.name

  var locationTag = document.createElement("i")
  locationTag.classList.add("fa-solid", "fa-location-dot", "pr-5")

  weatherLocation.append(locationTag)
  weatherLocation.append('' + city)
}

function displayTemperature(data){
    var tempAvg = data.temperatureAvg
    temperature.textContent = tempAvg + '°F'
}


getEventWeather()