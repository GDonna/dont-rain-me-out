var searchEventEl= document.querySelector('.card')

function searchCityStateSubmit (event) {
  event.preventDefault();
  
  var cityFormEl = document.querySelector('.city-input').value;
  var stateFormEl = document.querySelector('.state-input').value;
  if (!cityFormEl || !stateFormEl) {
    console.error ("Please enter a city and state");
    return;
  }
   var searchEvent = "./eventpage.html?q=" +cityFormEl+ "&format=" +stateFormEl;
  location.assign (searchEvent)
};

    searchEventEl.addEventListener("submit", searchCityStateSubmit)