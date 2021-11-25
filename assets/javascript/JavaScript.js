var runSearch = function () {
    var locationRequested = document.getElementById("locale").value;
    // to keep all the request organized in the console 
    console.log(locationRequested);
    var requestUrl = "https://api.opentripmap.com/0.1/en/places/geoname?name=" + locationRequested + "&apikey=5ae2e3f221c38a28845f05b646d21e5f2e56e0429c8c0d446cc8bae6";

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var lon = data.lon;
            var lat = data.lat;
            // In the future we can add more "kinds" (filters) to get other data such as "natural" and "tourist facilities" (tourist_facilities%2Cnatural%2C)
            var requestUrlRadius = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&kinds=cultural%2Camusements&rate=1&format=json&apikey=5ae2e3f221c38a28845f05b646d21e5f2e56e0429c8c0d446cc8bae6";
            fetch(requestUrlRadius)
                .then(function(response) {
                    return response.json();
                })
            // to be able to see links in console and have visibility to what information we can access for further development
            console.log(requestUrlRadius);
        })
    // convert distance from meters to miles
    // var distance = data.dist * 0.00062137
}
$("#search-button").on("click", runSearch);
