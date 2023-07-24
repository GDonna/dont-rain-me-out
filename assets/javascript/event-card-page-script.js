
var ticketInfo = document.getElementById("ticketInfo");
var weatherLocation = document.getElementById("weatherLocation");
var weatherImg = document.getElementById("weather-img");
var temperature = document.getElementById("temperature")


function getEventWeather() {
    var searchInput = document.location.search.split("&");
    var location = searchInput[0].split('=')

    var apiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location='+ location +'&timesteps=1d&units=imperial&apikey=TfvvZ1woGp1Ox2lup1yWKpvVjgg6bvxl'

    console.log(apiUrl)
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
             console.log(data)
              displayLocation(data.location)
              displayTemperature(data.timelines.daily[0].values);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          alert('Unable to connect Tomorrow.io API');
      });
}

function displayEventInfo(data){

}

function displayLocation(data){
  console.log(data)

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
