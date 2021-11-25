// in the index file we need a ul element - For Search History:
// var searchHistoryLocation = document.querySelector("ul");

var runSearch = function () {
    // search bar on index file needs an id of "search-bar"
    var locationRequested = document.getElementById("locale").value;
    console.log(locationRequested);
    var requestUrl = "https://api.opentripmap.com/0.1/en/places/geoname?name=" + locationRequested + "&apikey=5ae2e3f221c38a28845f05b646d21e5f2e56e0429c8c0d446cc8bae6";

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        
        console.log(requestUrl);
        
        

    // create a search history under the search bar BELOW:
    // var listItemLocation = document.createElement('h4');
    // listItemLocation.textContent = locationRequested;
    // searchHistoryLocation.appendChild(listItemCity);
    }

$("#search-button").on("click", runSearch);
