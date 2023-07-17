var APImapKey = "Ajsz-0Rnl_91Q4o_7Zk-1vDOqfxgvrUPg5-qABhbSNWKgUbRWqI19-Ll37r6mExo"
var APIeventKey = "9m1sGkEcZegpwhG1afNONOAPhT8SAZVM"

var fetchButton = document.querySelector("#click-button")

var beginSearch = document.getElementById("hiddenSearch")
const headerText = document.getElementById("header")
const headerPText = document.getElementById("pheader")

beginSearch.addEventListener("click", function(){
  fetchButton.style.display = "block"
  headerText.style.display ="hidden"
  headerPText.style.display ="hidden"
})
// API to Ticketmaster - Get Event Details? 


function getApi() {
 
      var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=9m1sGkEcZegpwhG1afNONOAPhT8SAZVM";

    fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
      }
    });

} 
function GetMap()
{
var map = new Microsoft.Maps.Map('#myMap');
}

fetchButton.addEventListener('click', getApi);