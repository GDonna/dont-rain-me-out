var searchEventEl = document.querySelector('.card');
var errorEl = document.getElementById('error');
var errorEl2 = document.getElementById('error2')

// Function for first modal error message
function error() {

  if (errorEl.classList.contains('hidden')) {
    errorEl.classList.replace('hidden', 'display')
  } else {
    errorEl.classList.replace('display', 'hidden')
  }

}

//Function for second modal error message
function error2() {

  if (errorEl2.classList.contains('hidden')) {
    errorEl2.classList.replace('hidden', 'display')
  } else {
    errorEl2.classList.replace('display', 'hidden')
  }

}



function searchCityStateSubmit(event) {
  event.preventDefault();

  var cityFormEl = document.querySelector('#cityDropDown').value;
  var stateFormEl = document.querySelector('#stateDropDown').value;

  if (!cityFormEl || !stateFormEl) {
    error()
    return;
  }
  function checkLocation() {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=10&unit=miles&locale=*&sort=date,asc&city=" + cityFormEl + "&countryCode=US&stateCode=" + stateFormEl;

    console.log(apiUrl)

    fetch(apiUrl)
      .then(function (response) {
        console.log("RES: ", response)
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        if (data.page.totalElements === 0) {
          console.log(data)
          error2();
          return null;
        }
        if (data.page.totalElements !== 0) {
          var searchEvent = "./eventpage.html?q=" + cityFormEl + "&format=" + stateFormEl;
          location.assign(searchEvent)
        }

      })
      .catch(err => console.log(err))
  }
  checkLocation()
}
searchEventEl.addEventListener("submit", searchCityStateSubmit)
errorEl.addEventListener("click", error)
errorEl2.addEventListener("click", error2)
