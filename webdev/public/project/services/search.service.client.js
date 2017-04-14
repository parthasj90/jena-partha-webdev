(function () {
    angular
        .module("GoPlaces")
        .factory("SearchService", SearchService);

    function SearchService($http) {
        var url_prefix = "https://api.foursquare.com/v2/";
        /* var clientID = process.env.FOURSQUARE_CLIENT_ID;
         var clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
         var clientVersion = process.env.FOURSQUARE_VERSION;*/
        var clientID = "JFSSW1NIHYS3R0JZU2XXJFHRY5DQR3AINCXVT10GWU4DN2SK";
        var clientSecret = "ZIIFPUCZ43MOQOPB41GGD1D02L1COCOYCKBLZ5VTSMICIBAA";
        var clientVersion = "20160609";

        var api = {
            getAllPlaces: getAllPlaces,
            findPlaceById: findPlaceById
        }

        return api;

        function findPlaceById(venueId) {
            var url = url_prefix + "venues/" + venueId + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + clientVersion;
            return $http.get(url);
        }

        function getAllPlaces(searchString, searchLocation) {
            var url = url_prefix + "venues/explore?near=" + searchLocation +
                "&client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + clientVersion + "&query=" + searchString + "&venuePhotos=1"
            return $http.get(url);
        }


    }
})();