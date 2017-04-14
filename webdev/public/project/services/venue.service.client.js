(function () {
    angular
        .module("GoPlaces")
        .factory("VenueService", VenueService);

    function VenueService($http) {
        var api = {
            createVenue: createVenue,
            findVenueById: findVenueById,
            updateVenue: updateVenue,
            addComment: addComment,
            deleteComment: deleteComment,
            addFavoriteOf: addFavoriteOf,
            removeFavoriteOf: removeFavoriteOf,
            isFavoriteOf: isFavoriteOf,
            getAllVenue: getAllVenue,
            deleteVenue: deleteVenue
        };

        return api;

        function deleteVenue(venueId) {
            return $http.delete("/api/project/venue/" + venueId);
        }

        function getAllVenue() {
            return $http.get("/api/project/admin/venues");
        }

        function isFavoriteOf(venueId, userId) {
            return $http.get("/api/project/venue/" + venueId + "/isFavoriteOf/" + userId);
        }

        function removeFavoriteOf(venueId, userId) {
            var body = {
                userId: userId
            }
            return $http.put("/api/project/venue/" + venueId + "/removeFavorite", body);
        }

        function addFavoriteOf(venueId, userId) {
            var body = {
                userId: userId
            }
            return $http.put("/api/project/venue/" + venueId + "/addFavorite", body);
        }

        function deleteComment(venueId, comment) {
            return $http.put("/api/project/venue/" + venueId + "/deleteComment", comment);
        }

        function addComment(venueId, comment) {
            return $http.put("/api/project/venue/" + venueId + "/addComment", comment);
        }

        function updateVenue(venueId, venue) {
            return $http.put("/api/project/venue/" + venueId, venue);
        }

        function findVenueById(venueId) {
            return $http.get("/api/project/venue/" + venueId);
        }

        function createVenue(venue) {
            return $http.post("/api/project/venue", venue);
        }

    }

})();