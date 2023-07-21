var ticketInfo = $("#ticketInfo");
var weatherLocation = $("#weatherLocation");
var weatherImg = $("#weather-img");
var temeprature = $("#temperature")


function getEventWeather() {

    var searchInput = document.location.search.split("&");
    var location = searchInput[0].split('=')
    
    var apiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location=' + location + '&apikey=GlInm5aSMTSP0UAHNS9Eu4hbsdpHGcaK'

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              //getUpcomingEvents(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          alert('Unable to connect Tomorrow.io API');
      });


      function getEventTemperature(data){
        
      }

      function displayTemperature(data){

      }
}