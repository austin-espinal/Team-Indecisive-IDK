var runSearch = function () {
    console.log("itworks");
    // clearInfo();
    var locationRequested = document.getElementById("cityInput").value;
    var searchInfoArea = document.getElementById("search-city");
    searchInfoArea.textContent = "City: " + locationRequested;

    // get data from API
    var requestUrl =
        "https://api.opentripmap.com/0.1/en/places/geoname?name=" +
        locationRequested +
        "&apikey=5ae2e3f221c38a28845f05b646d21e5f2e56e0429c8c0d446cc8bae6";
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lon = data.lon;
            var lat = data.lat;
            // In the future we can add more "kinds" (filters) to get other data such as "natural" and "tourist facilities" (tourist_facilities%2Cnatural%2C)
            var requestUrlRadius =
                "https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=" +
                lon +
                "&lat=" +
                lat +
                "&kinds=cultural%2Camusements&rate=2&format=json&limit=8&apikey=5ae2e3f221c38a28845f05b646d21e5f2e56e0429c8c0d446cc8bae6";
            fetch(requestUrlRadius)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // loop to cycle through the data information
                    for (var i = 0; i < data.length; i++) {
                        var xid =
                            "https://api.opentripmap.com/0.1/en/places/xid/" +
                            data[i].xid +
                            "?apikey=5ae2e3f221c38a28845f05b646d21e5f2e56e0429c8c0d446cc8bae6";
                        // console.log(xid);
                        fetch(xid)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                // to have visibility to data available for each location
                                console.log(data);
                                // get area where results are going to be displayed
                                var results = document.getElementById("results");
                                var categoryUl = document.createElement("ul");
                                results.appendChild(categoryUl);
                                var listItemName = document.createElement("h5");
                                listItemName.textContent = data.name;
                                categoryUl.appendChild(listItemName);
                                var description = document.createElement("p");
                                description.textContent = data.wikipedia_extracts.text;
                                categoryUl.appendChild(description);
                                console.log(description);
                                var mapLink = document.createElement("a");
                                mapLink.href = data.otm;
                                mapLink.textContent =
                                    "Click here for more details and map directions";
                                categoryUl.appendChild(mapLink);
                            });
                    }
                    // to be able to see links in console and have visibility to what information we can access for further development
                    console.log(requestUrl);
                    console.log(requestUrlRadius);
                    console.log(xid);
                });
        });
};
// clears the search bar after searching and deletes information for prior search
var clearInfo = function () {
    var clearSearchInfo = document.getElementById("search-city");
    var clearResults = document.getElementById("results");
    clearSearchInfo.textContent = "";
    clearResults.textContent = "";
};
$("#cityInfoBtn").on("click", runSearch);
