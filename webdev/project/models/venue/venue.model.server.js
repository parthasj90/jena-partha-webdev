module.exports = function () {

    var mongoose = require("mongoose");
    var VenueSchemaProject = require("./venue.schema.server")();

    var Venue = mongoose.model("Venue", VenueSchemaProject);

    var api = {
        createVenue: createVenue,
        findVenueById: findVenueById,
        findVenueByVenueId: findVenueByVenueId,
        updateVenue: updateVenue,
        addComment: addComment,
        deleteComment: deleteComment,
        addFavoriteOf: addFavoriteOf,
        removeFavoriteOf: removeFavoriteOf,
        isFavoriteOf: isFavoriteOf,
        deleteVenue: deleteVenue,
        getAllVenue: getAllVenue
    };
    return api;
    
    function deleteVenue(venueId) {
        return Venue.remove({"venueId" : venueId});
    }
    
    function getAllVenue() {
        return Venue.find();
    }

    function findVenueByVenueId(venueId) {
        return Venue.findOne({"venueId": venueId});
    }
    
    function createVenue(venue) {
        return Venue.create(venue);
    }

    function findVenueById(vId) {
        return Venue.findById(vId);
    }
    
    function updateVenue(venueId, venue) {
        delete venue._id;
        return Venue
            .update(
                {venueId: venueId},
                {$set: venue}
            );
    }
    
    function addComment(venueId, comment) {
        return Venue.update(
            {venueId: venueId},
            {$push: {comments: comment}}
        );
    }
    
    function deleteComment(venueId,comment) {
        return Venue.update(
            {venueId: venueId},
            {$pull: {comments: comment}}
        );
    }

    function addFavoriteOf(venueId, userId) {
        return Venue.update(
            {venueId: venueId},
            {$push: {favoriteOf: userId}}
        );
    }

    function removeFavoriteOf(venueId, userId) {
        return Venue.update(
            {venueId: venueId},
            {$pull: {favoriteOf: userId}}
        );        
    }
    
    function isFavoriteOf(venueId, userId) {
        return Venue.findOne({
            venueId: venueId,
            favoriteOf: {
                $elemMatch : {
                    $eq: userId
                }
            }
        });
    }
    
};