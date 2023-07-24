var searchEventEl= document.querySelector('.card')

var modal = document.getElementById("myModal")
var span = document.getElementsByClassName("close")[0];

// span.onclick = function() {
//   modal.style.display = "none";
// }

function searchCityStateSubmit (event) {
  event.preventDefault();
  
  var cityFormEl = document.querySelector('#cityDropDown').value;
  var stateFormEl = document.querySelector('#stateDropDown').value;

  if (!cityFormEl || !stateFormEl) {
    modal.style.display = "show"
    // console.error ("Please enter a city and state");
    return;
  } 
  function checkLocation () {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM&radius=10&unit=miles&locale=*&sort=date,asc&city="+cityFormEl+"&countryCode=US&stateCode="+ stateFormEl;

    console.log(apiUrl)
    
    fetch(apiUrl)
    .then (function (response) {
        console.log("RES: ", response)
         return response.json()
    })
    .then (function (data){
          console.log(data)
          if (data.page.totalElements === 0){
            console.log(data)
            alert('Error: ')
            return null;
          }
          if (data.page.totalElements !== 0){
            var searchEvent = "./eventpage.html?q=" +cityFormEl+ "&format=" +stateFormEl;
            location.assign(searchEvent)  
          }
        
    })
    .catch(err => console.log(err)) 
      }
      checkLocation()
}  
    searchEventEl.addEventListener("submit", searchCityStateSubmit)